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
const SummaryCardView = withRouter(connect(mapStateToProps, null)(SummaryCard));
export default SummaryCardView;
