/**
*
* ProfilerDeleteElement
*
*/

import React from 'react';
import { FaClose } from 'react-icons/lib/fa';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import ProfilerDeleteElementWrapper from './ProfilerDeleteElementWrapper';


function ProfilerDeleteElement(props) {
  return (
    <ProfilerDeleteElementWrapper>
      <div className="delete-button-wrapper" onClick={props.onClick}>
        <FaClose style={{ fontSize: 30, color: '#b778ef' }} />
      </div>
    </ProfilerDeleteElementWrapper>
  );
}

ProfilerDeleteElement.propTypes = {
  onClick: PropTypes.func,

};

export default ProfilerDeleteElement;
