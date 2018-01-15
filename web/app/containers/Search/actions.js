/*
 *
 * SearchB actions
 *
 */

import {
  DEFAULT_ACTION,
  SEARCH_TYPE_CHANGED,
  CHANGE_SEARCH,
  SEARCH_COMPLETE,
  SEARCH_FAILURE,
  SEARCH_LOADING,
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
export function searchLoading() {
  return {
    type: SEARCH_LOADING,
  };
}
export function searchFailure(error) {
  return {
    type: SEARCH_FAILURE,
    error,
  };
}
export function changeSearchType(searchType) {
  return {
    type: SEARCH_TYPE_CHANGED,
    searchType,
  }
}
