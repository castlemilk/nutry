import _ from 'lodash';
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

  return '~';
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
