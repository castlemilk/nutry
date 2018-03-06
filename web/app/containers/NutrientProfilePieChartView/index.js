/**
 *
 * NutrientProfilePieChartView
 *
 */
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import NutrientProfilePieChart from 'components/NutrientProfilePieChart';
import {
  makeSelectLoading,
  makeSelectSummaryNutrients,
  makeSelectNutrientSelected,
  makeSelectPortionSelected,
 } from './selectors';


const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  nutrients: makeSelectSummaryNutrients(),
  nutrientSelected: makeSelectNutrientSelected(),
  portionSelected: makeSelectPortionSelected(),
});


const withConnect = connect(mapStateToProps, {});

const NutrientProfilePieChartView = compose(
  withConnect,
)(NutrientProfilePieChart);

export default NutrientProfilePieChartView;

NutrientProfilePieChartView.propTypes = {
  loading: PropTypes.bool,
  nutrients: PropTypes.object,
  portionSelected: PropTypes.object,
  nutrientSelected: PropTypes.string,
};
