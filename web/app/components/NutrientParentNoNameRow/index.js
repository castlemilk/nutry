/**
*
* NutrientParentNoNameRow
*
*/

import React from 'react';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import RowName from './RowName';
import RowUnits from './RowUnits';
import RowValue from './RowValue';
import Row from './Row';

class NutrientParentNoNameRow extends React.Component {
  /**
   * Nutrient Row which is a standard row within a category. Will have zero
   * indentation.
   * There are some nutrients which will be children of a parent nutrient and
   * will be depicted as children through indentations
   */
  render() {
    const name = this.props.nutrient.name;
    const units = this.props.nutrient.units;
    const value = this.props.nutrient.value ?
      this.props.nutrient.value :
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
}

export default NutrientParentNoNameRow;
