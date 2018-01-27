/**
 *
 * NutrientRowView
 *
 */
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import NutrientRow from 'components/NutrientRow';
import { nutrientSelected } from 'containers/FoodProfile/actions';
import { makeSelectNutrient, makeSelectNutrientSelected, makeSelectPortionSelected } from './selectors';


const mapStateToProps = (state, { prefix, id }) => createStructuredSelector({
  nutrient: makeSelectNutrient(prefix),
  portion: makeSelectPortionSelected(),
  isSelected: makeSelectNutrientSelected(id),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onClick: (prefix, id) => dispatch(nutrientSelected(prefix, id)),
    onHover: (prefix, id) => dispatch(nutrientSelected(prefix, id)),
  };
}

const NutrientRowView = connect(mapStateToProps, mapDispatchToProps)(NutrientRow);

export default NutrientRowView;
