/**
 *
 * Asynchronously loads the component for NutrientProfileRankingChart
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
