/**
 *
 * SummaryCardView
 *
 */


import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import SummaryCard from 'components/SummaryCard';
import { makeSelectBySummaryIds } from './selectors';

const mapStateToProps = createStructuredSelector({
  nutrientIds: makeSelectBySummaryIds(),
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});
const SummaryCardView = withRouter(connect(mapStateToProps, mapDispatchToProps)(SummaryCard));
export default SummaryCardView;
