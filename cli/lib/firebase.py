from multiprocessing import Pool, cpu_count
import json
from tqdm import tqdm
from firebase import firebase
from .exceptions import MissingBaseURL, InvalidDocumentType
from .models import Profile
from multiprocessing import Queue, Process, freeze_support, Lock, Queue
import time



class Firebase(object):
    def __init__(self, config):

        self.base_url = config['base_url'] if config.get('base_url') else None
        self.authentication = config['authentication'] if config.get('authentication') else None
        self.path = config['path'] if config.get('path') else None
        self.MAXCPU = cpu_count() * 2
        self.client = firebase.FirebaseApplication(self.base_url, authentication=self.authentication)
        self.pool = None


    def upload(self, document):
        """
        Single document upload to firebase with a given prefix which will be appended to the configured path
        :param prefix:
        :param document:
        :return:
        """
        if not isinstance(document, Profile):
            raise InvalidDocumentType(type(document))
        name = document.get_id()
        return self.client.put(self.path, name, document.get_indexable_document(),
                          params={'print': 'silent'})


    def fast_upload(self, total, documents):

        with Pool(processes=self.MAXCPU) as pool:
            r = list(tqdm(pool.imap(self.upload, documents), total=total))
            return r


    def fast_upload_complex(self, total, documents):
        """
        Single document upload to firebase with a given prefix which will be appended to the configured path
        :param prefix:
        :param documents: a mappable iterator for the pool.map function to schedule
        :return:
        """
        if not documents:
            print("no documents available")
            return 0
        try:
            attempt = 1
            while documents:
                num_tasks = total
                failed_documents = []
                freeze_support()
                write_lock = Lock()
                in_queue = Queue()
                fail_queue = Queue()
                out_queue = Queue()
                tqdm.write("|   DOWNLOADING {} FILES".format(num_tasks))



                def worker(lk, in_jobs, out_jobs, fail_jobs):
                    try:
                        while True:
                            profile = in_jobs.get_nowait()
                            success = self.upload(profile)
                            if isinstance(success, Profile):
                                out_jobs.put_nowait(success)
                            else:
                                fail_jobs.put_nowait(profile)

                    except:
                        return False

                if fail_queue.empty():
                    for document in tqdm(documents):
                        in_queue.put(document)

                else:
                    while not fail_queue.empty():
                        failed_documents.append(fail_queue.get())

                documents = failed_documents
                if attempt > 2:
                    break

                processes = []
                for i in range(0, self.MAXCPU):
                    p = Process(target=worker,
                                args=[write_lock, in_queue, out_queue, fail_queue])
                    p.daemon = True
                    p.start()
                    processes.append(p)

                while True:
                    try:
                        document = out_queue.get_nowait()
                    except Queue.Empty:
                        time.sleep(.2)

                    if not any(p.is_alive() for p in processes) and out_queue.empty() and fail_queue.empty():
                        # all the workers are done and nothing is in the queue
                        out_queue.close()
                        fail_queue.close()
                        in_queue.close()
                        return True
                    elif not fail_queue.empty():
                        while not fail_queue.empty():
                            failed_documents.append(fail_queue.get())
                        documents = failed_documents
                        attempt += 1
                        break
                attempt += 1

        except Exception as e:
            print(e)
            return False
