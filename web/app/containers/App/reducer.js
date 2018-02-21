/*
 *
 * LandingPage reducer
 *
 */

import { fromJS, List } from 'immutable';
import {
  SEARCH_COMPLETE,
} from 'containers/Search/constants';
import {
  DEFAULT_ACTION,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from './constants';


const initialState = fromJS({
  loggedIn: false,
  searchResults: List([]),
  loading: true,
  error: false,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case LOGIN_SUCCESS:
      return state.set('loggedIn', true)
                  .set('error', false);
    case LOGIN_FAILURE:
      return state.set('error', true);
    case SEARCH_COMPLETE:
      return state
        .set('loading', false)
        .set('searchResults', action.searchResults)
        .set('error', false);
    default:
      return state;
  }
}

export default appReducer;
