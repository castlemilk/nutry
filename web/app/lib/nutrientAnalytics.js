import { getNutrient, getEnergyKJ, getEnergyKCAL, getCarbohydrates } from './nutrientMap';
/**
 * Process a generic profileBody fetched from a given backend such as firebase
 * or mongoDB. This data will be in the form:
 * {group: "Spices and Herbs"}
 * manufacturer: ""
 * meta: {carb_factor: 3, fat_factor: 8.37, nitrogen_factor: 6.25, protein_factor: 2.44}
 * name: {common: "", long: "Spices, thyme, dried", sci: "Thymus vulgaris"}
 * nutrients: {ALC: {…}, ASH: {…}, CA: {…}, CAFFN: {…}, CARTA: {…}, …}
 * portions: (4) [{…}, {…}, {…}, {…}]
 * The aim is the process the above into the required data format for input
 * into the recharts data feed.
 * @param  {Object} nutrients Nutrient information payload
 * @return {Array}             formatted data stream for recharts input
 */

export function getPieDataSummary(portion = false, nutrients) {
  if (!nutrients) {
    return null;
  }
  return [
    getNutrient('CHOCDF', nutrients, portion),
    // getCarbohydrates(nutrients, portion),
    getNutrient('SUGAR', nutrients, portion),
    getNutrient('FIBTG', nutrients, portion),
    getNutrient('PROCNT', nutrients, portion),
    getNutrient('FAT', nutrients, portion),
    getNutrient('WATER', nutrients, portion),
  ];
}
export function getPieDataDetailed(portion = 100, nutrients) {
  return [
    getEnergyKJ(nutrients, portion),
    getEnergyKCAL(nutrients, portion),
    getCarbohydrates(nutrients, portion),
    getNutrient('SUGAR', nutrients, portion),
    getNutrient('FIBTG', nutrients, portion),
    getNutrient('PROCNT', nutrients, portion),
    getNutrient('FAT', nutrients, portion),
    getNutrient('NA', nutrients, portion),
    getNutrient('K', nutrients, portion),
    getNutrient('VITC', nutrients, portion),
    getNutrient('VITD', nutrients, portion),
  ];
}
