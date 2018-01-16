/**
*
* NutrientHeaderRow
*
*/

import React from 'react';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import RowName from './RowName';
import RowUnits from './RowUnits';
import RowValue from './RowValue';
import Row from './Row';

class NutrientHeaderRow extends React.Component {
  /**
   * Main header row used to seperate groups such as Protein, Fat, Minerals etc.
   */
  render() {
    return (
      <Row>
        <RowName>{this.props.data.name}</RowName>;
      </Row>
    );
  }
}


export default NutrientHeaderRow;
