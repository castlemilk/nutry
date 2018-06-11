export const elasticsearchConfig = {
  hostname: `${process.env.ELASTICSEARCH_PROXY_MODE}://${process.env.ELASTICSEARCH_PROXY_HOST}:${process.env.ELASTICSEARCH_PROXY_PORT}/`,
  indexNames: 'names',
  indexNutrients: 'nutrients',
  authentication: {
    username: 'elastic',
    password: 'changeme',
  },
};
export const firebaseConfig = {
  endpoint: `${process.env.FIREBASE_ENDPOINT}/${process.env.FIREBASE_DB_VERSION}`,
};
