from .utils import load_mapping, load_index_properties
from .exceptions import UnableToLoadMapping, UnableToLoadProperties, FailedToCreateIndex, FailedToDeleteIndex, \
    FailedToIndexRecord
import json
from requests import Request, Session
from .models import Record
import os


class ElasticsearchIndex(object):
    """
    Elasticsearch management class
    """

    def __init__(self, config):
        self.host = config['host'] if config.get('port') else 'localhost'
        self.port = config['port'] if config.get('port') else '9200'
        self.xpack = config['xpack'] if config.get('xpack') else False
        if self.xpack:
            self.username = config['username'] if config.get('username') else 'elastic'
            self.password = config['password'] if config.get('password') else 'changeme'
        self.index_name = config['index'] if config.get('index') else 'nutry'
        self.secure = config['secure'] if config.get('secure') else False
        self.prefix = 'https' if self.secure else 'http'
        self.mapping_file_path = config['mapping_file_path'] \
            if config.get('mapping_file_path') else \
            os.path.join(os.path.dirname(os.path.dirname(__file__)), 'config', 'elasticsearch_mapping.json')
        self.properties_file_path = config['properties_file_path'] \
            if config.get('properties_file_path') else \
            os.path.join(os.path.dirname(os.path.dirname(__file__)), 'config', 'elasticsearch_properties.json')

        self.url = '{prefix}://{host}:{port}'.format(prefix=self.prefix, host=self.host, port=self.port)
        try:
            self.mapping = load_mapping(self.mapping_file_path)
        except Exception:
            raise UnableToLoadMapping(self.mapping_file_path)
        try:
            self.properties = load_index_properties(self.properties_file_path)
        except Exception:
            raise UnableToLoadProperties(self.properties_file_path)

    def add_record(self, record, index_name = None):
        """
        Add record to the target elasticsearch index
        :param Record record:
        :return:
        """
        if not isinstance(record, Record):
            raise Exception('invalid input during add_record')
        path = "{url}/{index}/item".format(url=self.url, index=index_name if index_name else self.index_name)
        session = Session()
        if self.xpack:
            session.auth = (self.username, self.password)
        request = Request('POST',
                          path,
                          data=record.get_indexable_document())
        prepped = session.prepare_request(request)
        response = session.send(prepped)
        if response.status_code != 200 and response.status_code != 201:
            raise FailedToIndexRecord(response, record)
        else:
            return True

    def delete_index(self, index=None):
        """
        Removes a given elasticsearch index
        :return:
        """
        path = "{url}/{index}".format(url=self.url, index=self.index_name if not index else index)
        session = Session()
        if self.xpack:
            session.auth = (self.username, self.password)
        headers = {'content-type': 'application/json', 'Accept': 'application/json'}
        request = Request('DELETE', path, headers=headers)
        prepped = session.prepare_request(request)
        response = session.send(prepped)
        if response.status_code != 200 and response.status_code != 201:
            raise FailedToDeleteIndex(response)
        else:
            return True

    def get_index(self):
        """
        fetch index information
        :return:
        """
        path = "{url}/{index}".format(url=self.url, index=self.index_name)
        session = Session()
        if self.xpack:
            session.auth = (self.username, self.password)
        headers = {'content-type': 'application/json', 'Accept': 'application/json'}
        request = Request('GET', path, headers=headers)
        prepped = session.prepare_request(request)
        response = session.send(prepped)
        if response.status_code == 200:
            return response.json()

        elif response.status_code == 404:
            return False

    def recreate_index(self):
        if self.get_index():
            self.delete_index()
        return self.create_index()

    def create_index(self, reindex=False):
        """
        Create the elasticsearch index with the correct configuration/properties for the data we will ingest
        This configured properties such as n-grams, splices and tuples to enable an "elasticsearch" or autocomplete
        like effect. Additionally enables the fully feature set of elasticsearch to rank results based on
        relevance.
        :return:
        """
        if self.get_index() and not reindex:
            return
        session = Session()
        if self.xpack:
            session.auth = (self.username, self.password)
        request = self._create_index_request()
        prepped = session.prepare_request(request)
        response = session.send(prepped)
        if response.status_code != 200 and response.status_code != 201:
            raise FailedToCreateIndex(response)
        else:
            return True

    def _create_index_request(self):
        """
        Generate request for creating index with desired properties
        """
        path = "{url}/{index_name}".format(url=self.url, index_name=self.index_name)
        props = lambda x: self.properties[x] if self.properties.get(x) else None
        headers = {'content-type': 'application/json', 'Accept': 'application/json'}
        body = {"settings": {}}
        if self.properties:
            if props("index"):
                body["settings"]["index"] = props("index")
            if props("analysis"):
                body["settings"]["analysis"] = props("analysis")
            if props("similarity"):
                body["settings"]["similarity"] = props("similarity")
        if self.mapping:
            body["mappings"] = self.mapping["mappings"]
        body = json.dumps(body)
        request = Request('PUT', path, data=body, headers=headers)
        return request
