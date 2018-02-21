/**
*
* NoResultsFound
*
*/

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Icon } from 'antd';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import NoResultsFoundWrapper from './NoResultsFoundWrapper';

function NoResultsFound() {
  return (
    <NoResultsFoundWrapper >
      <div className="icon-wrapper">
        <Icon type="frown" style={{ fontSize: 60, color: '#7F3FBF' }} />
      </div>
      <div className="message-wrapper">
        <FormattedMessage {...messages.header} />
      </div>
    </NoResultsFoundWrapper>
  );
}

NoResultsFound.propTypes = {

};

export default NoResultsFound;
