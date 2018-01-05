/*
 *
 * SearchB reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  CHANGE_SEARCH,
} from './constants';

const initialState = fromJS({
  searchString: '',
});

function searchReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case CHANGE_SEARCH:
      return state
        .set('searchString', action.searchString);
    default:
      return state;
  }
}

export default searchReducer;
