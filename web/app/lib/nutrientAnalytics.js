import { Map, List } from 'immutable';
import { getMultiFoodProfile } from 'services/firebase/firebase';
import { DETAILED_IDS } from 'containers/FoodProfile/constants';
import { getNutrient } from './nutrientMap';
// import { getNutrient, prefixToName, prefixToUnit } from './nutrientMap';

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
export function getFilteredData(nutrients, nutrientFilter, ageGroupSelected, portionSelected) {
  if (!nutrients) {
    return null;
  }
  const scale = portionSelected.g;
  return nutrientFilter.map((prefix) => getNutrient(prefix, nutrients, scale, ageGroupSelected));
}

export function getRankingResults(searchResults) { /* eslint no-underscore-dangle: ["error", { "allow": [ "_source"] }]*/
  if (!searchResults.items) {
    return List([]);
  }
  const ids = searchResults.items.map((item) => item._source.SN);
  // console.log(DETAILED_IDS);
  // console.log(prefixToName);
  // console.log(prefixToUnit);
  const rankings = Map(DETAILED_IDS.reduce((accumulator, prefix) => ({ ...accumulator, [prefix]: [] }), {}));
  return getMultiFoodProfile(ids).then((resultsDict) => {
    Object.keys(resultsDict).map((id) => {
      // console.log(id);
      // console.log(resultsDict);
      const { nutrients, name } = resultsDict[id];
      // const nutrients = profile.get('nutrients');
      // const name = profile.get('name');
      DETAILED_IDS.map((prefix) => {
        if (nutrients[prefix]) {
          rankings.update(prefix, (l) => (l || List()).push(Map({
            name,
            id,
            value: nutrients[prefix].value === '~' ? 0 : nutrients[prefix].value,
            unit: nutrients[prefix].units })));
        }
        return null;
      });
      return rankings;
    });
    return rankings;
  }).then((result) =>
    // console.log(result);
     result);
}
