
import { LOCATION_CHANGE } from 'react-router-redux';
import {
  portionSelected,
  profileBody,
  ageGroupSelected,
  nutrient } from 'fixtures/foodprofile';
import {
  loadProfile,
  tabChanged,
  portionChanged,
  loadProfileSuccess,
  loadProfileFailure,
  nutrientSelected,
  onBack,
  clearFoodProfile,
  ageGroupChanged } from '../actions';

import foodProfileReducer from '../reducer';

describe('Container [App] - reducers', () => {
  let state;
  beforeEach(() => {
  });
  it('should return the initial state', () => {
    expect(foodProfileReducer(undefined, {})).toMatchSnapshot();
  });
  it('should handle the loadProfile action correctly', () => {
    const serialNumber = '22222';
    expect(foodProfileReducer(state, loadProfile(serialNumber))).toMatchSnapshot();
  });
  it('should handle the tabChanged action correctly', () => {
    const tab = 'detailed';
    expect(foodProfileReducer(state, tabChanged(tab))).toMatchSnapshot();
  });
  it('should handle the portionChanged action correctly on empty', () => {
    expect(foodProfileReducer(state, portionChanged(portionSelected))).toMatchSnapshot();
  });
  it('should handle the portionChanged action correctly', () => {
    const updatedState = foodProfileReducer(state, loadProfileSuccess(profileBody));
    expect(foodProfileReducer(updatedState, portionChanged(portionSelected))).toMatchSnapshot();
  });
  it('should handle the ageGroupChanged action correctly', () => {
    expect(foodProfileReducer(state, ageGroupChanged(ageGroupSelected))).toMatchSnapshot();
  });
  it('should handle the loadProfileSuccess action correctly', () => {
    expect(foodProfileReducer(state, loadProfileSuccess(profileBody))).toMatchSnapshot();
  });
  it('should handle loadProfileFailure correctly', () => {
    const err = new Error('failed to retrieve profile');
    expect(foodProfileReducer(state, loadProfileFailure(err))).toMatchSnapshot();
  });
  it('should handle nutrientSelected correctly', () => {
    expect(foodProfileReducer(state, nutrientSelected(nutrient))).toMatchSnapshot();
  });
  it('should handle clearFoodProfile correctly', () => {
    expect(foodProfileReducer(state, clearFoodProfile())).toMatchSnapshot();
  });
  it('should handle onBack correctly', () => {
    expect(foodProfileReducer(state, onBack())).toMatchSnapshot();
  });
  it('should handle location change correctly', () => {
    expect(foodProfileReducer(state, { type: LOCATION_CHANGE })).toMatchSnapshot();
  });
});
