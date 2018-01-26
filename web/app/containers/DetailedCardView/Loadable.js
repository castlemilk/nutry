/**
 *
 * Asynchronously loads the component for DetailedCardView
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
