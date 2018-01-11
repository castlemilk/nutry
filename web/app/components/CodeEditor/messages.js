/*
 * CodeEditor Messages
 *
 * This contains all the text for the CodeEditor component.
 */
import { defineMessages } from 'react-intl';

const scope = 'app.components.CodeEditor';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the CodeEditor component !',
  },
  codeBlockJS: {
    id: `${scope}.header`,
    text: `// Require the Nutry SDK library with a test secret key.
const nutry = require('nutry')('BQokikJOvBiI2HlWgH4olfQ2');

// Search for foods
const charge = await nutry.search({
  name: 'chocolate',
});

// Click “▶ run” to try this code live and fetch a list of discovered foods.`,
  },
});
