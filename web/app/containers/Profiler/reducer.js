/*
 *
 * Profiler reducer
 *
 */

import { fromJS, Map } from 'immutable';
import uuidv4 from 'uuid/v4';
import {
  DEFAULT_ACTION,
  ADD_PROFILER_ELEMENT,
  DELETE_PROFILER_ELEMENT,
  UPDATE_PROFILER_ELEMENT,
} from './constants';

const initialState = fromJS({
  elements: {},
});

function profilerReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case ADD_PROFILER_ELEMENT:
      const id = uuidv4();
      const default_element_body = Map({
        nutrient: 'carbohydrates',
        scale: 0.5,
      })
      return state.setIn(['elements', id], default_element_body)
    case DELETE_PROFILER_ELEMENT:
      return state.deleteIn(['elements', action.id]);
    case UPDATE_PROFILER_ELEMENT:
      console.log(action)
      return state.setIn(['elements', action.id, action.key], action.value)
    default:
      return state;
  }
}

export default profilerReducer;
