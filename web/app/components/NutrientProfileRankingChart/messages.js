/*
 * NutrientProfileRankingChart Messages
 *
 * This contains all the text for the NutrientProfileRankingChart component.
 */
import { defineMessages } from 'react-intl';

const scope = 'app.components.NutrientProfileRankingChart';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the NutrientProfileRankingChart component !',
  },
  chartTitle: {
    id: `${scope}.chartTitle`,
    defaultMessage: 'Relative Comparison to Other Search Results',
  },
});
