import React from 'react';
// import { TweenOneGroup } from 'rc-tween-one';
import { Row, Col } from 'antd';
// import { Link } from 'react-router-dom';
import QueueAnim from 'rc-queue-anim';
import ScrollOverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import { FormattedMessage } from 'react-intl';
import NutryArchitecture from 'components/NutryArchitecture';

import messages from './messages';
import Page2Wrapper from './Page2Wrapper';

class Page2 extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.handleHover = this.handleHover.bind(this);
    this.state = {
      architectureHovering: 'architectureDefault',
    };
  }
  componentDidMount
  handleHover(value) {
    // console.log(`hovering on: ${value}`);
    this.setState({
      architectureHovering: value,
    });
  }

  render() {
    const descriptions = messages[`${this.state.architectureHovering}`];
    const archProps = {
      onHover: this.handleHover,
    };
    return (
      <Page2Wrapper >
        <div className="home-page-wrapper page2" id="page2">
          <div className="page" >
            <h2><FormattedMessage {...messages.nutrientEngine} /></h2>
            <ScrollOverPack component={Row} className="page2-content" playScale="0.4">
              <QueueAnim
                component={Col}
                componentProps={{ xs: 24, md: 12 }}
                className="page2-descriptions"
                key="left"
                type="bottom"
                leaveReverse
              >
                <h3 key="h1">{descriptions.title}</h3>
                <div className="descriptions-box" >
                  <span>{descriptions.text}</span>
                </div>
              </QueueAnim>
              <QueueAnim
                component={Col}
                componentProps={{ xs: 24, md: 12 }}
                className="page2-architecture"
                key="right"
                type="bottom"
                leaveReverse
              >
                <h3 key="h1">Architecture</h3>
                <NutryArchitecture {...archProps} />
              </QueueAnim>
            </ScrollOverPack>
          </div>
        </div>
      </Page2Wrapper>
    );
  }
}
export default Page2;
