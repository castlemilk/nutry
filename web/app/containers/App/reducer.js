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
  LOGIN_CLICKED,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from './constants';


const initialState = fromJS({
  loggedIn: false,
  searchResults: List([]),
  loading: true,
  error: false,
  username: false,
  token: false,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_CLICKED:
      return state.set('username', action.username);
    case LOGIN_SUCCESS:
      return state.set('loggedIn', true)
                  .set('error', false)
                  .set('token', action.token);
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
