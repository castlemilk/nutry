/**
 *
 * Asynchronously loads the component for NutrientProfileRankingChartView
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
