/**
*
* FoodProfileToolBar
*
*/

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import FoodProfileToolBarWrapper from './FoodProfileToolBarWrapper';

function FoodProfileToolBar() {
  return (
    <FoodProfileToolBarWrapper>
      <FormattedMessage {...messages.header} />
    </FoodProfileToolBarWrapper>
  );
}

FoodProfileToolBar.propTypes = {

};

export default FoodProfileToolBar;
