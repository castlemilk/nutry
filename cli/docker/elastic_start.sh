# starts elasticsearch container listening on 0.0.0.0:9200


#docker run -p 9200:9200 \
#	-e "http.host=0.0.0.0" \
#	-e "transport.host=127.0.0.1" \
#	docker.elastic.co/elasticsearch/elasticsearch:5.1.1 \
#	&
ELASTIC_CONFIG_PATH=`pwd`/config
echo $ELASTIC_CONFIG_PATH
docker-compose up -d


