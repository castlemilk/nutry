/**
 *
 * Asynchronously loads the component for NutrientProfilePieChartView
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
