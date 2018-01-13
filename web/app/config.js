export const elasticsearchConfig = {
  hostname: `${process.env.ELASTICSEARCH_PROXY_MODE}://${process.env.ELASTICSEARCH_PROXY_HOST}:${process.env.ELASTICSEARCH_PROXY_PORT}/`,
  indexNames: 'nutry-names',
  authentication: {
    username: 'elastic',
    password: 'changeme',
  },
};
