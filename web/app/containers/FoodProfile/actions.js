/*
 *
 * FoodProfile actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_PROFILE,
  GET_PROFILE_FAILURE,
  GET_PROFILE_SUCCESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function loadProfile(serialNumber, source) {
  return {
    type: GET_PROFILE,
    serialNumber,
    source,
  };
}
export function loadProfileSuccess(profileBody) {
  return {
    type: GET_PROFILE_SUCCESS,
    profileBody,
  };
}
export function loadProfileFailure(error) {
  return {
    type: GET_PROFILE_FAILURE,
    error,
  };
}
