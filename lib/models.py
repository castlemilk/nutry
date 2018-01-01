import pymongo
from .exceptions import NoAliasAvailable
import json


class Record(object):
    """
    Model which represents the data structure within the mongoDB collection. Used for serialisation/deserialisation
    of data and any enrichment or parsing requirements when carrying out the indexing into elasticsearch.
    """

    def __init__(self, item):
        self.names = item['name']
        self.group = item['group']
        self.meta = item['meta']
        self.id = item['_id']
        self.nutrients = item['nutrients']
        self.item = item
        if not self.names.get('alias') \
                and not self.names.get('alias1') \
                and not self.names.get('alias2') \
                and not self.names.get('alias3') \
                and not self.names.get('alias 1') \
                and not self.names.get('alias 2') \
                and not self.names.get('alias 3'):
            if self.names.get('name'):
                self.names['alias'] = self.names['name']
            elif self.names.get('long'):
                self.names['alias'] = self.names['long']
                #
                #     raise NoAliasAvailable(self)

    def get_best_name(self):
        """
        Attempt to determine the best name to use out of the random and inconsistent alias's applied to the
        dataset by a qualified dietitian
        :return:
        """
        if self.names.get('alias'):
            return self.names['alias']
        elif self.names.get('alias1') \
                and self.names.get('alias2') \
                and self.names.get('alias3'):
            return self.names['alias1']
        elif self.names.get('alias 1') \
                and self.names.get('alias 2') \
                and self.names.get('alias 3'):
            return self.names['alias 1']
        elif self.names.get('alias 1') \
                and self.names.get('alias2') \
                and self.names.get('alias3'):
            return self.names['alias 1']
        elif self.names.get('alias1') \
                and self.names.get('alias2') \
                and self.names.get('alias 3'):
            return self.names['alias1']
        elif self.names.get('alias1') \
                and self.names.get('alias2') \
                and self.names.get('alias 3'):
            return self.names['alias1']
        elif self.names.get('alias 1') \
                and self.names.get('alias 2') \
                and self.names.get('alias3'):
            return self.names['alias 1']
        elif self.names.get('alias1') \
                and self.names.get('alias 2') \
                and self.names.get('alias3'):
            return self.names['alias1']
    def get_tags(self):
        if self.names.get('tags'):
            return self.names['tags']
        else:
            return []
    def get_usage(self):
        if self.names.get('usage'):
            return self.names['usage']
        else:
            return []
    def get_allergen(self):
        if self.names.get('allergen'):
            return self.names['allergen']
        else:
            return []

    def get_indexable_document(self):

        return json.dumps({
            'name': self.get_best_name(),
            'tags': self.get_tags(),
            'usage': self.get_usage(),
            'allergen': self.get_allergen()
        })

    def __repr__(self):
        return self.item

    def __str__(self):
        return "name: {}, alias: {}".format(self.names['name'], self.names['alias'])
