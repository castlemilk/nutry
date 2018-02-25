/**
 *
 * DetailedCardView
 *
 */
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import DetailedCard from 'components/DetailedCard';
import { makeSelectNutrientBySection } from './selectors';

const mapStateToProps = createStructuredSelector({
  nutrientSections: makeSelectNutrientBySection(),
});

const DetailedCardView = withRouter(connect(mapStateToProps)(DetailedCard));

export default DetailedCardView;
