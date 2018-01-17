/**
 *
 * Asynchronously loads the component for FoodProfileToolBar
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
