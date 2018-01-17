/**
*
* CodeEditor
*
*/

import React from 'react';
import Embed from 'react-runkit';


// import PropTypes from 'prop-types';
// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';
import messages from './messages';
import CodeEditorWrapper from './CodeEditorWrapper';
// TODO: Override runkit css to provide more UI friendly styling
class CodeEditor extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <CodeEditorWrapper>
        <Embed className="embed" source={messages.codeBlockJS.text} />
      </CodeEditorWrapper>
    );
  }
}

CodeEditor.propTypes = {

};

export default CodeEditor;
