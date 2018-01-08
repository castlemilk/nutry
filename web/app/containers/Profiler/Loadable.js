/**
 *
 * Asynchronously loads the component for Profiler
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
