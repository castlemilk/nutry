/*
 *
 * SearchB reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  CHANGE_SEARCH,
  SEARCH_COMPLETE,
} from './constants';

const initialState = fromJS({
  searchString: '',
  loading: false,
  results: [],
});

function searchReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case CHANGE_SEARCH:
      return state
        .set('searchString', action.searchString)
        .set('loading', true);
    case SEARCH_COMPLETE:
      return state
        .set('results', action.results)
        .set('loading', false);
    default:
      return state;
  }
}

export default searchReducer;
