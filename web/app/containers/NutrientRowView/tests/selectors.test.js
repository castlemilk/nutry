import { fromJS } from 'immutable';

import { nutrient, portionSelected } from 'fixtures/foodprofile';
import { defaultNutrient } from 'lib/nutrientMap';
import {
  makeSelectNutrient,
  makeSelectNutrientSelected,
  makeSelectPortionSelected } from '../selectors';


describe('Container [NutrientRow] - selectors', () => {
  it('should select the specific nutrient hovered state', () => {
    const mockedState = fromJS({
      foodProfile: {
        nutrients: {
          byId: {
            CHOCDF: nutrient,
          },
        },
      },
    });
    expect(makeSelectNutrient('CHOCDF')(mockedState)).toEqual(nutrient);
  });
  it('should select the specific nutrient hovered state', () => {
    const mockedState = fromJS({
      foodProfile: {
        nutrients: {
          byId: {
            CHOCDF: nutrient,
          },
        },
      },
    });
    expect(makeSelectNutrient('FATSAT')(mockedState)).toEqual(defaultNutrient('FATSAT'));
  });
  it('should select the specific nutrient id hovered state', () => {
    const mockedState = fromJS({
      foodProfile: {
        idSelected: '2222',
      },
    });
    expect(makeSelectNutrientSelected('2222')(mockedState)).toEqual(true);
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
