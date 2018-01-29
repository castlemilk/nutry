import { getMultiFoodProfile } from 'services/firebase/firebase';
import { DETAILED_IDS } from 'containers/FoodProfile/constants';
import { getNutrient } from './nutrientMap';

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

export function getRankingResults(searchResults) {
  // console.log('getRankingResults:');
  // console.log(searchResults);
  // console.log(searchResults.items.map((item) => console.log(item._source.SN)));
  const ids = searchResults.items.map((item) => item._source.SN);
  const rankings = DETAILED_IDS.reduce((accumulator, prefix) => ({ ...accumulator, [prefix]: {} }), {});
  // console.log(rankings);
  const data = getMultiFoodProfile(ids).then((resultsArray) => {
    for (const [id, profile] of resultsArray.entries()) {
      const { nutrients } = profile;
      for (const prefix of DETAILED_IDS) {
        if (nutrients[prefix]) {
          rankings[prefix][id] = {
            name: nutrients[prefix].name,
            value: nutrients[prefix].value,
            units: nutrients[prefix].units };
        }
      }
    }
    return rankings;
  }).then((result) => console.log(result));
}
