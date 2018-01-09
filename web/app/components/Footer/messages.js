/*
 * Footer Messages
 *
 * This contains all the text for the Footer component.
 */
import { defineMessages } from 'react-intl';

const scope = 'app.components.Footer';

export default defineMessages({
  // Company
  about: {
    id: `${scope}.about`,
    defaultMessage: 'About',
  },
  blog: {
    id: `${scope}.blog`,
    defaultMessage: 'Blog',
  },
  press: {
    id: `${scope}.press`,
    defaultMessage: 'Press',
  },
  customers: {
    id: `${scope}.customers`,
    defaultMessage: 'Customers',
  },
  // Resources
  contact: {
    id: `${scope}.contact`,
    defaultMessage: 'Contact',
  },
  support: {
    id: `${scope}.support`,
    defaultMessage: 'Support',
  },
  privacyAndTerms: {
    id: `${scope}.privacyAndTerms`,
    defaultMessage: 'Privacy & Terms',
  },
  // Products
  search: {
    id: `${scope}.search`,
    defaultMessage: 'Search',
  },
  dietetics: {
    id: `${scope}.dietetics`,
    defaultMessage: 'Dietetics',
  },
  mobile: {
    id: `${scope}.mobile`,
    defaultMessage: 'Nutry Mobile',
  },
  web: {
    id: `${scope}.web`,
    defaultMessage: 'Nutry Web',
  },
  enterprise: {
    id: `${scope}.dicussion`,
    defaultMessage: 'Nutry Enterprise',
  },
  // Developers
  developers: {
    id: `${scope}.developers`,
    defaultMessage: 'Developers',
  },
  discussion: {
    id: `${scope}.discussion`,
    defaultMessage: 'Discussiom',
  },
  api_ref: {
    id: `${scope}.api_ref`,
    defaultMessage: 'API Reference',
  },
  api_status: {
    id: `${scope}.api_status`,
    defaultMessage: 'API Status',
  },
  documentation: {
    id: `${scope}.documentation`,
    defaultMessage: 'Documentation',
  },
});
