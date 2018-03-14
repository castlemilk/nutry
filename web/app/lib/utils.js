import _ from 'lodash';

export function getXPosition(radius, index) {
  return Math.cos(index * 15) * radius;
}
export function getYPosition(radius, index) {
  return Math.sin(index * 15) * radius;
}
/**
 * Return the index with the largest value. This index will then be used
 * to set as the default section selected in the recharts graphic on render.
 * @param  {Array} data list of nutrients
 * @return {Number} index with highest value.
 */
export function getIndexLargestValue(data) {
  if (!data) {
    return -1;
  }
  return data.reduce((a, b, index) => (b.value > a[0] && typeof b.value === 'number') ? [b.value, index] : a, [-1, -1]
)[1];
  // console.log(data);
  // return data.reduce((a, b, index) => (b.get('value') > a[0] && typeof b.get('value') === 'number') ? [b.get('value'), index] : a, [-1, -1]
// )[1];
}
/**
 * Determine the index corresponding to the specified nutrient. This will be
 * used to update the pie chart selected section to the hovered/select nutrient
 * @param  {Array} pieData  [description]
 * @param  {Object} nutrient [description]
 * @return {Number}          [description]
 */
export function nutrientToIndex(data, prefix) {
  if (!data || !prefix) {
    return null;
  }
  const index = data.findIndex((x) => x.prefix === prefix);
  if (index === -1) {
    return null;
  }
  if (data[index].value === '~' || !isNumeric(data[index].value)) {
    return null;
  }

  return index;
}
export function hex(c) {
  const s = '0123456789abcdef';
  let i = parseInt(c, 10);
  if (i === 0 || isNaN(c)) { return '00'; }
  i = Math.round(Math.min(Math.max(0, i), 255));
  return s.charAt((i - (i % 16)) / 16) + s.charAt(i % 16);
}

/* Convert an RGB triplet to a hex string */
export function convertToHex(rgb) {
  return hex(rgb[0]) + hex(rgb[1]) + hex(rgb[2]);
}

/* Remove '#' in color hex string */
export function trim(s) { return (s.charAt(0) === '#') ? s.substring(1, 7) : s; }

/* Convert a hex string to an RGB triplet */
export function convertToRGB(hexString) {
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
   array.reduce((obj, item) => ({
     ...obj,
     [item.id]: item,
   }), {});


export function scaledValue(value, portion = false) {
  if (!portion) {
    return truncateTo(value, 2);
  } else if (value) {
    return truncateTo(value * scale(portion), 2);
  }
  return 0;
}

export const truncateTo = (unRouned, nrOfDecimals = 2) => {
  const parts = String(unRouned).split('.');

  if (parts.length !== 2) {
          // without any decimal part
    return unRouned;
  }

  const newDecimals = parts[1].slice(0, nrOfDecimals);
  const newString = `${parts[0]}.${newDecimals}`;
  return Number(newString);
};

export function scale(portion) {
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
    return parseFloat((parseFloat(portion) / defaultUnit).toFixed(3));
  }
  return 1;
}
function isFloat(n) {
  return isNumeric(n) && !_.isInteger(n);
}
function isNumeric(n) {
  return !_.isNaN(n) && _.isFinite(n);
}
