/**
 *
 * FoodProfile reducer
 *
 */
import { fromJS, List, Map } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import { getFilteredData } from 'lib/nutrientAnalytics';
import { updateRDI } from 'lib/nutrientMap';
import { getIndexLargestValue } from 'lib/utils';

import {
  ON_BACK,
  GET_PROFILE,
  TAB_CHANGED,
  AGE_GROUP_CHANGED,
  PORTION_CHANGED,
  NUTRIENT_SELECTED,
  GET_PROFILE_FAILURE,
  GET_PROFILE_SUCCESS,
  // DETAILED_SECTIONS,
  // SUMMARY_IDS,
  // DETAILED_IDS,
  FILTERS,
  INITIAL_STATE,
} from './constants';

// const initialState = fromJS({
//   loading: true,
//   serialNumber: null,
//   profileHeader: Map({}),
//   error: false,
//   source: null,
//   nutrients: {
//     byId: Map({}),
//     bySection: Map(DETAILED_SECTIONS),
//     bySummaryIds: SUMMARY_IDS,
//     byDetailedIds: DETAILED_IDS,
//   },
//   tabSelected: 'summary',
//   idSelected: null,
//   nutrientSelected: 'CHOCDF',
//   portionSelected:
//   Map({ amt: 1,
//     className: 'per100g',
//     g: 100,
//     label: 'per 100g',
//     unit: 'per 100g',
//     value: 100,
//   }),
//   portionsAvailable: List([]),
//   ageGroupSelected: Map({ value: 'AM19', label: 'Adult Male (19-30)', className: 'am-19' }),
// });
const initialState = fromJS(INITIAL_STATE);

const arrayToObject = (array) =>
   array.reduce((obj, item) => {
     const newAccum = obj;
     newAccum[item[0]] = Object.assign(item[1], { selected: false });
     return newAccum;
   }, {});

function foodProfileReducer(state = initialState, action) {
  switch (action.type) {
    case ON_BACK:
      return initialState;
    case GET_PROFILE:
      return state
        .set('serialNumber', action.serialNumber);
    case GET_PROFILE_SUCCESS: {
      /**
       * TODO: utilise more efficient structure and manipulation of data for
       * the different nutrient storage and presenation requirements.
       */
      const nutrients = fromJS(arrayToObject(Object.entries(action.nutrientsById)));
      const defaultAgeGroup = Map({ value: 'AM19', label: 'Adult Male (19-30)', className: 'am-19' });
      const defaultPortion = action.portionsAvailable[0];
      const summaryPieNutients = getFilteredData(
        nutrients,
        FILTERS.summary,
        defaultAgeGroup);
      const nutrientSelected = summaryPieNutients.get(
          getIndexLargestValue(summaryPieNutients)
          ).get('prefix');
      return state
        .set('profileHeader', action.profileHeader)
        .setIn(['nutrients', 'byId'], nutrients)
        .setIn(['nutrients', 'bySummaryPie'], summaryPieNutients)

        .setIn(['nutrients', 'byDetailedPie'],
          getFilteredData(
            nutrients,
            FILTERS.detailed,
            defaultAgeGroup))
        .set('portionsAvailable', List(action.portionsAvailable))
        .set('portionSelected', defaultPortion)
        .set('ageGroupSelected', defaultAgeGroup)
        .set('nutrientSelected', nutrientSelected)
        .set('loading', false)
        .set('error', false);
    }
    case GET_PROFILE_FAILURE:
      return state
        .set('error', true);
    case AGE_GROUP_CHANGED: {
      const ageGroupSelected = Map(action.ageGroupSelected);
      return state
        .set('ageGroupSelected', ageGroupSelected)
        .updateIn(['nutrients', 'bySummaryPie'], (nutrients) => updateRDI(nutrients, ageGroupSelected))
        .updateIn(['nutrients', 'byDetailedPie'], (nutrients) => updateRDI(nutrients, ageGroupSelected));
    }
    case PORTION_CHANGED: {
      const scaledNutrients = state.getIn(['nutrients', 'byId']).map(
        (nutrient) => nutrient.set('value',
          nutrient.get('value') * (action.portionSelected.g / 100)
        )
      );
      const ageGroup = state.get('ageGroupSelected');
      const portionSelected = action.portionSelected;
      return state
        .set(['nutrients', 'byId'], scaledNutrients)
        .set('portionSelected', portionSelected)
        .setIn(['nutrients', 'bySummaryPie'],
          getFilteredData(
            scaledNutrients,
            FILTERS.summary,
            ageGroup))
        .setIn(['nutrients', 'byDetailedPie'],
          getFilteredData(
            scaledNutrients,
            FILTERS.summary,
            ageGroup));
    }
    case TAB_CHANGED:
      return state
        .set('tabSelected', action.tab);
    case NUTRIENT_SELECTED:
      return state
        .set('nutrientSelected', action.prefix)
        .set('idSelected', action.id);
        // .setIn(['nutrients', 'byId', action.id, 'selected'], !state.getIn(['nutrients', 'byId', action.id, 'selected']));
    case LOCATION_CHANGE:
      return initialState;
    default:
      return state;
  }
}

export default foodProfileReducer;
