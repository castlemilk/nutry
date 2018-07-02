import pymongo
from .exceptions import NoAliasAvailable, NoRecordIDAvailable, NormalisationKeyNotFound
import json
from .normalisation_mapping import mapping
from .name_mapping import names
from .units_mapping import units


def get_source(source):
    if source.lower() == 'usda':
        return 'USDA'
    elif source.lower() == 'nuttab':
        return 'NUTTAB'


class Name(object):
    """
    Model which represents the data structure within the mongoDB collection. Used for serialisation/deserialisation
    of data and any enrichment or parsing requirements when carrying out the indexing into elasticsearch.
    """

    def __init__(self, item, source):
        self.names = item['name']
        self.group = item['group']
        self.meta = item['meta']
        self.id = item['ID']
        self.nutrients = item['nutrients']
        self.item = item
        self.source = get_source(source)
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
            if isinstance(self.names['alias'], list):
                return self.names['alias'][0]
            else:
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

    def get_group(self):
        if isinstance(self.group, dict):
            if self.group.get('group'):
                return self.group['group']
        elif isinstance(self.group, str):
            return self.group

    def get_source(self):
        return self.source

    def get_alias(self):
        if self.names.get('alias'):
            if isinstance(self.names['alias'], list):
                return self.names['alias']
            else:
                return []

    def get_id(self):
        try:
            return self.id
        except Exception:
            raise NoRecordIDAvailable(self)

    def get_clinical_pos(self):
        try:
            return self.names['clinical pos']
        except:
            return []

    def get_clinical_neg(self):
        try:
            return self.names['clinical neg']
        except:
            return []

    def get_indexable_document(self):

        return json.dumps({
            'SN': self.get_id(),
            'name': self.get_best_name(),
            'alias': self.get_alias(),
            'tags': self.get_tags(),
            'usage': self.get_usage(),
            'group': self.get_group(),
            'allergen': self.get_allergen(),
            'source': self.get_source(),
            'clinical_pos': self.get_clinical_pos(),
            'clinical_neg': self.get_clinical_neg(),
        })
    def get_json(self):
        return {
            'SN': self.get_id(),
            'name': self.get_best_name(),
            'alias': self.get_alias(),
            'tags': self.get_tags(),
            'usage': self.get_usage(),
            'group': self.get_group(),
            'allergen': self.get_allergen(),
            'source': self.get_source(),
            'clinical_pos': self.get_clinical_pos(),
            'clinical_neg': self.get_clinical_neg(),
        }
    def __repr__(self):
        return self.item

    def __str__(self):
        return "name: {name}, alias: {alias}, tags: {tags}, usage: {usage}, group: {group}, allergen: {allergen}, " \
               "source: {source}, clinical_pos: {clinical_pos}, clinical_neg: {clinical_neg}".format(
                name=self.names['name'],
                alias=self.names['alias'],
                tags=self.get_tags(),
                usage=self.get_usage(),
                group=self.get_group(),
                allergen=self.get_allergen(),
                source=self.get_source(),
                clinical_pos=self.get_clinical_pos(),
                clinical_neg=self.get_clinical_neg(),
        )


def normalise_nutrient_name(key):
    try:
        return mapping[key]
    except:
        raise NormalisationKeyNotFound(key)


class Nutrients(object):
    """
    Model which represents the data structure within the mongoDB collection. Used for serialisation/deserialisation
    of data and any enrichment or parsing requirements when carrying out the indexing into elasticsearch. Specifically
    targets the structure of the nutrients of a given item within the data set.
    """

    def __init__(self, item, source):
        self.name = Name(item, source)
        self.group = item['group']
        self.meta = item['meta']
        self.id = item['ID']
        self.nutrients = dict(map(lambda x: (normalise_nutrient_name(x[0]), x[1]['value']), item['nutrients'].items()))

    def get_id(self):
        try:
            return self.id
        except Exception:
            raise NoRecordIDAvailable(self)


    def __repr__(self):
        return self.item

    def __str__(self):
        return "NUTRIENTS: name: {name}, nutrients: {nutrients}".format(
            name=self.names['name'],
            nutrients=self.nutrients
        )

    def get_indexable_document(self):
        self.nutrients.update(json.loads(self.name.get_indexable_document()))
        return json.dumps(self.nutrients
                          )
def normalise_nutrient_description(key, info):
    if names.get(key):
        name = names[key]
    else:
        name = info['name']
    if units.get(key):
        unit = units[key]
    else:
        unit = info['units']
    try:
        return {
            'name': name,
            'value': info['value'],
            'units': unit,
        }
    except:
        raise NormalisationKeyNotFound(key)

class Profile(object):
    """
       Model which represents the data structure within the mongoDB collection. Used for serialisation/deserialisation
       of data and any enrichment or parsing requirements when carrying out the indexing into elasticsearch. Specifically
       targets the structure of the nutrients of a given item within the data set.
       """

    def __init__(self, item, source):
        self.item = item
        self.name = Name(item, source)
        self.group = item['group']
        self.meta = item['meta']
        self.portions = item['portions'] if item.get('portions') else None
        self.id = item['ID']
        self.nutrients = {
            'nutrients': dict(map(lambda x: (normalise_nutrient_name(x[0]),
                                             normalise_nutrient_description(normalise_nutrient_name(x[0]), x[1])),
                                  item['nutrients'].items()))
        }
        self.process_energy()
        self.process_omega3()


    def process_energy(self):
        KJtoKCAL = 0.239006
        energy_kj = self.nutrients['nutrients']['ENERC'] if self.nutrients['nutrients'].get('ENERC') else None
        energy_kcal = self.nutrients['nutrients']['ENERC_KCAL'] if self.nutrients['nutrients'].get('ENERC_KCAL') else None
        if energy_kcal:
            return
        elif energy_kj and not energy_kcal:
            self.nutrients['nutrients']['ENERC_KCAL'] = {
                'value': round(KJtoKCAL * energy_kj['value'], 2),
                'name': 'Energy (kcal)',
                'units': 'kcal'
            }
    def process_omega3(self):
        valid_fats = ['F20D5', 'F22D6', 'F18D3CN3']
        LCW3TOTAL = sum(filter(None,
                               [self.nutrients['nutrients'][fat]['value'] if self.nutrients['nutrients'].get(fat)
                                else None for fat in valid_fats]))
        self.nutrients['nutrients']['LCW3TOTAL'] = {
            'value': LCW3TOTAL,
            'name': 'Total Omega-3 Fatty Acid',
            'units': 'mg'
        }

    def __repr__(self):
        return self.item

    def __str__(self):
        return "NUTRIENTS: name: {name}, nutrients: {nutrients}".format(
            name=self.name.get_best_name(),
            nutrients=self.nutrients
        )

    def get_id(self):
        return self.id

    def get_indexable_document(self):
        self.nutrients.update(json.loads(self.name.get_indexable_document()))
        header = self.name.get_json()
        header.update({
                'nutrients': self.nutrients['nutrients'],
                'portions': self.portions,
        })
        return header
