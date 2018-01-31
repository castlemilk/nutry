import _ from 'lodash';

function interpolateColor(color1, color2, factor) {
  if (arguments.length < 3) {
    factor = 0.5;
  }
  const result = color1.slice();
  for (let i = 0; i < 3; i += 1) {
    result[i] = Math.round(result[i] + (factor * (color2[i] - color1[i])));
  }
  return convertToHex(result);
}
export function interpolateColors(color1, color2, steps) {
  const stepFactor = 1 / (steps - 1),
    interpolatedColorArray = [];

  color1 = color1.match(/\d+/g).map(Number);
  color2 = color2.match(/\d+/g).map(Number);

  for (let i = 0; i < steps; i++) {
    interpolatedColorArray.push(interpolateColor(color1, color2, stepFactor * i));
  }

  return interpolatedColorArray;
}

function hex(c) {
  const s = '0123456789abcdef';
  let i = parseInt(c);
  if (i === 0 || isNaN(c)) { return '00'; }
  i = Math.round(Math.min(Math.max(0, i), 255));
  return s.charAt((i - (i % 16)) / 16) + s.charAt(i % 16);
}

/* Convert an RGB triplet to a hex string */
function convertToHex(rgb) {
  return hex(rgb[0]) + hex(rgb[1]) + hex(rgb[2]);
}

/* Remove '#' in color hex string */
function trim(s) { return (s.charAt(0) === '#') ? s.substring(1, 7) : s; }

/* Convert a hex string to an RGB triplet */
function convertToRGB(hexString) {
  const color = [];
  color[0] = parseInt((trim(hexString)).substring(0, 2), 16);
  color[1] = parseInt((trim(hexString)).substring(2, 4), 16);
  color[2] = parseInt((trim(hexString)).substring(4, 6), 16);
  return color;
}
export function generateColor(colorStart, colorEnd, colorCount) {
  // The beginning of your gradient
  const start = convertToRGB(colorStart);

  // The end of your gradient
  const end = convertToRGB(colorEnd);

  // The number of colors to compute
  const len = colorCount;

  // Alpha blending amount
  let alpha = 0.0;

  const saida = [];

  for (let i = 0; i < len; i += 1) {
    const c = [];
    alpha += (1.0 / len);

    c[0] = (start[0] * alpha) + ((1 - alpha) * end[0]);
    c[1] = (start[1] * alpha) + ((1 - alpha) * end[1]);
    c[2] = (start[2] * alpha) + ((1 - alpha) * end[2]);

    saida.push(`#${convertToHex(c)}`);
  }

  return saida;
}


export const arrayToObject = (array) =>
   array.reduce((obj, item) => {
     obj[item.id] = item;
     return obj;
   }, {});


export function scaledValue(value, portion = false) {
  if (!portion) {
    return truncateTo(value, 2);
  } else if (value) {
    return truncateTo(value * scale(portion), 2);
  }

  return 0;
}

const truncateTo = (unRouned, nrOfDecimals = 2) => {
  const parts = String(unRouned).split('.');

  if (parts.length !== 2) {
          // without any decimal part
    return unRouned;
  }

  const newDecimals = parts[1].slice(0, nrOfDecimals);
  const newString = `${parts[0]}.${newDecimals}`;
  return Number(newString);
};

function scale(portion) {
    /**
     * Attempt to parse combinations of scales/portions and return an numerical
     * value for usage by higher order functions.
     */
  const defaultUnit = 100; // per 100g is the default measurement

  if (_.isInteger(portion)) {
      // portion = 200 (g)
    return _.parseInt(portion) / defaultUnit;
  } else if (isFloat(portion)) {
      // portion = 28.5 (g)
    return parseFloat(portion) / defaultUnit;
  } else if (!isNumeric(portion)) {
      // portion = 1 tsp
  } else {
    return 1;
  }
  return 1;
}
function isFloat(n) {
  return isNumeric(n) && !_.isInteger(n);
}
function isNumeric(n) {
  return !_.isNaN(n) && _.isFinite(n);
}
