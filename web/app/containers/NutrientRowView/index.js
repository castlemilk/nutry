/**
 *
 * NutrientRowView
 *
 */
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { withRouter } from 'react-router-dom';
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
    onInfoClick: (id) => dispatch(push(`/wiki/${id}`)),
  };
}

const NutrientRowView = withRouter(connect(mapStateToProps, mapDispatchToProps)(NutrientRow));

export default NutrientRowView;
