import { createSelector } from 'reselect';

/**
 * Direct selector to the wikiView state domain
 */
const selectWikiViewDomain = (state) => state.get('wikiView');

/**
 * Other specific selectors
 */


/**
 * Default selector used by WikiView
 */

const makeSelectWikiView = () => createSelector(
  selectWikiViewDomain,
  (substate) => substate.toJS()
);

export default makeSelectWikiView;
export {
  selectWikiViewDomain,
};
