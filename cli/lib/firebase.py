from multiprocessing import Pool, cpu_count
import json
from tqdm import tqdm
import firebase
from .exceptions import MissingBaseURL, InvalidDocumentType
from .models import Profile



class Firebase(object):
    def __init__(self, config):

        self.base_url = config['base_url'] if config.get('base_url') else None
        self.authentication = config['authentication'] if config.get('authentication') else None
        self.path = config['path'] if config.get('path') else None
        self.MAXCPU = cpu_count()
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
        """
        Single document upload to firebase with a given prefix which will be appended to the configured path
        :param prefix:
        :param documents: a mappable iterator for the pool.map function to schedule
        :return:
        """
        with Pool(processes=self.MAXCPU) as p:
            with tqdm(total=total) as pbar:
                for i, _ in tqdm(enumerate(p.imap_unordered(self.upload, documents))):
                    pbar.update()


