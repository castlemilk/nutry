import React from 'react';
import ScrollOverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import QueueAnim from 'rc-queue-anim';
import { FormattedMessage } from 'react-intl';
import CodeEditor from 'components/CodeEditor';
import { Row, Col } from 'antd';

import messages from './messages';
import Page3Wrapper from './Page3Wrapper';


class Page3 extends React.Component { // eslint-disable-line react/prefer-stateless-function


  render() {
    const codeEditor = (<div className="code-editor"><CodeEditor /></div>);
    return (
      <Page3Wrapper >
        <div className="home-page-wrapper page3">
          <div className="page" >
            <h2><FormattedMessage {...messages.developers} /></h2>
            <ScrollOverPack component={Row} className="page3-content" playScale="0.1">
              <Col key="side-bar-left" xs={4} md={4}>
              </Col>
              <QueueAnim
                component={Col}
                componentProps={{ xs: 16, md: 16 }}
                className="page3-editor"
                key="editor"
                type="bottom"
                leaveReverse
              >
                <h3 className="description">
                  {messages.developers.description}
                </h3>
                {codeEditor}
              </QueueAnim>
              <Col key="side-bar-right" xs={4} md={4}>
              </Col>
            </ScrollOverPack>
          </div>
        </div>
      </Page3Wrapper>
    );
  }


}

export default Page3;
