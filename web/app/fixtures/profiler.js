import { List } from 'immutable';
export const nutrient = {
  className: 'elements-water',
  label: 'Water',
  value: 'WATER',
};
export const elements = {
  uuid1: {
    nutrient,
    scale: 50,
  },
};
export const elementsList = List([
  { id: 'uuid1',
    nutrient: { className: 'elements-water', label: 'Water', value: 'WATER' },
    scale: 50 },
]);
