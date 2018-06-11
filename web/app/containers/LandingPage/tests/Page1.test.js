import React from 'react';
import { shallow } from 'enzyme';
// import { IntlProvider } from 'react-intl';
// import { TweenOneGroup } from 'rc-tween-one';

import Page1, {
  getTransformXY,
  svgToXY } from '../Page1';
import Page1Wrapper from '../Page1Wrapper';

describe('<Page1 />', () => {
  it('should render wrapper', () => {
    const renderedComponent = shallow(
      <Page1 />
    );
    expect(renderedComponent.find(Page1Wrapper).length).toEqual(1);
  });
  it('getTransformXY', () => {
    const result = getTransformXY('translateY(-20px)');
    expect(result).toMatchSnapshot();
  });
  it('svgToXY', () => {
    const data = [{
      img: '',
      name: '',
      to: '/',
      svgBg: (
        <svg width="213px" height="303px" viewBox="0 0 213 303" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <circle id="Oval-12-Copy-6" fill="#6b34a2" opacity="0.45" cx="60" cy="157" r="25" />
          <circle id="Oval-12-Copy" fill="#643296" opacity="0.35" cx="167.5" cy="65.5" r="11.5" />
          <rect id="Rectangle-14" stroke="#643296" opacity="0.7" x="0.5" y="54.5" width="14" height="14" rx="1" />
          <circle id="Path" fill="#643296" opacity="0.5" cx="195.5" cy="117.5" r="3.5" />
          <circle id="Path" fill="#643296" opacity="0.5" cx="117" cy="2" r="2" />
          <circle id="Path" fill="#643296" opacity="0.6" cx="82" cy="36" r="2" />
          <circle id="Path" fill="#643296" opacity="0.6" cx="26.5" cy="102.5" r="1.5" />
          <circle id="Oval-8" stroke="#643296" opacity="0.65" cx="180.5" cy="8.5" r="4.5" />
          <g id="Group-18" transform="translate(197.000000, 157.000000)" opacity="0.7" stroke="#643296">
            <path d="M10.7320508,3 L15.0621778,10.5 C15.6144626,11.4565852 15.2867123,12.6797661 14.330127,13.2320508 C14.0260886,13.4075875 13.6812003,13.5 13.330127,13.5 L4.66987298,13.5 C3.56530348,13.5 2.66987298,12.6045695 2.66987298,11.5 C2.66987298,11.1489267 2.76228551,10.8040384 2.93782217,10.5 L7.26794919,3 C7.82023394,2.04341475 9.04341475,1.71566444 10,2.26794919 C10.3040384,2.44348586 10.5565141,2.69596158 10.7320508,3 Z" id="Polygon-2" />
          </g>
          <g id="Group-17" transform="translate(124.000000, 284.000000)" opacity="0.65" stroke="#643296">
            <path d="M13.7320508,6 L18.0621778,13.5 C18.6144626,14.4565852 18.2867123,15.6797661 17.330127,16.2320508 C17.0260886,16.4075875 16.6812003,16.5 16.330127,16.5 L7.66987298,16.5 C6.56530348,16.5 5.66987298,15.6045695 5.66987298,14.5 C5.66987298,14.1489267 5.76228551,13.8040384 5.93782217,13.5 L10.2679492,6 C10.8202339,5.04341475 12.0434148,4.71566444 13,5.26794919 C13.3040384,5.44348586 13.5565141,5.69596158 13.7320508,6 Z" id="Polygon-2" transform="translate(12.000000, 11.140576) rotate(25.000000) translate(-12.000000, -11.140576) " />
          </g>
        </svg>
        ),
    }];
    const result = svgToXY(data);
    expect(result).toMatchSnapshot();
  });
  it('onEnter 1', () => {
    const renderedComponent = shallow(
      <Page1 />
    );
    const tweenOne = renderedComponent.find('.page1-point-wrapper').last();
    tweenOne.prop('enter')({ key: '1', index: 1 });
  });
  it('onEnter 2', () => {
    const renderedComponent = shallow(
      <Page1 />
    );
    const tweenOne = renderedComponent.find('.page1-point-wrapper').last();
    tweenOne.prop('enter')({ key: '2', index: 2 });
  });
  it('onEnter 3', () => {
    const renderedComponent = shallow(
      <Page1 />
    );
    const tweenOne = renderedComponent.find('.page1-point-wrapper').last();
    tweenOne.prop('enter')({ key: '3', index: 3 });
  });
  it('queueAnim mouseEnter', () => {
    const renderedComponent = shallow(
      <Page1 />
    );
    const queueAnim = renderedComponent.find('.page1-block').last();
    queueAnim.prop('onMouseEnter')();
  });
  it('queueAnim mouseExit', () => {
    const renderedComponent = shallow(
      <Page1 />
    );
    const queueAnim = renderedComponent.find('.page1-block').last();
    queueAnim.prop('onMouseLeave')();
  });
});
