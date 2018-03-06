import { fromJS } from 'immutable';

import { nutrient, portionSelected } from 'fixtures/foodprofile';
import { INITIAL_STATE } from 'containers/FoodProfile/constants';
import {
  makeSelectLoading,
  makeSelectNutrients,
  makeSelectSummaryNutrients,
  makeSelectDetailedNutrients,
  makeSelectNutrientSelected,
  makeSelectPortionSelected,
} from '../selectors';

describe('Container [NutrientProfilePieChartView] - selectors', () => {
  describe('makeSelectLoading', () => {
    it('should select the loading state', () => {
      const mockedState = fromJS({
        foodProfile: {
          loading: true,
        },
      });
      expect(makeSelectLoading()(mockedState))
        .toEqual(mockedState.getIn(['foodProfile', 'loading']));
    });
  });
  describe('makeSelectSummaryNutrients', () => {
    it('should select the summary nutrients', () => {
      const mockedState = fromJS({
        foodProfile: INITIAL_STATE,
      });
      expect(makeSelectSummaryNutrients()(mockedState))
        .toEqual(mockedState.getIn(['foodProfile', 'nutrients', 'bySummaryPie']).toJS());
    });
  });
  describe('makeSelectDetailedNutrients', () => {
    it('should select the detailed nutrients', () => {
      const mockedState = fromJS({
        foodProfile: INITIAL_STATE,
      });
      expect(makeSelectDetailedNutrients()(mockedState))
        .toEqual(mockedState.getIn(['foodProfile', 'nutrients', 'byDetailedPie']).toJS());
    });
  });
  describe('makeSelectNutrientSelected', () => {
    it('should select the selected nutrient', () => {
      const mockedState = fromJS({
        foodProfile: {
          nutrientSelected: nutrient,
        },
      });
      expect(makeSelectNutrientSelected()(mockedState))
        .toEqual(mockedState.getIn(['foodProfile', 'nutrientSelected']));
    });
  });
  describe('makeSelectNutrient', () => {
    it('should select the summary nutrients', () => {
      const mockedState = fromJS({
        foodProfile: INITIAL_STATE,
      });
      // mockedState.setIn(['foodProfile', 'tabSelected'], 'summary');
      expect(makeSelectNutrients()(mockedState))
        .toEqual(mockedState.getIn(['foodProfile', 'nutrients', 'bySummaryPie']).toJS());
      expect(makeSelectNutrients()(mockedState.setIn(['foodProfile', 'tabSelected'], 'fhbhrs56')))
        .toEqual(mockedState.getIn(['foodProfile', 'nutrients', 'byDetailedPie']).toJS());
    });
    it('should select the detailed nutrients', () => {
      const mockedState = fromJS({
        foodProfile: INITIAL_STATE,
      });
      expect(makeSelectNutrients()(mockedState.setIn(['foodProfile', 'tabSelected'], 'detailed')))
        .toEqual(mockedState.getIn(['foodProfile', 'nutrients', 'byDetailedPie']).toJS());

      expect(makeSelectNutrients()(mockedState.setIn(['foodProfile', 'tabSelected'], 'summary')))
        .toEqual(mockedState.getIn(['foodProfile', 'nutrients', 'bySummaryPie']).toJS());
    });
  });
  describe('makeSelectPortionSelected', () => {
    it('should select the summary nutrients', () => {
      const mockedState = fromJS({
        foodProfile: {
          portionSelected,
        },
      });
      expect(makeSelectPortionSelected()(mockedState))
        .toEqual(mockedState.getIn(['foodProfile', 'portionSelected']));
    });
  });
});
