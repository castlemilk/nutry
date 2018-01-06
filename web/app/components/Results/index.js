/**
*
* Results
*
*/

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function Results() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

Results.propTypes = {

};

export default Results;
