import PropTypes from 'prop-types';
import React from 'react';


function renderText(child, x, y, rotate, stroke, key) {
  if (child && child.content) {
    return (<text
      key={key}
      x={x}
      y={y}
      transform={`rotate(${rotate})`}
      textAnchor="middle"
      stroke={stroke}
      {...child.props}
    >
      {child.content}
    </text>);
  }

  return (<text
    key={key}
    x={x}
    y={y}
    transform={`rotate(${rotate})`}
    textAnchor="middle"
    stroke={stroke}
  >{child}</text>);
}

export default function AxisLabel({ axisType, x, y, width, height, stroke, children }) {
  const isVert = axisType === 'yAxis';
  const cx = isVert ? x : x + (width / 2);
  const cy = isVert ? (height / 2) + y : y + height + 20;
  const rot = isVert ? `270 ${cx} ${cy}` : 0;
  const lineHeight = 20;

  if (children.length > 1 && children.map) {
    return (<g>
      {children.map((child, index) =>
        renderText(
          child,
          cx,
          cy + (index * lineHeight),
          rot,
          stroke,
          index)
      )}
    </g>);
  }

  return renderText(children, cx, cy, rot, stroke);
}

AxisLabel.propTypes = {
  axisType: PropTypes.oneOf(['yAxis', 'xAxis']),
  x: PropTypes.number,
  y: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  stroke: PropTypes.string,
  children: PropTypes.any,
};
