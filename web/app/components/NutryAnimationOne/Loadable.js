/**
 *
 * Asynchronously loads the component for NutryAnimationOne
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
