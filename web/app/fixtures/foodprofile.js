import { Map } from 'immutable';

export const rankingResultsProfiles = {
  hits: 6,
  max_score: 16.974787,
  items: [
    { _index: 'nutry-names', _type: 'names', _id: 'AWF8pHZ9bw9zRJtz161q', _score: 16.974787, _source: { SN: '02049', name: 'Fresh thyme', alias: ['Fresh thyme', 'thyme'], tags: ['raw thyme', 'fresh herb', 'herb'], usage: ['spice', 'seasoning', 'flavour', 'poultry', 'meat', 'chicken', 'turkey', 'ingredient'], group: 'Spices and Herbs', allergen: [''], source: 'USDA', clinical_pos: [], clinical_neg: [] } }, { _index: 'nutry-names', _type: 'names', _id: 'AWF8pHUUbw9zRJtz161W', _score: 16.95878, _source: { SN: '02042', name: 'Dried thyme', alias: ['Dried thyme', 'thyme, dried'], tags: ['herb', 'dried herbs'], usage: ['seasoning', 'spice', 'chicken', 'turkey', 'poultry', 'meat', 'marinade', 'flavour', 'ingredient'], group: 'Spices and Herbs', allergen: [''], source: 'USDA', clinical_pos: [], clinical_neg: [] } }, { _index: 'nutry-names', _type: 'names', _id: 'AWF8plJ6bw9zRJtz18EX', _score: 5.851066, _source: { SN: '13337', name: 'raw beef thymus', alias: ['raw beef thymus'], tags: ['thymus', 'organ', 'offal', 'sweetbread'], usage: ['cooking', 'fry', 'stew', 'braise', 'roast', 'grill'], group: 'Beef Products', allergen: ['beef'], source: 'USDA', clinical_pos: [], clinical_neg: [] } }, { _index: 'nutry-names', _type: 'names', _id: 'AWF8p4smbw9zRJtz18vv', _score: 5.7062364, _source: { SN: '17218', name: 'Raw veal thymus', alias: ['Raw veal thymus'], tags: ['thymus', 'offal', 'organ', 'veal', 'lamb'], usage: ['cooking', 'fry', 'braise', 'grill'], group: 'Lamb, Veal, and Game Products', allergen: [''], source: 'USDA', clinical_pos: [], clinical_neg: [] } }, { _index: 'nutry-names', _type: 'names', _id: 'AWF8plI2bw9zRJtz18ES', _score: 5.3886666, _source: { SN: '13338', name: 'braised beef thymus', alias: ['braised beef thymus'], tags: ['sweetbread', 'beef', 'thymus', 'meat', 'offal', 'cooked'], usage: ['side', 'dish', 'Meal'], group: 'Beef Products', allergen: ['beef'], source: 'USDA', clinical_pos: [], clinical_neg: [] } }, { _index: 'nutry-names', _type: 'names', _id: 'AWF8pksRbw9zRJtz18Bm', _score: 5.3886666, _source: { SN: '17219', name: 'braised veal thymus', alias: ['braised veal thymus'], tags: ['cooked', 'offal', 'veal', 'lamb', 'baby lamb', 'thymus'], usage: ['side', 'dish', 'meal'], group: 'Lamb, Veal, and Game Products', allergen: [''], source: 'USDA', clinical_pos: [], clinical_neg: [] } }],

};
export const rankingResults = Map({
  ALA: [],
  ARG: [],
  CA: [
    Map({ name: 'raw beef thymus', id: '13337', value: 7, unit: 'mg' }),
    Map({ name: 'braised beef thymus', id: '13338', value: 10, unit: 'mg' }),
    Map({ name: 'Raw veal thymus', id: '17218', value: 3, unit: 'mg' }),
    Map({ name: 'braised veal thymus', id: '17219', value: 4, unit: 'mg' }),
    Map({ name: 'Fresh thyme', id: '02049', value: 405, unit: 'mg' }),
    Map({ name: 'Dried thyme', id: '02042', value: 1890, unit: 'mg' }),
  ],
  CHOCDF: [
    Map({ name: 'raw beef thymus', id: '13337', value: 0, unit: 'g' }),
    Map({ name: 'braised beef thymus', id: '13338', value: 0, unit: 'g' }),
    Map({ name: 'Raw veal thymus', id: '17218', value: 0, unit: 'g' }),
    Map({ name: 'braised veal thymus', id: '17219', value: 0, unit: 'g' }),
    Map({ name: 'Fresh thyme', id: '02049', value: 24.45, unit: 'g' }),
    Map({ name: 'Dried thyme', id: '02042', value: 63.94, unit: 'g' }),
  ],
  VITD: [
    Map({ name: 'braised veal thymus', id: '17219', value: 0, unit: 'ug' }),
    Map({ name: 'Fresh thyme', id: '02049', value: 0, unit: 'ug' }),
    Map({ name: 'Dried thyme', id: '02042', value: 0, unit: 'ug' }),
  ],
});
export const portionSelected = {
  amt: 1,
  className: 'per100g',
  g: 100,
  label: 'per 100g',
  unit: 'per 100g',
  value: 100,
};
export const nutrient = Map({
  prefix: 'CHOCDF',
  name: 'Carbohydrates, by difference',
  units: 'g',
  value: 7,
  rdi: null,
});
export const nutrientNoValue = Map({
  prefix: 'CHOCDF',
  name: 'Carbohydrates, by difference',
  units: 'g',
  value: '~',
  rdi: null,
});
export const profileInfo = {
  SN: '02042',
  name: 'Dried thyme',
  alias: ['Dried thyme', 'thyme, dried'],
  tags: ['herb', 'dried herbs'],
  usage: ['seasoning', 'spice', 'chicken', 'turkey', 'poultry', 'meat', 'marinade', 'flavour', 'ingredient'],
  group: 'Spices and Herbs',
  allergen: [''],
  source: 'USDA',
  clinical_pos: [],
  clinical_neg: [] };
