import { fromJS } from 'immutable';

import { rankingResults, portionSelected, nutrientSelected } from 'fixtures/foodprofile';
import {
  makeSelectLoading,
  makeSelectRankingResults,
  makeSelectNutrientSelected,
  makeSelectPortionSelected,
} from '../selectors';


describe('Container [NutrientProfileRankingChartView] - selectors', () => {
  it('should select the loading state', () => {
    const mockedState = fromJS({
      nutrientRanking: {
        loading: true,
      },
    });
    expect(makeSelectLoading()(mockedState)).toEqual(true);
  });
  it('should select the ranking results', () => {
    const mockedState = fromJS({
      nutrientRanking: {
        rankingResults,
      },
    });
    expect(makeSelectRankingResults()(mockedState)).toEqual(rankingResults);
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
