from .utils import load_mapping, load_index_properties
from .exceptions import UnableToLoadMapping
import json
from requests import Request


class ElasticsearchIndex(object):
    """
    Elasticsearch management class
    """

    def __init__(self, config):
        self.host = config['host'] if config.get['port'] else 'localhost'
        self.port = config['port'] if config.get['port'] else '9200'
        self.secure = config['secure'] if config.get('secure') else False
        self.prefix = 'https' if self.secure else 'http'
        self.mapping_file_path = config['mapping_file_path'] \
            if config.get['mapping_file_path'] else 'elasticsearch_mapping.json'
        self.properties_file_path = config['properties_file_path'] \
            if config.get['properties_file_path'] else 'elasticsearch_properties.json'

        self.url = '{prefix}://{host}:{port}'.format(prefix=self.prefix, host=self.host, port=self.port)
        try:
            self.mapping = load_mapping(self.mapping_file_path)
        except Exception:
            raise UnableToLoadMapping(self.mapping_file_path)
        self.properties = load_index_properties(self.properties_file_path)

    def generate_index_create_request(self,mapping, index_properties):
        """
        Generate request for creating index with desired properties
        """
        props = lambda x: index_properties[x] if index_properties.get(x) else None
        headers = {'content-type': 'application/json', 'Accept': 'application/json'}
        body = {"settings": {}}
        if index_properties:
            if props("index"):
                body["settings"]["index"] = props("index")
            if props("analysis"):
                body["settings"]["analysis"] = props("analysis")
            if props("similarity"):
                body["settings"]["similarity"] = props("similarity")
        if mapping:
            body["mappings"] = mapping["mappings"]
        body = json.dumps(body)
        request = Request('PUT', self.url, data=body, headers=headers)
        return request
