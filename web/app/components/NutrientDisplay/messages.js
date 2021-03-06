/*
 * NutrientDisplay Messages
 *
 * This contains all the text for the NutrientDisplay component.
 */
import { defineMessages } from 'react-intl';

const scope = 'app.components.NutrientDisplay';

export default defineMessages({
  summaryTab: {
    id: `${scope}.summaryTab`,
    defaultMessage: 'SUMMARY',
  },
  detailedTab: {
    id: `${scope}.detailedTab`,
    defaultMessage: 'DETAILED',
  },
});
