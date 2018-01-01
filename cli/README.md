# Nutry CLI
Range of tools for managing the interaction of editable storage formats (mongodb, csv, or json dumps) and the eventual
indexing into elasticsearch. This set of tools aims to achieve
the following:
* parse and iterate over available data in different formats (primarily mongoDB)
  this data is normalised/processed into an indexable format
* create indexes and the require configuration within elasticsearch such as mapping and index
  properties
* update/modify as well as re-indexing data when updates occur within the 
  enriched data sets.
  
  
## Requirements
* Python 3.6
### data consumption format
* MongoDB/JSON dumps/CSV
### data storage
* Elasticsearch


## Getting started
```bash
virtualenv -p `which python3` ./venv
source venv/bin/activate
(venv) pip install -r requirements.txt

```
## Initialising index
First get the archived enriched data from S3. These can then be used to
hydrate mongoDB as follows
```bash
mongorestore --gzip --archive=mongodb-usda-<date>.gzip
mongorestore --gzip --archive=mongodb-nuttab-<date>.gzip
```
With this data available in mongodb we can now use the CLI tooling to consume and index
the data into the right indexing configuration/formatting
The configuration for the CLI assumes a directory exists in the PWD which contains
a file called config.yml. This config file has the following configuration
parameteres

<u>config/config.yml</u>
```yaml 
mongodb:
  host: localhost
  port: 27017
  username:
  password:
  databases:
    - nuttab
    - usda

elasticsearch:
  host: localhost
  port: 9200
  username:
  password:
  index: nutry
```

We can kick off the indexing process via:

<u>create index and ingest data</u>
```bash
python dbmanager.py -i
```
<u>recreate index and ingest data</u>
```bash
python dbmanager.py -ri
```
