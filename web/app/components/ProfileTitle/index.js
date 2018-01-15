/**
*
* ProfileTitle
*
*/

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function ProfileTitle(props) {
  return (
    <div className='profile-title'>
      <div className='profile-title-name' >{props.name}</div>
      <div className='profile-title-group' >{props.group}</div>
      <div className='profile-title-usage' >{props.usage.join(', ')}</div>
    </div>
  );
}

ProfileTitle.propTypes = {
  SN: PropTypes.String,
  name: PropTypes.String,

};

export default ProfileTitle;
