
import axios from 'axios';
import { elasticsearchConfig } from 'config';
import { searchQuery, profilerFunctionQuery, profilerSearchQuery } from './queries';


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

/**
 * [search description]
 * @param  {[string]} searchString text entered into search bar
 * @return {[type]}              response from elasticsearch
 */
export function search(searchString) {
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
/**
 * Profiler query differs to a standard search in that we add additional
 * fields boosters which change the ranking of returned results, effectively
 * acting as filters.
 * @param  {[String]} searchString text entered into search bar
 * @param  {[Array]} elements     array of elements from the profiler UI
 * @return {[type]}              response from elasticsearch
 */
export function profiler(searchString, elements) {
  const path = `${elasticsearchConfig.indexNutrients}/nutrients/_search`;
  const session = axios.create({
    baseURL: elasticsearchConfig.hostname,
    auth: elasticsearchConfig.authentication,
    headers: { 'Content-Type': 'application/json' },
  });
  let query = profilerSearchQuery(searchString)
  const functions = elements.map((element) => {
    const scaled_value = element.nutrient.adjustment_factor ?
    ((element.scale - 50) * element.nutrient.adjustment_factor) / 100 :
    ((element.scale - 50) / 100)
    return profilerFunctionQuery(element.nutrient.value, scaled_value);
  })

  const body = {
    size: 20,
    query: {
      function_score: {
        query,
        functions
      }
    }
  };
  console.log('profiler:query:')
  console.log(body)
  return session.post(path, body)
    .then(checkStatus)
    .then(parseResults);
}
