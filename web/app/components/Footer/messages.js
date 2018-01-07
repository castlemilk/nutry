/*
 * Footer Messages
 *
 * This contains all the text for the Footer component.
 */
import { defineMessages } from 'react-intl';

const scope = 'app.components.Footer';

export default defineMessages({
  about: {
    id: `${scope}.about`,
    defaultMessage: 'ABOUT US',
  },
  contact: {
    id: `${scope}.contact`,
    defaultMessage: 'CONTACT US',
  },
  services: {
    id: `${scope}.services`,
    defaultMessage: 'SERVICES',
  },
  products: {
    id: `${scope}.products`,
    defaultMessage: 'PRODUCTS',
  },
  community: {
    id: `${scope}.community`,
    defaultMessage: 'Community',
  },
  discussion: {
    id: `${scope}.discussion`,
    defaultMessage: 'DISCUSSION',
  },
  overview: {
    id: `${scope}.overview`,
    defaultMessage: 'MVP',
  },
  mobile: {
    id: `${scope}.mobile`,
    defaultMessage: 'NUTRY MOBILE',
  },
  web: {
    id: `${scope}.web`,
    defaultMessage: 'NUTRY WEB',
  },
  enterprise: {
    id: `${scope}.dicussion`,
    defaultMessage: 'NUTRY ENTERPRISE',
  },
});
