/*
 *
 * SearchB actions
 *
 */

import {
  DEFAULT_ACTION,
  CHANGE_SEARCH,
  SEARCH_COMPLETE,
  SEARCH_FAILURE,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function changeSearchString(searchString) {
  return {
    type: CHANGE_SEARCH,
    searchString,
  };
}
export function searchComplete(results) {
  if (results) {
    return {
      type: SEARCH_COMPLETE,
      results,
    };
  }
  return {
    type: SEARCH_COMPLETE,
    results: [],
  };
}
export function searchFailure(error) {
  return {
    type: SEARCH_FAILURE,
    error,
  };
}
