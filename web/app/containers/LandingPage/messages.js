/*
 * LandingPage Messages
 *
 * This contains all the text for the LandingPage component.
 */
import { defineMessages } from 'react-intl';

const scope = 'app.containers.LandingPage';

export default defineMessages({
  introduce: {
    id: `${scope}.introduce`,
    defaultMessage: 'Highly intuitive and flexible nutrient search and planning tool',
  },
  search: {
    id: `${scope}.search`,
    defaultMessage: 'Search',
  },
  enterprise: {
    id: `${scope}.enterprise`,
    defaultMessage: 'Enterprise',
  },
  searchP1: {
    id: `${scope}.p1.search`,
    defaultMessage: 'Search',
  },
  profilerP1: {
    id: `${scope}.p1.profiler`,
    defaultMessage: 'Profiling',
  },
  recipeP1: {
    id: `${scope}.p1.recipe`,
    defaultMessage: 'Recipes',
  },
  wikiP1: {
    id: `${scope}.p1.wiki`,
    defaultMessage: 'Wiki',
  },
  features: {
    id: `${scope}.p1.recipe`,
    defaultMessage: 'Features',
  },
});
