FROM nginx

ARG SERVER_NAME
ARG WEBAPP_PORT

ENV ELASTICSEARCH_PROXY_HOST localhost
ENV ELASTICSEARCH_PROXY_PORT 9200
ENV SERVER_NAME $SERVER_NAME
ENV WEBAPP_PORT $WEBAPP_PORT
ENV NGINX_CERT_DIR=/etc/nginx/cert

RUN apt-get update; apt-get install -y \
    openssl

ADD nginx.conf.template /etc/nginx/nginx.conf.template
USER root
RUN envsubst '$WEBAPP_PORT $SERVER_NAME $ELASTICSEARCH_PROXY_HOST $ELASTICSEARCH_PROXY_PORT' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf

WORKDIR $NGINX_CERT_DIR

#ADD cert/ $NGINX_CERT_DIR/
ADD gen_key.sh $NGINX_CERT_DIR/gen_key.sh
RUN chmod a+x $NGINX_CERT_DIR/gen_key.sh
RUN bash -c "$NGINX_CERT_DIR/gen_key.sh $SERVER_NAME"
RUN ls $NGINX_CERT_DIR
