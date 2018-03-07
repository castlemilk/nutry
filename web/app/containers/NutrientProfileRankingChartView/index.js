/**
 *
 * NutrientProfileRankingChartView
 *
 */
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import NutrientProfileRankingChart from 'components/NutrientProfileRankingChart';
import {
  makeSelectLoading,
  makeSelectRankingResults,
  makeSelectNutrientSelected,
  makeSelectPortionSelected,
 } from './selectors';
import { loadRankings } from './actions';
import reducer from './reducer';
import saga from './saga';


const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  rankingResults: makeSelectRankingResults(),
  nutrientSelected: makeSelectNutrientSelected(),
  portionSelected: makeSelectPortionSelected(),
});

export function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onLoadRankings: () => dispatch(loadRankings()),
    onLoadNewProfile: (profileId) => dispatch(push(`/foodprofile/${profileId}`)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'nutrientRanking', reducer });
const withSaga = injectSaga({ key: 'nutrientRanking', saga });

const NutrientProfileRankingChartView = compose(
  withReducer,
  withSaga,
  withConnect,
)(NutrientProfileRankingChart);

NutrientProfileRankingChartView.propTypes = {
  loading: PropTypes.bool,
  rankingResults: PropTypes.object,
  onLoadRankings: PropTypes.func,
  portionSelected: PropTypes.object,
  nutrientSelected: PropTypes.string,
  onOtherSearchResultSelect: PropTypes.func,
};

export default NutrientProfileRankingChartView;
