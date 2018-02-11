/**
 *
 * FoodProfile reducer
 *
 */
import { fromJS, List, Map } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

import {
  DEFAULT_ACTION,
  ON_BACK,
  GET_PROFILE,
  TAB_CHANGED,
  AGE_GROUP_CHANGED,
  PORTION_CHANGED,
  NUTRIENT_SELECTED,
  GET_PROFILE_FAILURE,
  GET_PROFILE_SUCCESS,
  SUMMARY_IDS,
  DETAILED_IDS,
  DETAILED_SECTIONS,
} from './constants';


const initialState = fromJS({
  loading: true,
  serialNumber: null,
  profileHeader: Map({}),
  error: false,
  source: null,
  nutrients: {
    byId: Map({}),
    bySection: Map(DETAILED_SECTIONS),
    bySummaryIds: SUMMARY_IDS,
    byDetailedIds: DETAILED_IDS,
  },
  tabSelected: 'summary',
  idSelected: null,
  nutrientSelected: 'CHOCDF',
  portionSelected: Map(
    { amt: 1,
      className: 'per100g',
      g: 100,
      label: 'per 100g',
      unit: 'per 100g',
      value: 100,
    }
),
  portionsAvailable: List([]),
  ageGroupSelected: Map({ value: 'AM19', label: 'Adult Male (19-30)', className: 'am-19' }),
});

const arrayToObject = (array) =>
   array.reduce((obj, item) => {
     const newAccum = obj;
     newAccum[item[0]] = Object.assign(item[1], { selected: false });
     return newAccum;
   }, {});

function foodProfileReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case ON_BACK:
      return initialState;
    case GET_PROFILE:
      return state
        .set('serialNumber', action.serialNumber)
        .set('source', action.source);
    case GET_PROFILE_SUCCESS:
      return state
        .set('profileHeader', action.profileHeader)
        .setIn(['nutrients', 'byId'], fromJS(arrayToObject(Object.entries(action.nutrientsById))))
        .set('portionsAvailable', List(action.portionsAvailable))
        .set('portionSelected', action.portionsAvailable[0])
        .set('ageGroupSelected', Map({ value: 'AM19', label: 'Adult Male (19-30)', className: 'am-19' }))
        .set('loading', false)
        .set('error', false);
    case GET_PROFILE_FAILURE:
      return state
        .set('error', true);
    case AGE_GROUP_CHANGED:
      return state
        .set('ageGroupSelected', Map(action.ageGroupSelected));
    case PORTION_CHANGED:
      return state
        .set(['nutrients', 'byId'], state.getIn(['nutrients', 'byId']).map((nutrient) => nutrient.set('value', nutrient.get('value') * (action.portionSelected.g / 100))))
        .set('portionSelected', action.portionSelected);
    case TAB_CHANGED:
      return state
        .set('tabSelected', action.tab);
    case NUTRIENT_SELECTED:
      return state
        .set('nutrientSelected', action.prefix)
        .set('idSelected', action.id);
        // .setIn(['nutrients', 'byId', action.id, 'selected'], !state.getIn(['nutrients', 'byId', action.id, 'selected']));
    case LOCATION_CHANGE:
      return state
        .set('loading', true)
        .set('error', false);
    default:
      return state;
  }
}

export default foodProfileReducer;
