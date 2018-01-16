/*
 *
 * FoodProfile reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  GET_PROFILE,
  GET_PROFILE_FAILURE,
  GET_PROFILE_SUCCESS,
} from './constants';

const initialState = fromJS({
  loading: true,
  serialNumber: null,
  profileBody: {},
  error: false,
  source: null,
});

function foodProfileReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case GET_PROFILE:
      return state
        .set('serialNumber', action.serialNumber)
        .set('source', action.source);
    case GET_PROFILE_SUCCESS:
      return state
        .set('profileBody', action.profileBody)
        .set('loading', false)
        .set('error', false);
    case GET_PROFILE_FAILURE:
      return state
        .set('error', true);
    default:
      return state;
  }
}

export default foodProfileReducer;
