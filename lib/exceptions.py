class NoDatabasesFound(Exception):
    """No databases found in mongoDB"""

    def __init__(self, databases):
        self.message = "No databases matching config list of {}".format(databases)

    def __str__(self):
        return self.message

    def __repr__(self):
        return self.message


class NoAliasAvailable(Exception):
    """No Alias Available for given Record"""

    def __init__(self, record):
        print(record.__repr__())
        self.message = "No alias available for given record: {}".format(record.id)

    def __str__(self):
        return self.message

    def __repr__(self):
        return self.message


class UnableToLoadMapping(Exception):
    """Unable to load mapping file"""

    def __init__(self, mapping_path):
        self.message = "no mapping file available at {}".format(mapping_path)

    def __str__(self):
        return self.message

    def __repr__(self):
        return self.message


class UnableToLoadProperties(Exception):
    """Unable to load properties file"""

    def __init__(self, properties_path):
        self.message = "no properties file available at {}".format(properties_path)

    def __str__(self):
        return self.message

    def __repr__(self):
        return self.message


class FailedToCreateIndex(Exception):
    """Unable to load properties file"""

    def __init__(self, reponse):
        self.message = "response {}".format(reponse)

    def __str__(self):
        return self.message

    def __repr__(self):
        return self.message

class FailedToDeleteIndex(Exception):
    """Unable to Delete index"""

    def __init__(self, reponse):
        self.message = "response {}".format(reponse)

    def __str__(self):
        return self.message

    def __repr__(self):
        return self.message
