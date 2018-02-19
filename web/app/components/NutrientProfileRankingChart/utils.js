import React from 'react';
import PropTypes from 'prop-types';

import { generateColor, scaledValue } from 'lib/utils';
import { prefixToName, prefixToUnit } from 'lib/nutrientMap';

export const CustomTooltip = (props) => {
  const { active, nutrientSelected, portionSelected } = props;
  if (active) {
    const { payload, foodID } = props;
    if (payload) {
      const { name, value, unit, id } = payload ? payload[0].payload : null;
      // TODO: add description mapping
      return (
        <div className="custom-tooltip">
          <p className="label">{foodID === id ? `${name} [Current FoodProfile]` : `${name}`}</p>
          <p className="intro">{`Contains ${value} ${unit} of ${nutrientSelected} per ${portionSelected.unit}`}</p>
          <p className="desc">Description: Coming soon!</p>
        </div>
      );
    }
    return (
      <div className="custom-tooltip">
      </div>
    );
  }
  return null;
};
CustomTooltip.propTypes = {
  payload: PropTypes.array,
};
export const CustomShape = (props) => { /* eslint react/prop-types: 0 */
  const barId = props.payload.id;
  const { fillActive, fill, x, y, width, height, radius, foodID } = props;
  // console.log(props);
  return <path d={getPath(x, y, width, height, radius)} stroke="none" fill={barId === foodID ? fillActive : fill} />;
};
const getPath = (x, y, width, height, radius) => {
  const maxRadius = Math.min(Math.abs(width) / 2, Math.abs(height) / 2);
  const sign = height >= 0 ? 1 : -1;
  const clockWise = height >= 0 ? 1 : 0;
  let path;

  if (maxRadius > 0 && radius instanceof Array) {
    const newRadius = [];
    for (let i = 0, len = 4; i < len; i += 1) {
      newRadius[i] = radius[i] > maxRadius ? maxRadius : radius[i];
    }

    path = `M${x},${y + (sign * newRadius[0])}`;

    if (newRadius[0] > 0) {
      path += `A ${newRadius[0]},${newRadius[0]},0,0,${clockWise},${x + newRadius[0]},${y}`;
    }

    path += `L ${(x + width) - newRadius[1]},${y}`;

    if (newRadius[1] > 0) {
      path += `A ${newRadius[1]},${newRadius[1]},0,0,${clockWise},
       ${x + width},${y + (sign * newRadius[1])}`;
    }
    path += `L ${x + width},${(y + height) - (sign * newRadius[2])}`;

    if (newRadius[2] > 0) {
      path += `A ${newRadius[2]},${newRadius[2]},0,0,${clockWise},
       ${(x + width) - newRadius[2]},${y + height}`;
    }
    path += `L ${x + newRadius[3]},${y + height}`;

    if (newRadius[3] > 0) {
      path += `A ${newRadius[3]},${newRadius[3]},0,0,${clockWise},
       ${x},${(y + height) - (sign * newRadius[3])}`;
    }
    path += 'Z';
  } else if (maxRadius > 0 && radius === +radius && radius > 0) {
    const newRadius = Math.min(maxRadius, radius);

    path = `M ${x},${y + (sign * newRadius)}
           A ${newRadius},${newRadius},0,0,${clockWise},${x + newRadius},${y}
           L ${x + (width - newRadius)},${y}
           A ${newRadius},${newRadius},0,0,${clockWise},${x + width},${y + (sign * newRadius)}
           L ${x + width},${(y + height) - (sign * newRadius)}
           A ${newRadius},${newRadius},0,0,${clockWise},${x + (width - newRadius)},${y + height}
           L ${x + newRadius},${y + height}
           A ${newRadius},${newRadius},0,0,${clockWise},${x},${(y + height) - (sign * newRadius)} Z`;
  } else {
    path = `M ${x},${y} h ${width} v ${height} h ${-width} Z`;
  }
  return path;
};

export function processData(rawData, nutrientSelected, portionSelected) {
  if (rawData.length === 0) {
    return [];
  }
  const barData = rawData.get(nutrientSelected);
  if (!barData) {
    return [];
  }
  const COLORS = generateColor('#A75FFF', '#5A338A', barData.length);
  return barData
  .filter((value) => value.get('value') !== '~')
      .sort((a, b) => b.get('value') - a.get('value'))
        .map((value, index) => value.set('fill', COLORS[index % COLORS.length]).set('value', typeof value.get('value') === 'number' ? scaledValue(value.get('value'), portionSelected.g) : 0).toJS());
}

export const xLabel = (nutrient) => `${prefixToName(nutrient)} [${prefixToUnit(nutrient)}]`;
