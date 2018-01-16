/**
 *
 * Asynchronously loads the component for NutrientDisplay
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
