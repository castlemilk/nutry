/*
 * FoodProfileToolBar Messages
 *
 * This contains all the text for the FoodProfileToolBar component.
 */
import { defineMessages } from 'react-intl';

const scope = 'app.components.FoodProfileToolBar';

export default defineMessages({
  ageGroup: {
    id: `${scope}.agegroup`,
    defaultMessage: 'Age Group: ',
  },
  portion: {
    id: `${scope}.portion`,
    defaultMessage: 'Portion: ',
  },
});
