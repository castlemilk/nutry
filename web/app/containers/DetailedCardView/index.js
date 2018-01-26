/**
 *
 * DetailedCardView
 *
 */
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import DetailedCard from 'components/DetailedCard';
import { makeSelectNutrientBySection } from './selectors';

const mapStateToProps = createStructuredSelector({
  nutrientSections: makeSelectNutrientBySection(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const DetailedCardView = connect(mapStateToProps, mapDispatchToProps)(DetailedCard);

export default DetailedCardView;
