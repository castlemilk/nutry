import React from 'react';
import { shallow } from 'enzyme';
import LoadingContent from 'components/LoadingContent';
import NutrientDisplay from '../index';
import NutrientDisplayWrapper from '../NutrientDisplayWrapper';

describe('<NutrientDisplay />', () => {
  it('displays loading content', () => {
    const props = {
      onTabChange: () => {},
      loading: true,
    };
    const renderedComponent = shallow(
      <NutrientDisplay {...props} />
    );
    expect(renderedComponent.find(NutrientDisplayWrapper).length).toEqual(1);
    expect(renderedComponent.find(LoadingContent).length).toBeGreaterThan(10);
  });
  it('displays view', () => {
    const props = {
      onTabChange: () => {},
      loading: false,
    };
    const renderedComponent = shallow(
      <NutrientDisplay {...props} />
    );
    expect(renderedComponent.find(NutrientDisplayWrapper).length).toEqual(1);
  });
  it('tabs change', () => {
    const onChangeTabSpy = jest.fn();
    const props = {
      onTabChange: onChangeTabSpy,
      loading: false,
    };
    const renderedComponent = shallow(
      <NutrientDisplay {...props} />
    );
    expect(renderedComponent.find('Tab').length).toEqual(2);
    expect(renderedComponent.state('index')).toEqual(0);
    renderedComponent.find('Tabs').simulate('change', 1);
    expect(onChangeTabSpy).toHaveBeenCalled();
    expect(renderedComponent.state('index')).toEqual(1);
  });
});
