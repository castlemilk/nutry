/**
*
* TableHeader
*
*/

import React from 'react';
import { FormattedMessage } from 'react-intl';
import Header from './Header';
import RowName from './RowName';
import RowUnits from './RowUnits';
import RowValue from './RowValue';
import Table from './Table';
import messages from './messages';

class TableHeader extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Table>
        <Header>
          <RowName><FormattedMessage {...messages.name} /></RowName>
          <RowUnits><FormattedMessage {...messages.units} /></RowUnits>
          <RowValue><FormattedMessage {...messages.value} /></RowValue>
        </Header>
      </Table>
    );
  }
}

export default TableHeader;
