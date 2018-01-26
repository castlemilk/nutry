import { createSelector } from 'reselect';
import { defaultNutrient } from 'lib/nutrientMap';

/**
 * Direct selector to the nutrientRowView state domain
 */
const selectNutrientRowViewDomain = (state) => state.get('foodProfile');

/**
 * Other specific selectors
 */


/**
 * Default selector used by NutrientRowView
 */

const makeSelectNutrientRowView = () => createSelector(
  selectNutrientRowViewDomain,
  (substate) => substate.toJS()
);

const makeSelectNutrient = (id) => createSelector(
  selectNutrientRowViewDomain,
  (substate) => substate.getIn(['nutrients', 'byId', id]) || defaultNutrient(id)
);
const makeSelectNutrientSelected = (id) => createSelector(
  selectNutrientRowViewDomain,
  (substate) => id === substate.get('idSelected')
);
const makeSelectPortionSelected = () => createSelector(
  selectNutrientRowViewDomain,
  (substate) => substate.get('portionSelected')
);

export default makeSelectNutrientRowView;
export {
  selectNutrientRowViewDomain,
  makeSelectNutrientSelected,
  makeSelectPortionSelected,
  makeSelectNutrient,
};
