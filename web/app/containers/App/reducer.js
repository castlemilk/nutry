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

import {
  SEARCH_COMPLETE,
} from 'containers/Search/constants';

const initialState = fromJS({
  loggedIn: false,
  searchResults: [],
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case LOGIN_SUCCESS:
      return state.set('loggedIn', true);
    case SEARCH_COMPLETE:
      return state.set('searchResults', action.searchResults);
    default:
      return state;
  }
}

export default appReducer;
