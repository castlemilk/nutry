import { fromJS } from 'immutable';
// import { selectDetailedCardViewDomain } from '../selectors';
import { SUMMARY_IDS } from 'containers/FoodProfile/constants';
import {
  makeSelectBySummaryIds,
} from '../selectors';

describe('Container [DetailedCardView] - selectors', () => {
  describe('makeSelectLocation', () => {
    it('should select the location', () => {
      const foodProfile = fromJS({
        nutrients: { bySummaryIds: SUMMARY_IDS },
      });
      const mockedState = fromJS({
        foodProfile,
      });
      expect(makeSelectBySummaryIds()(mockedState)).toMatchSnapshot();
    });
  });
});
