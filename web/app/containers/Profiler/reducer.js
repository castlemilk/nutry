/*
 *
 * Profiler reducer
 *
 */

import { fromJS, Map } from 'immutable';
import uuidv4 from 'uuid/v4';
import {
  DEFAULT_ACTION,
  CHANGE_PROFILER_SEARCH,
  SEARCH_COMPLETE,
  SEARCH_FAILURE,
  ADD_PROFILER_ELEMENT,
  DELETE_PROFILER_ELEMENT,
  UPDATE_PROFILER_ELEMENT,
} from './constants';

const initialState = fromJS({
  loading: false,
  results: [],
  elements: {},
});

function profilerReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case CHANGE_PROFILER_SEARCH:
      return state
        .set('loading', true);
    case SEARCH_COMPLETE:
      return state
        .set('results', action.results)
        .set('loading', false);
    case ADD_PROFILER_ELEMENT: {
      const id = uuidv4();
      return state.setIn(['elements', id], Map({
        nutrient: { value: 'CHOCDF', label: 'Carbohydrates', className: 'elements-carbohydrates' },
        scale: 50,
      }));
    }
    case DELETE_PROFILER_ELEMENT:
      return state.deleteIn(['elements', action.id]);
    case UPDATE_PROFILER_ELEMENT:
      return state.setIn(['elements', action.id, action.key], action.value);
    default:
      return state;
  }
}

export default profilerReducer;
