import React from 'react';
import { shallow } from 'enzyme';

import { mapDispatchToProps, WikiView } from '../index';

describe('<WikiView />', () => {
  it('should render some routes', () => {
    const props = {
      dispatch: () => {},
    };
    const renderedComponent = shallow(
      <WikiView {...props} />
    );
    expect(renderedComponent.find('div').length).toEqual(1);
  });
});


describe('Map Dispatch To Props', () => {
  it('should call dispatch function', () => {
    const dispatchSpy = jest.fn();
    const { dispatch } = mapDispatchToProps(dispatchSpy);
    dispatch();
    expect(dispatchSpy).toHaveBeenCalled();
  });
});
