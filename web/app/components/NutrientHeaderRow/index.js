/**
*
* NutrientHeaderRow
*
*/

import React from 'react';
import PropTypes from 'prop-types';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';
import RowName from './RowName';
// import RowUnits from './RowUnits';
// import RowValue from './RowValue';
import Row from './Row';

function NutrientHeaderRow(props) {
  /**
   * Main header row used to seperate groups such as Protein, Fat, Minerals etc.
   */
  return (
    <Row>
      <RowName className="header-row-name">{props.data.name}</RowName>;
      </Row>
  );
}


NutrientHeaderRow.propTypes = {
  data: PropTypes.object,
};


export default NutrientHeaderRow;
