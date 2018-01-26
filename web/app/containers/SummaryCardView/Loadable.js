/**
 *
 * Asynchronously loads the component for SummaryCardView
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
