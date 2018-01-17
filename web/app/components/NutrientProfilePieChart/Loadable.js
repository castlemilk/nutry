/**
 *
 * Asynchronously loads the component for NutrientProfilePieChart
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
