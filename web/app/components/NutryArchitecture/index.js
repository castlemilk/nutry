/**
*
* NutryArchitecture
*
*/

import React from 'react';
// import { Col } from 'antd';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import architectureAI from 'images/architectureAI.svg';
import architectureAPI from 'images/architectureAPI.svg';
import architectureCoreSystem from 'images/architectureCoreSystem.svg';
import architectureDataSources from 'images/architectureDataSources.svg';
import architectureGUI from 'images/architectureGUI.svg';
import architecturePathOne from 'images/architecturePathOne.svg';
import architecturePathTwo from 'images/architecturePathTwo.svg';
import architecturePathThree from 'images/architecturePathThree.svg';
import architectureEnterprise from 'images/architectureEnterprise.svg';

import NutryArchitectureWrapper from './NutryArchitectureWrapper';
const data = [
  {
    className: 'architectureDataSources',
    img: architectureDataSources,
  },
  {
    className: 'architecturePathOne',
    img: architecturePathOne,
  },
  {
    className: 'architectureCoreSystem',
    img: architectureCoreSystem,
  },
  {
    className: 'architecturePathTwo',
    img: architecturePathTwo,
  },
  {
    className: 'architectureAI',
    img: architectureAI,
  },
  {
    className: 'architecturePathThree',
    img: architecturePathThree,
  },
  {
    className: 'architectureEnterprise',
    img: architectureEnterprise,
  },
  {
    className: 'architectureGUI',
    img: architectureGUI,
  },
  {
    className: 'architectureAPI',
    img: architectureAPI,
  },
];

function NutryArchitecture(props) {
  const images = data.map((item) => (
    <img key={item.className} alt="" onFocus={() => props.onHover(item.className)} onMouseOver={() => props.onHover(item.className)} className={item.className} src={item.img} />
    ));
  return (
    <NutryArchitectureWrapper>
      <div className="architecture-box" >
        {images}
      </div>
    </NutryArchitectureWrapper>
  );
}

// NutryArchitecture.propTypes = {
//   onHover: PropTypes.func,
//
// };

export default NutryArchitecture;
