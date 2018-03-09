/*
 *
 * Profiler actions
 *
 */

import {
  CHANGE_PROFILER_SEARCH,
  SEARCH_COMPLETE,
  SEARCH_FAILURE,
  SEARCH_LOADING,
  ADD_PROFILER_ELEMENT,
  DELETE_PROFILER_ELEMENT,
  UPDATE_PROFILER_ELEMENT,
} from './constants';

export function changeSearch() {
  return {
    type: CHANGE_PROFILER_SEARCH,
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
export function addProfilerElement() {
  return {
    type: ADD_PROFILER_ELEMENT,
  };
}
export function deleteProfilerElement(id) {
  return {
    type: DELETE_PROFILER_ELEMENT,
    id,
  };
}
export function updateProfilerElement(id, key, value) {
  return {
    type: UPDATE_PROFILER_ELEMENT,
    id,
    key,
    value,
  };
}
