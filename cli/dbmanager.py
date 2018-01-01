from lib import utils
from lib import mongo
from lib import elasticsearch
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

    def __init__(self, config, mode="DRY"):
        self.mode = mode
        self.config = config
        self.mongoClient = mongo.MongoDB(self.config['mongodb'])
        self.elasticsearchClient = elasticsearch.ElasticsearchIndex(self.config['elasticsearch'])

    def index_data(self):
        """
        Index the available data from a given data source (JSON dump, mongodb etc)
        :return:
        """
        if not self.elasticsearchClient.get_index():
            self.elasticsearchClient.create_index()
        if loading_bar:
            for record in tqdm.tqdm(self.mongoClient.parseCollections(),
                                    total=self.mongoClient.total_items,
                                    unit='Records'):
                self.elasticsearchClient.add_record(record)
        else:
            for record in self.mongoClient.parseCollections():
                pass

    def reindex_data(self):
        """
        Effectively reformat elasticsearch index
        :return:
        """
        self.reconfigure_index()
        self.index_data()

    def configure_index(self):
        """
        Configure elasticsearch index before indexing, configuration will be applied as documents are indexed
        :return:
        """
        self.elasticsearchClient.create_index()

    def reconfigure_index(self):
        """
        Reset a given index, will be done in a re-index event
        :return:
        """
        self.elasticsearchClient.recreate_index()



def main():
    parser = argparse.ArgumentParser(prog='dbmanager.py', usage='%(prog)s [options]',
                                     description='''tool for managing the conversion of raw data in different formats 
                                     into elasticsearch''',
                                     formatter_class=argparse.ArgumentDefaultsHelpFormatter)
    parser.add_argument('-c', '--config', dest='config',
                        default="{}/{}".format('${PWD}', 'config.yml'),
                        help='specify a config file path to use for the cli/daemon')
    parser.add_argument('-i', '--index', dest='i', action='store_true',
                        help='index available data')
    parser.add_argument('-ri', '--reindex', dest='ri', action='store_true',
                        help='re-index available data and re-configure index. WARNING: WILL DELETE EXISTING INDEX')

    args = vars(parser.parse_args())
    if 'PWD' in args['config']:
        config = utils.load_config(os.path.join(os.path.dirname(__file__), 'config', 'config.yml'))
    else:
        config = utils.load_config(args['config'])
    if not config:
        raise Exception("EXITING:FAILED_TO_LOAD_CONFIG")
    manager = DBManager(config)

    if args['i']:
        manager.index_data()
    if args['ri']:
        manager.reindex_data()


if __name__ == "__main__":
    main()
