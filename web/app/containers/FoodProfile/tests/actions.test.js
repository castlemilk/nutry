
import { profileBody, portionSelected, ageGroupSelected } from 'fixtures/foodprofile';
import { defaultPortions } from 'lib/nutrientMap';

import {
  ON_BACK,
  GET_PROFILE,
  TAB_CHANGED,
  PORTION_CHANGED,
  AGE_GROUP_CHANGED,
  NUTRIENT_SELECTED,
  GET_PROFILE_FAILURE,
  GET_PROFILE_SUCCESS,
} from '../constants';

import {
  loadProfile,
  loadProfileSuccess,
  loadProfileFailure,
  tabChanged,
  portionChanged,
  nutrientSelected,
  onBack,
  clearFoodProfile,
  ageGroupChanged } from '../actions';

describe('Container [FoodProfile] - actions', () => {
  describe('loadProfile', () => {
    it('should return the correct type', () => {
      const serialNumber = '22222';
      const expectedResult = {
        type: GET_PROFILE,
        serialNumber,
      };

      expect(loadProfile(serialNumber)).toEqual(expectedResult);
    });
  });
  describe('loadProfileSuccess', () => {
    it('should return the correct type', () => {
      const { SN, name, group, alias, source, usage, tags } = profileBody;
      const expectedResult = {
        type: GET_PROFILE_SUCCESS,
        nutrientsById: profileBody.nutrients,
        profileHeader: { SN, name, group, alias, source, usage, tags },
        portionsAvailable: defaultPortions(profileBody.portions),
      };

      expect(loadProfileSuccess(profileBody)).toEqual(expectedResult);
    });
  });
  describe('loadProfileFailure', () => {
    it('should return the correct type', () => {
      const error = new Error();
      const expectedResult = {
        type: GET_PROFILE_FAILURE,
        error,
      };
      expect(loadProfileFailure(error)).toEqual(expectedResult);
    });
  });

  describe('tabChanged', () => {
    it('should return the correct structure', () => {
      const tab = 'detailed';
      const expectedResult = {
        type: TAB_CHANGED,
        tab,
      };
      expect(tabChanged(tab)).toEqual(expectedResult);
    });
  });
  describe('nutrientSelected', () => {
    it('should return correct structure', () => {
      const prefix = 'CHOCDF';
      const id = 'uuid';
      const expectedResult = {
        type: NUTRIENT_SELECTED,
        prefix,
        id,
      };
      expect(nutrientSelected(prefix, id)).toEqual(expectedResult);
    });
  });
  describe('portionChanged', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: PORTION_CHANGED,
        portionSelected,
      };
      expect(portionChanged(portionSelected)).toEqual(expectedResult);
    });
  });
  describe('ageGroupChanged', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: AGE_GROUP_CHANGED,
        ageGroupSelected,
      };
      expect(ageGroupChanged(ageGroupSelected)).toEqual(expectedResult);
    });
  });
  describe('onBack', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: ON_BACK,
      };
      expect(onBack()).toEqual(expectedResult);
    });
  });
  describe('clearFoodProfile', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: ON_BACK,
      };
      expect(clearFoodProfile()).toEqual(expectedResult);
    });
  });
});
