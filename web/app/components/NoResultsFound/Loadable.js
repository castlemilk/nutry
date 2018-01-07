/**
 *
 * Asynchronously loads the component for NoResultsFound
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
