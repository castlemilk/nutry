/*
 *
 * LandingPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  SEARCH_COMPLETE,
} from 'containers/Search/constants';
import {
  DEFAULT_ACTION,
  LOGIN_SUCCESS,
} from './constants';


const initialState = fromJS({
  loggedIn: false,
  searchResults: [],
  loading: true,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case LOGIN_SUCCESS:
      return state.set('loggedIn', true);
    case SEARCH_COMPLETE:
      return state
        .set('loading', false)
        .set('searchResults', action.searchResults);
    default:
      return state;
  }
}

export default appReducer;
