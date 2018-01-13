from pymongo import MongoClient
from .models import Name
from .models import Nutrients
from .exceptions import NoDatabasesFound


class MongoDB(object):
    """
    Class for managing the interaction with mongoDB
    """

    def __init__(self, config):
        self.username = config['username'] if config.get('username') else None
        self.password = config['password'] if config.get('password') else None
        self.host = config['host'] if config.get('host') else 'localhost'
        self.port = config['port'] if config.get('port') else '27017'
        if self.username and self.password:
            self.uri = "mongodb://{username}:{password}@{host}:{port}/".format(username=self.username,
                                                                               password=self.password,
                                                                               host=self.host,
                                                                               port=self.port)
        else:
            self.uri = "mongodb://{host}:{port}/".format(host=self.host, port=self.port)
        self.client = MongoClient(self.uri)
        self.databases = [db for db in self.client.list_databases() if db['name'] in config['databases']]
        if not self.databases:
            raise NoDatabasesFound(config['databases'])
        self.get_database_meta()
        self.total_items = self.get_total_items()

    def get_total_items(self):
        return sum(map(lambda x: int(x['count']), self.databases))

    def get_database_meta(self):
        """
        get additonal metadata about databases
        :return:
        """
        for index, available_db in enumerate(self.databases):
            db = self.client.get_database(available_db['name'])
            for available_collection in db.list_collection_names():
                self.databases[index]['count'] = db.get_collection(available_collection).count()

        return self.databases

    def parseCollections(self, type = None):
        """
        Parse collections available in the discovered databases
        :return:
        """
        if type == 'names':
            for available_db in self.databases:
                db = self.client.get_database(available_db['name'])
                for available_collection in db.list_collection_names():
                    collection = db.get_collection(available_collection)
                    for item in collection.find({}):
                        yield Name(item, available_db['name'])
        elif type == 'nutrients':
            for available_db in self.databases:
                db = self.client.get_database(available_db['name'])
                for available_collection in db.list_collection_names():
                    collection = db.get_collection(available_collection)
                    for item in collection.find({}):
                        yield Nutrients(item, available_db['name'])



                    # for db in self.databases:
                    #     mongodb = self.client.get_database(db)
                    #     for collection in mongodb.list_collections():
                    #         coll = mongodb.get_collection(collection['name'])
                    #         print(coll.count())
