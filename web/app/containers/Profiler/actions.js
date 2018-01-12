/*
 *
 * Profiler actions
 *
 */

import {
  DEFAULT_ACTION,
  ADD_PROFILER_ELEMENT,
  DELETE_PROFILER_ELEMENT,
  UPDATE_PROFILER_ELEMENT,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function addProfilerElement() {
  return {
    type: ADD_PROFILER_ELEMENT,
  }
}
export function deleteProfilerElement(id) {
  return {
    type: DELETE_PROFILER_ELEMENT,
    id,
  }
}
export function updateProfilerElement(id, key, value) {
  return {
    type: UPDATE_PROFILER_ELEMENT,
    id,
    key,
    value,
  }
}
