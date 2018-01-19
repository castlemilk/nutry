/**
 *
 * FoodProfile reducer
 *
 */
import { fromJS, List, Map } from 'immutable';
import { defaultPortions } from 'lib/nutrientMap';
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
} from './constants';


const initialState = fromJS({
  loading: true,
  serialNumber: null,
  profileBody: {},
  error: false,
  source: null,
  tabSelected: 'summary',
  nutrientSelected: {},
  portionSelected: Map({}),
  portionsAvailable: List([]),
  ageGroupSelected: Map({}),
});

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
        .set('profileBody', action.profileBody)
        .set('portionsAvailable', defaultPortions(action.profileBody.portions))
        .set('portionSelected', defaultPortions(action.profileBody.portions)[0])
        .set('ageGroupSelected', { value: 'AM19', label: 'Adult Male (19-30)', className: 'am-19' })
        .set('loading', false)
        .set('error', false);
    case GET_PROFILE_FAILURE:
      return state
        .set('error', true);
    case AGE_GROUP_CHANGED:
      return state
        .set('ageGroupSelected', action.ageGroupSelected);
    case PORTION_CHANGED:
      return state
        .set('portionSelected', action.portionSelected);
    case TAB_CHANGED:
      return state
        .set('tabSelected', action.tab);
    case NUTRIENT_SELECTED:
      return state
        .set('nutrientSelected', action.nutrient);
    default:
      return state;
  }
}

export default foodProfileReducer;
