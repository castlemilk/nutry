/**
 *
 * Asynchronously loads the component for ProfileTitle
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
