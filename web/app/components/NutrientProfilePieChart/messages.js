/*
 * NutrientProfilePieChart Messages
 *
 * This contains all the text for the NutrientProfilePieChart component.
 */
import { defineMessages } from 'react-intl';

const scope = 'app.components.NutrientProfilePieChart';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the NutrientProfilePieChart component !',
  },
  chartTitle: {
    id: `${scope}.chartTitle`,
    defaultMessage: 'Percentage Composition',
  },
});
