/**
*
* ProfilerAddElement
*
*/

import React from 'react';
import { FaPlus } from 'react-icons/lib/fa';
import PropTypes from 'prop-types';
import messages from './messages';
import ProfilerAddElementWrapper from './ProfilerAddElementWrapper';

function ProfilerAddElement(props) {
  return (
    <ProfilerAddElementWrapper>
      <div className="plus-button-wrapper" onClick={props.onClick}>
        <FaPlus style={{ fontSize: 30, color: 'white' }} />
        <span className="plus-text">{messages.plus.defaultMessage}</span>
      </div>
    </ProfilerAddElementWrapper>
  );
}

ProfilerAddElement.propTypes = {
  onClick: PropTypes.func,

};

export default ProfilerAddElement;
