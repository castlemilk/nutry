import { fromJS } from 'immutable';

import { nutrient, portionSelected, nutrientSelected } from 'fixtures/foodprofile';
import {
  makeSelectNutrient,
  makeSelectNutrientSelected,
  makeSelectPortionSelected } from '../selectors';


describe('Container [NutrientRow] - selectors', () => {
  it('should select the loading state', () => {
    const mockedState = fromJS({
      nutrientRanking: {
        nutrients: {
          byId: {
            CHOCDF: nutrient,
          },
        },
      },
    });
    expect(makeSelectNutrient()(mockedState)).toEqual(nutrient);
  });
  it('should select the nutrientSelected', () => {
    const mockedState = fromJS({
      foodProfile: {
        nutrientSelected,
      },
    });
    expect(makeSelectNutrientSelected()(mockedState))
        .toEqual(nutrientSelected);
  });
  it('should select portionSelected', () => {
    const mockedState = fromJS({
      foodProfile: {
        portionSelected,
      },
    });
    expect(makeSelectPortionSelected()(mockedState))
        .toEqual(mockedState.getIn(['foodProfile', 'portionSelected']));
  });
});
