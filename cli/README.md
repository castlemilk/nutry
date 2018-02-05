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
  # Example would be creating a SSH tunnel to access mongoDB running on a remote
  # host that has its mongod service listening on 127.0.0.1:27017
  # The connectivity would look as follows:
  # local_host -> (local_port):host:(tunnel_port) -> remote_host
  # So to achieve a tunnel-forwarding toplogy we'd set the following:
  # local_port = 27017
  # host = localhost (i.e 127.0.0.1)
  # tunnel_port = 27017 (or whatever service we want to tunnel)
  ssh:
    proxy: <run-processing-via-proxy {Boolean} >
    remote_host: <remote-ssh-host-connection-for-proxy {String} >
    remote_port: <remote-ssh-port-to-access-for-proxy {Number} >
    remote_username: <remote-login-for-proxy {String} >
    remote_password: <remote-password-for-proxy {String} >
    tunnel_port: <tunnel-port-on-remote-host-to-proxy/forward-to {Number} >
    local_port: <local-port-for-forwarding/connecting-via-tunnel {Number} >
    identity: <key-to-use-if-password-not-used {file-path (String)} >
  host: <local-host-to-listen-on {String} >
  port: <local-port-to-conect-to-for-accessing-mongodb {Number} >
  username: <mongodb-username {String} >
  password: <mongodb-password {String}>
  databases:
    - item1
    - item2
elasticsearch:
  host: <local-host-used-for-elasticsearch {String/IP} >
  port: <local-port-used-for-elasticsearrch {Number} (Default: 9200)
  username: <use-for-xpack {String} >
  password: <use-for-xpack {String} >
  index: <index-name {String} >
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

# Infrastructure deployment
The Nutry CLI aims to also contain the required capability for production deployment, accessing the same configuration file with the following section:
```yaml
deployment:
  ec2:
      # AMIS:
      #  * ami-b6bb47d4 # CentOS 1801_01
      #  * ami-8b51afe9 # Ubuntu 16.04 LTS
      #  * ami-cab258a8 # Ubuntu 16.04 LTLS 2017/11/21
      aws:
        access_key: <aws-access-key {String} >
        secret_key: <aws-secret-key {String} >
        region: <deployment-region {String} >
        availability_zone: <ap-southeast-2a {String}>
        # m3.medium - 1 vCPU,
        # c1.medium - 2 vCPU,, 1.7GB RAM, 350GB Storage @ (0.0164 per Hour * 24 * 365 / 13) = $11.05 per month
        # m1.small - 1 vCPU, 1.7GB RAM, 160GB Storage @ (0.0058 per hour * 24 * 365 / 13) = $3.905 per month
        # t2.small  - 1 vCPU, 2GB RAM, xxx EBS Storage @ (0.0088 per hour * 24 * 30) = $5.92 per month
        route53: <enable route53 {Boolean}
        project_name: <project-name {String} >
        key_name: <local-key-name {String} >
        instances:
          - name: <instance-1-name {String}>
            hostname: <instance-1-hostname {String}>
            platform: <platform (ubuntu, centos, rhel) {String}
            group: <group-name {String}>
            flavor: <instance-type (m3.medium, t2.small, m1.small, c1.medium etc) {String}
            image: <aws ami image for specified platform {String}>
            spot_price: <spot-price-for-given-instance-type {String}>
            spot_wait_timeout: <spot-price-waitout-time {Number}>
            # volume_type: gp2
            # volume_size: 10
            region: <instance-region {String}>
            availability_zone: <instance-availability-zone {String}>
            count_tag:
              Name: <instance-count-tag {String}>
            instance_tags:
              Name: <instance-tag {String}>
            public_facing: <provision-public-facing-address {Boolean}>
```
With the required configuration set, mainly around the access_key/secret_key we can kick-off the playbook with:
```sh
$ ansible-playbook deploy.yml -t deploy
```
This will provision all required services for the NutryStack including the following components:
* Key Pairs
* Access Policy & Security groups
* Networking (VPC, Subnetting, routing)
* EBS volumes
* Instances

TODO:
* move the playbook into the main NutryCLI command-line tooling, running the ansible via the python API.
