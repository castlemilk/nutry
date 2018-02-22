import {
  SEARCH_COMPLETE,
} from 'containers/Search/constants';

import {
  LOGIN_CLICKED,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from './constants';

export function login(username) {
  return {
    type: LOGIN_CLICKED,
    username,
  };
}
export function loginSuccess(token) {
  return {
    type: LOGIN_SUCCESS,
    token,
  };
}

export function searchComplete(searchResults) {
  return {
    type: SEARCH_COMPLETE,
    searchResults,
  };
}

export function loginFailure(err) {
  return {
    type: LOGIN_FAILURE,
    err,
  };
}
