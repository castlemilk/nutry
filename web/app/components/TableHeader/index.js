/**
*
* TableHeader
*
*/

import React from 'react';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import Header from './Header';
import RowName from './RowName';
import RowUnits from './RowUnits';
import RowValue from './RowValue';
import Table from './Table';

class TableHeader extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Table>
        <Header>
          <RowName>Name</RowName>
          <RowUnits>Units</RowUnits>
          <RowValue>Value</RowValue>
        </Header>
      </Table>
    );
  }
}

export default TableHeader;
