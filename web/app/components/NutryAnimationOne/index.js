/**
*
* NutryAnimationOne
*
*/

import React from 'react';
import Anime from 'react-anime';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
//
import CogLarge from 'images/cog-large.svg';
import CogMedium from 'images/cog-medium.svg';
import Carrot from 'images/carrot.svg'
import Lemon from 'images/lemon.svg';
import Hotdog from 'images/hotdog.svg';
import Eggplant from 'images/eggplant.svg';
import Watermelon from 'images/watermelon.svg';
import Chicken from 'images/chicken.svg';
import Avocado from 'images/avocado.svg';
import NutryAnimationOneWrapper from './NutryAnimationOneWrapper';
const data = [
  {
    img: Carrot,
  },
  {
    img: Lemon,
  },
  {
    img: Hotdog,
  },
  {
    img: Eggplant,
  },
  {
    img: Watermelon,
  },
  {
    img: Chicken,
  },
  {
    img: Avocado,
  },
]
function getXPosition(radius, index) {
  return Math.cos(index * 15) * radius;
}
function getYPosition(radius, index) {
  return Math.sin(index * 15) * radius;
}
function NutryAnimationOne() {
  const radius = 20;
  return (
    <NutryAnimationOneWrapper>
      <div className="cogs-wrapper" >
      <div className="center-cog-large-logo" >
      <Anime  easing="linear"
        duration={15000}
        rotate={360}
        loop={true}
        direction="normal">
        <img src={CogLarge} />
      </Anime>
      </div>
      <div className="center-cog-medium-logo" >
      <Anime  easing="linear"
        duration={15000}
        rotate={360}
        loop={true}
        direction="reverse">
        <img src={CogMedium} />
      </Anime>
      </div>
      </div>
      <Anime easing="linear"
         duration={ (Math.floor(Math.random() * 20)) * 300}
         direction="normal"
         loop={true}
         delay={(el, index) => index * 240}
         opacity={[0.9, 0]}
         translateX={(el, index) => `${getXPosition(radius, index)}rem`}
         translateY={(el, index) => `${getYPosition(radius, index)}rem`}
         rotate={360}
         scale={[.6, .5]}>
         {data.map((item) => {
           return <div className="spray-images" ><img src={item.img} /></div>
         })}
      </Anime>
    </NutryAnimationOneWrapper>
  );
}

NutryAnimationOne.propTypes = {

};

export default NutryAnimationOne;
