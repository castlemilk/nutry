/*
 *
 * SearchB actions
 *
 */

import {
  DEFAULT_ACTION,
  SEARCH_TYPE_CHANGED,
  REFRESH_SEARCH,
  CHANGE_SEARCH,
  SEARCH_COMPLETE,
  SEARCH_FAILURE,
  SEARCH_LOADING,
  PROFILE_SELECTED,
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
export function searchRefresh() {
  return {
    type: REFRESH_SEARCH,
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
  };
}
export function profileSelected(profileInfo) {
  return {
    type: PROFILE_SELECTED,
    profileInfo,
  };
}
