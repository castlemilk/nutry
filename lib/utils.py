from __future__ import print_function

import imp

import yaml
import json
import logging

try:
    imp.find_module('tqdm')
    import tqdm

    loading_bar = True
except ImportError:
    loading_bar = False
logger = logging.getLogger('Util')


def load_config(file_path):
    """
    Load YAML configuration from given file path and return parsed content as dict
    :param file_path:
    :return: dict
    """
    with open(file_path, 'r') as fp:
        try:
            config = yaml.load(fp)
            return config
        except yaml.YAMLError as e:
            print("Error loading configuration with: {}".format(e))
            return None


def load_mapping(mapping_file_path):
    """
    Load mapping file into script for joining with index creation request
    """
    mapping_dict = {}
    try:
        with open(mapping_file_path, 'r') as fp:
            mapping_dict = json.load(fp)
        return mapping_dict
    except IOError:
        print('mapping file not found')
        return None


def load_index_properties(index_properties_file_path):
    """
    Load properties file into script for joining with index creation request
    """
    index_properties_dict = {}
    try:
        with open(index_properties_file_path, 'r') as fp:
            index_properties_dict = json.load(fp)
        return index_properties_dict
    except IOError:
        print('properties file not found')
        return None
