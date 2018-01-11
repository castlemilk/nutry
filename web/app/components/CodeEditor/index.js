/**
*
* CodeEditor
*
*/

import React from 'react';
import Embed from 'react-runkit';
// import RunKit from 'react-runkit-embed/RunKit';


// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import CodeEditorWrapper from './CodeEditorWrapper';

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
