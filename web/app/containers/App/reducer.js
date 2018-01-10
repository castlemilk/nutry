/*
 *
 * LandingPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  LOGIN_SUCCESS,
} from './constants';

const initialState = fromJS({
  loggedIn: false,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case LOGIN_SUCCESS:
      return state.set('loggedIn', true);
    default:
      return state;
  }
}

export default appReducer;
