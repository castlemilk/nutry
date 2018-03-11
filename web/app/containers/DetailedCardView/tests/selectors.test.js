import { Map, fromJS } from 'immutable';
// import { selectDetailedCardViewDomain } from '../selectors';
import { DETAILED_SECTIONS } from 'containers/FoodProfile/constants';
import {
  makeSelectNutrientBySection,
} from '../selectors';

describe('Container [DetailedCardView] - selectors', () => {
  describe('makeSelectLocation', () => {
    it('should select the location', () => {
      const foodProfile = fromJS({
        nutrients: { bySection: Map(DETAILED_SECTIONS) },
      });
      const mockedState = fromJS({
        foodProfile,
      });
      expect(makeSelectNutrientBySection()(mockedState)).toEqual(foodProfile.getIn(['nutrients', 'bySection']));
    });
  });
});
