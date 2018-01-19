/**
 *
 * Asynchronously loads the component for NutrientRow
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
