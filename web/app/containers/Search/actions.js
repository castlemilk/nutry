/*
 *
 * SearchB actions
 *
 */

import {
  DEFAULT_ACTION,
  CHANGE_SEARCH,
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
