/**
*
* NutrientParentNoNameRow
*
*/

import React from 'react';
import PropTypes from 'prop-types';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';
import RowName from './RowName';
import RowUnits from './RowUnits';
import RowValue from './RowValue';
import Row from './Row';

function NutrientParentNoNameRow(props) {
  /**
   * Nutrient Row which is a standard row within a category. Will have zero
   * indentation.
   * There are some nutrients which will be children of a parent nutrient and
   * will be depicted as children through indentations
   */
  // const name = props.nutrient.name;
  const units = props.nutrient.units;
  const value = props.nutrient.value ?
      props.nutrient.value :
      (<span style={{ color: 'red' }}>
        {'~'}
      </span>);
  return (
    <Row>
      <RowName> </RowName>
      <RowUnits>{units}</RowUnits>
      <RowValue>{value}</RowValue>
    </Row>
  );
}

NutrientParentNoNameRow.propTypes = {
  nutrient: PropTypes.object,
};

export default NutrientParentNoNameRow;
