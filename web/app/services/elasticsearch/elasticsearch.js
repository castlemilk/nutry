
import axios from 'axios';
import { elasticsearchConfig } from 'config';
import { searchQuery } from './queries';


function parseResults(response) {
  if (response.status !== 200) {
    return null;
  }
  return {
    hits: response.data.hits.total,
    max_score: response.data.hits.max_score,
    items: response.data.hits.hits,
  };
}
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}


export function search(searchString) {
  /*
    Submit request to eleasticsearch for the given searchString and return results
     */
  const path = `${elasticsearchConfig.indexNames}/names/_search`;
  const session = axios.create({
    baseURL: elasticsearchConfig.hostname,
    auth: elasticsearchConfig.authentication,
    headers: { 'Content-Type': 'application/json' },
  });

  const body = {
    size: 20,
    query: searchQuery(searchString),
  };
  return session.post(path, body)
    .then(checkStatus)
    .then(parseResults);
}
