import { fromJS } from 'immutable';

import { profileHeader } from 'fixtures/foodprofile';
import { INITIAL_STATE } from '../constants';
import {
  makeSelectSerialNumber,
  makeSelectProfileHeader,
  makeSelectProfileLoading,
  makeSelectTabSelected,
  makeSelectNutrient,
  makeSelectAllNutrients,
  makeSelectNutrientsBySummaryIds,
  makeSelectNutrientsBySections,
  makeSelectNutrientSelected,
  makeSelectAgeGroup,
  makeSelectPortion,
  makeSelectPortions,
  makeSelectSource,
} from '../selectors';


describe('Container [FoodProfile] - selectors', () => {
  describe('makeSelectLocation', () => {
    it('should select the profileHeader', () => {
      const mockedState = fromJS({
        foodProfile: {
          profileHeader,
        },
      });
      expect(makeSelectProfileHeader()(mockedState)).toEqual(profileHeader);
    });
    it('should select the profile loading status', () => {
      const mockedState = fromJS({
        foodProfile: {
          loading: false,
        },
      });
      expect(makeSelectProfileLoading()(mockedState)).toEqual(false);
    });
    it('should select the serialNumber', () => {
      const mockedState = fromJS({
        foodProfile: {
          serialNumber: '2222',
        },
      });
      expect(makeSelectSerialNumber()(mockedState))
        .toEqual(mockedState.getIn(['foodProfile', 'serialNumber']));
    });
    it('should select nutrients -> byId object', () => {
      const mockedState = fromJS({
        foodProfile: {
          nutrients: {
            byId: {},
          },
        },
      });
      expect(makeSelectAllNutrients()(mockedState))
        .toEqual(mockedState.getIn(['foodProfile', 'nutrients', 'byId']));
    });
    it('should select nutrients -> bySummaryIds object', () => {
      const mockedState = fromJS({
        foodProfile: INITIAL_STATE,
      });
      expect(makeSelectNutrientsBySummaryIds()(mockedState))
        .toEqual(mockedState.getIn(['foodProfile', 'nutrients', 'bySummaryIds']));
    });
    it('should select nutrients -> BySections object', () => {
      const mockedState = fromJS({
        foodProfile: INITIAL_STATE,
      });
      expect(makeSelectNutrientsBySections()(mockedState))
        .toEqual(mockedState.getIn(['foodProfile', 'nutrients', 'bySections']));
    });
    it('should select nutrients -> byId -> prefix object', () => {
      const prefix = 'CHOCDF';
      const mockedState = fromJS({
        foodProfile: {
          nutrients: {
            byId: {
              CHOCDF: { g: 100 },
            },
          },
        },
      });
      expect(makeSelectNutrient(prefix)(mockedState))
        .toEqual(mockedState.getIn(['foodProfile', 'nutrients', 'byId', prefix]));
    });
    it('should select foodprofile source', () => {
      const mockedState = fromJS({
        foodProfile: INITIAL_STATE,
      });
      expect(makeSelectSource()(mockedState))
        .toEqual(mockedState.getIn(['foodProfile', 'source']));
    });
    it('should select foodprofile tab selected', () => {
      const mockedState = fromJS({
        foodProfile: INITIAL_STATE,
      });
      expect(makeSelectTabSelected()(mockedState))
        .toEqual(mockedState.getIn(['foodProfile', 'tabSelected']));
    });
    it('should select foodprofile portions available for selection', () => {
      const mockedState = fromJS({
        foodProfile: INITIAL_STATE,
      });
      expect(makeSelectPortions()(mockedState))
        .toEqual(mockedState.getIn(['foodProfile', 'portionsAvailable']).toJS());
    });
    it('should select foodprofile portion selected', () => {
      const mockedState = fromJS({
        foodProfile: INITIAL_STATE,
      });
      expect(makeSelectPortion()(mockedState))
        .toEqual(mockedState.getIn(['foodProfile', 'portionSelected']));
    });
    it('should select foodprofile nutrient selected', () => {
      const mockedState = fromJS({
        foodProfile: INITIAL_STATE,
      });
      expect(makeSelectNutrientSelected()(mockedState))
        .toEqual(mockedState.getIn(['foodProfile', 'nutrientSelected']));
    });
    it('should select foodprofile ageGroup selected', () => {
      const mockedState = fromJS({
        foodProfile: INITIAL_STATE,
      });
      expect(makeSelectAgeGroup()(mockedState))
        .toEqual(mockedState.getIn(['foodProfile', 'ageGroupSelected']).toJS());
    });
  });
});
