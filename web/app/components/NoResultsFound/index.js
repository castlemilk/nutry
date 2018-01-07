/**
*
* NoResultsFound
*
*/

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function NoResultsFound() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

NoResultsFound.propTypes = {

};

export default NoResultsFound;
