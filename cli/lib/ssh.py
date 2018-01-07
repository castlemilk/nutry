import getpass
import os
import socket
import threading
import select
import time

try:
    import SocketServer
except ImportError:
    import socketserver as SocketServer

import sys
from optparse import OptionParser

import paramiko

g_verbose = True


def verbose(s):
    if g_verbose:
        print(s)


class ForwardServer(SocketServer.ThreadingTCPServer):
    daemon_threads = True
    allow_reuse_address = True


class Handler(SocketServer.BaseRequestHandler):
    def handle(self):
        try:
            chan = self.ssh_transport.open_channel('direct-tcpip',
                                                   (self.chain_host, self.chain_port),
                                                   self.request.getpeername())
        except Exception as e:
            verbose('Incoming request to %s:%d failed: %s' % (self.chain_host,
                                                              self.chain_port,
                                                              repr(e)))
            return
        if chan is None:
            verbose('Incoming request to %s:%d was rejected by the SSH server.' %
                    (self.chain_host, self.chain_port))
            return

        verbose('Connected!  Tunnel open %r -> %r -> %r' % (self.request.getpeername(),
                                                            chan.getpeername(), (self.chain_host, self.chain_port)))
        while True:
            r, w, x = select.select([self.request, chan], [], [])
            if self.request in r:
                data = self.request.recv(1024)
                if len(data) == 0:
                    break
                chan.send(data)
            if chan in r:
                data = chan.recv(1024)
                if len(data) == 0:
                    break
                self.request.send(data)

        peername = self.request.getpeername()
        chan.close()
        self.request.close()
        verbose('Tunnel closed from %r' % (peername,))


def forward_tunnel(local_port, remote_host, remote_port, transport):
    # this is a little convoluted, but lets me configure things for the Handler
    # object.  (SocketServer doesn't give Handlers any way to access the outer
    # server normally.)
    class SubHander(Handler):
        chain_host = remote_host
        chain_port = remote_port
        ssh_transport = transport

    server = ForwardServer(('', local_port), SubHander)
    th = threading.Thread(target=server.serve_forever)
    th.daemon = True
    th.start()


class SSHTunnelManager(object):
    def __init__(self, config):
        self.remote_port = config['remote_port']
        self.remote_host = config['remote_host']
        self.tunnel_port = config['tunnel_port'] if config.get('tunnel_port') else '27017'
        self.local_port = config['local_port'] if config.get('local_port') else '27017'
        self.local_host = config['local_host'] if config.get('local_host') else 'localhost'
        self.username = config['remote_username']
        self.password = config['remote_password'] if config.get('remote_password') else None
        self.keyfile = config['identity'] if config.get('identity') else None
        self.client = None
        self.server = None
        self.thread = None
        self.stop_event = threading.Event()
        print("initialising SSH Manager")

    def connect(self):
        print("connecting SSH")
        if not self.keyfile and not self.password:
            self.password = getpass.getpass('Enter SSH password: ')
        self.client = paramiko.SSHClient()
        self.client.load_system_host_keys()
        self.client.set_missing_host_key_policy(paramiko.WarningPolicy())
        verbose('Connecting to ssh host %s:%d ...' % (self.remote_host, self.remote_port))
        try:
            self.client.connect(self.remote_host, self.remote_port, username=self.username, key_filename=self.keyfile,
                                look_for_keys=True if self.keyfile else False, password=self.password)
        except Exception as e:
            print('*** Failed to connect to %s:%d: %r' % (self.remote_host, self.remote_port, e))
            sys.exit(1)

    def forward(self):
        verbose('Now forwarding port %d to %s:%d ...' % (self.local_port, self.remote_host, self.tunnel_port))

        try:
            self.start_tunnel()
        except KeyboardInterrupt:
            print('C-c: Port forwarding stopped.')
            sys.exit(0)

    def start_tunnel(self):
        # this is a little convoluted, but lets me configure things for the Handler
        # object.  (SocketServer doesn't give Handlers any way to access the outer
        # server normally.)
        class SubHander(Handler):
            chain_host = self.remote_host
            chain_port = self.tunnel_port
            ssh_transport = self.client.get_transport()

        self.server = ForwardServer(('', self.local_port), SubHander)
        self.thread = threading.Thread(target=self.server.serve_forever)
        self.thread.daemon = True
        self.thread.start()

    def stop_tunnel(self):
        time.sleep(10)
        self.thread.join(timeout=1)
