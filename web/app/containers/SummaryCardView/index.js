/**
 *
 * SummaryCardView
 *
 */


import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import SummaryCard from 'components/SummaryCard';
import { makeSelectBySummaryIds } from './selectors';

const mapStateToProps = createStructuredSelector({
  nutrientIds: makeSelectBySummaryIds(),
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});
const SummaryCardView = connect(mapStateToProps, mapDispatchToProps)(SummaryCard);
export default SummaryCardView;
