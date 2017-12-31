from lib import utils
from lib import mongo
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
        if loading_bar:
            for record in tqdm.tqdm(self.mongoClient.parseCollections(),
                                  total=self.mongoClient.total_items,
                                  unit='Records'):
                pass
        else:
            for record in self.mongoClient.parseCollections():
                pass


def main():
    parser = argparse.ArgumentParser(prog='dbmanager.py', usage='%(prog)s [options]',
                                     description='''tool for managing the conversion of raw data in different formats 
                                     into elasticsearch''',
                                     formatter_class=argparse.ArgumentDefaultsHelpFormatter)
    parser.add_argument('-c', '--config', dest='config',
                        default="{}/{}".format('${PWD}', 'config.yml'),
                        help='specify a config file path to use for the cli/daemon')
    args = vars(parser.parse_args())
    if 'PWD' in args['config']:
        config = utils.load_config(os.path.join(os.path.dirname(__file__), 'config.yml'))
    else:
        config = utils.load_config(args['config'])
    if not config:
        raise Exception("EXITING:FAILED_TO_LOAD_CONFIG")
    manager = DBManager(config)


if __name__ == "__main__":
    main()
