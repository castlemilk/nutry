from lib import utils
from lib import mongo
from lib import elasticsearch
from lib import ssh
from lib.exceptions import FailedToGetIndex
import argparse
import os
import imp

try:
    imp.find_module('tqdm')
    import tqdm

    loading_bar = True
except ImportError:
    loading_bar = False


class DBManager(object):
    """
    Top level class for managing the conversion/ingestion of data into elasticsearch
    """

    def __init__(self, config, mode="DRY", remote=False):
        self.mode = mode
        self.config = config

        print(self.config['mongodb'])
        if self.config['mongodb'].get('ssh') and remote:
            if self.config['mongodb']['ssh'].get('proxy'):
                if self.config['mongodb']['ssh']['proxy']:
                    self.proxy = True
                    self.ssh = ssh.SSHTunnelManager(self.config['mongodb']['ssh'])
                    self.ssh.connect()
                    self.ssh.forward()
        else:
            self.proxy = False
        self.mongoClient = mongo.MongoDB(self.config['mongodb'])
        self.elasticsearchClient = elasticsearch.ElasticsearchIndex(self.config['elasticsearch'])
        self.index_prefix = self.config['elasticsearch']['index']

    def display_information(self):
        """
        Display information about available data
        :return:
        """
        total_items = self.mongoClient.total_items
        print("Total Items in available data: {}".format(total_items))

    def index_names(self):
        """
        Index the available data from a given data source (JSON dump, mongodb etc)
        :return:
        """
        index_name = "{index_prefix}-names".format(index_prefix=self.index_prefix)
        if not self.elasticsearchClient.get_index(index_name):
            self.elasticsearchClient.create_index(index_name)
        if loading_bar:
            for record in tqdm.tqdm(self.mongoClient.parseCollections('names'),
                                    total=self.mongoClient.total_items,
                                    unit='Names'):
                self.elasticsearchClient.add_record(record, index_name=index_name, type='names')
        else:
            for record in self.mongoClient.parseCollections():
                pass
        if self.proxy:
            self.ssh.stop_tunnel()

    def reindex_names(self):
        """
        Effectively reformat elasticsearch index
        :return:
        """
        self.reconfigure_names_index()
        self.index_names()

    def reindex_nutrients(self):
        """
                Effectively reformat elasticsearch index
                :return:
                """
        self.reconfigure_nutrients_index()
        self.index_nutrients()

    def index_nutrients(self):
        """
        Index nutrient values from the available data
        :return:
        """
        index_name = "{index_prefix}-nutrients".format(index_prefix=self.index_prefix)
        if not self.elasticsearchClient.get_index(index_name):
            self.elasticsearchClient.create_index(index_name)
        if loading_bar:
            for record in tqdm.tqdm(self.mongoClient.parseCollections('nutrients'),
                                    total=self.mongoClient.total_items,
                                    unit='Nutrients'):
                self.elasticsearchClient.add_record(record, index_name=index_name, type='nutrients')
        else:
            for record in self.mongoClient.parseCollections():
                pass
        if self.proxy:
            self.ssh.stop_tunnel()

    def configure_index(self):
        """
        Configure elasticsearch index before indexing, configuration will be applied as documents are indexed
        :return:
        """
        self.elasticsearchClient.create_index()

    def reconfigure_names_index(self):
        """
        Reset a given index, will be done in a re-index event
        :return:
        """
        index_name = "{index_prefix}-names".format(index_prefix=self.index_prefix)
        self.elasticsearchClient.recreate_index(index_name)

    def reconfigure_nutrients_index(self):
        """
        Reset a given index, will be done in a re-index event
        :return:
        """
        index_name = "{index_prefix}-nutrients".format(index_prefix=self.index_prefix)
        self.elasticsearchClient.recreate_index(index_name)


def main():
    parser = argparse.ArgumentParser(prog='dbmanager.py', usage='%(prog)s [options]',
                                     description='''tool for managing the conversion of raw data in different formats 
                                     into elasticsearch''',
                                     formatter_class=argparse.ArgumentDefaultsHelpFormatter)
    parser.add_argument('-c', '--config', dest='config',
                        default="{}/{}".format('${PWD}', 'config.yml'),
                        help='specify a config file path to use for the cli/daemon')
    parser.add_argument('-in', '--index-names', dest='in', action='store_true',
                        help='index available names in data')
    parser.add_argument('-ip', '--index-nutrients', dest='ip', action='store_true',
                        help='index available nutrients from data')
    parser.add_argument('-rin', '--reindex-names', dest='rin', action='store_true',
                        help='re-index available names in data and re-configure index. WARNING: WILL DELETE EXISTING '
                             'INDEX')
    parser.add_argument('-rip', '--reindex-nutrients', dest='rip', action='store_true',
                        help='re-index available nutrients in data and re-configure index. WARNING: WILL DELETE EXISTING '
                             'INDEX')
    parser.add_argument('-rt', '--remote-tunnel', dest='rt', action='store_true', default=False,
                        help='fetch data from a remote mongodb instance via a SSH tunnel')
    parser.add_argument('-d', '--display', dest='display', action='store_true',
                        help='display information about available data sets')

    args = vars(parser.parse_args())
    if 'PWD' in args['config']:
        config = utils.load_config(os.path.join(os.path.dirname(__file__), 'config', 'config.yml'))
    else:
        config = utils.load_config(args['config'])
    if not config:
        raise Exception("EXITING:FAILED_TO_LOAD_CONFIG")
    manager = DBManager(config, remote=args['rt'])

    if args['in']:
        manager.index_names()
    if args['ip']:
        manager.index_nutrients()
    if args['rip']:
        manager.reindex_nutrients()
    if args['rin']:
        manager.reindex_names()
    if args['display']:
        manager.display_information()


if __name__ == "__main__":
    main()
