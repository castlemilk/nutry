import { createSelector } from 'reselect';
import { Map } from 'immutable';

/**
 * Direct selector to the summaryCardView state domain
 */
const selectSummaryCardViewDomain = (state) => state.get('foodProfile');

/**
 * Other specific selectors
 */


/**
 * Default selector used by SummaryCardView
 */

const makeSelectSummaryCardView = () => createSelector(
  selectSummaryCardViewDomain,
  (substate) => substate.toJS()
);
const makeSelectBySummaryIds = () => createSelector(
  selectSummaryCardViewDomain,
  (substate) => substate.getIn(['nutrients', 'bySummaryIds'])
);
const makeSelectSummaryNutrients = () => createSelector(
  selectSummaryCardViewDomain,
  (substate) => {
    const summaryIds = substate.getIn(['nutrients', 'bySummaryIds']);
    const defaultObject = Map({
      name: 'NA',
      units: 'NA',
      value: null,
    });
    return summaryIds.map((item) => item.merge(substate.getIn(['nutrients', 'byId', item.get('id')]) ? substate.getIn(['nutrients', 'byId', item.get('id')]) : defaultObject));
  }
);

export default makeSelectSummaryCardView;
export {
  selectSummaryCardViewDomain,
  makeSelectBySummaryIds,
  makeSelectSummaryNutrients,
};
