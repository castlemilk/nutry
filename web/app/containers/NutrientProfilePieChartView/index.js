/**
 *
 * NutrientProfilePieChartView
 *
 */
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';

import NutrientProfilePieChart from 'components/NutrientProfilePieChart';
import {
  makeSelectLoading,
  makeSelectSummaryNutrients,
  makeSelectNutrientSelected,
  makeSelectPortionSelected,
 } from './selectors';

import reducer from './reducer';

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  nutrients: makeSelectSummaryNutrients(),
  nutrientSelected: makeSelectNutrientSelected(),
  portionSelected: makeSelectPortionSelected(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'nutrientPie', reducer });

const NutrientProfilePieChartView = compose(
  withReducer,
  withConnect,
)(NutrientProfilePieChart);

export default NutrientProfilePieChartView;

NutrientProfilePieChartView.propTypes = {
  loading: PropTypes.bool,
  nutrients: PropTypes.object,
  portionSelected: PropTypes.object,
  nutrientSelected: PropTypes.string,
};
