/**
 *
 * Asynchronously loads the component for ProfilerAddElement
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
