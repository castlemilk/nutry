export const elasticsearchConfig = {
  hostname: `${process.env.ELASTICSEARCH_PROXY_MODE}://${process.env.ELASTICSEARCH_PROXY_HOST}:${process.env.ELASTICSEARCH_PROXY_PORT}/`,
  indexNames: 'nutry-names',
  indexNutrients: 'nutry-nutrients',
  authentication: {
    username: 'elastic',
    password: 'changeme',
  },
};
