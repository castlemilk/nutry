/**
 *
 * Asynchronously loads the component for SearchResultCard
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
