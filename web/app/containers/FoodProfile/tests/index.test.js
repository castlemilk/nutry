import React from 'react';
import { shallow } from 'enzyme';

// import { INITIAL_STATE } from '../constants';
import { profileInfo, portionSelected, ageGroupSelected } from 'fixtures/foodprofile';
import NutrientDisplay from 'components/NutrientDisplay';
import FoodProfileToolBar from 'components/FoodProfileToolBar';
import { AGES } from 'components/FoodProfileToolBar/constants';
import { FoodProfile, mapDispatchToProps } from '../index';
import FoodProfileWrapper from '../FoodProfileWrapper';

describe('<FoodProfile />', () => {
  it('should render container when loading', () => {
    const match = {
      path: '/foodprofile/:profileId',
      url: '/foodprofile/02049',
      isExact: true,
      params: { profileId: '02049' },
    };
    const props = {
      match,
      loading: true,
      profileHeader: profileInfo,
      onLoadProfile: () => {},
      onLoadNewProfile: () => {},
      onTabChange: () => {},
      onPortionChanged: () => {},
      onAgeGroupChanged: () => {},
    };
    const renderedComponent = shallow(
      <FoodProfile {...props} />,
    );
    expect(renderedComponent.find(FoodProfileWrapper).length).toEqual(1);
    expect(renderedComponent).toMatchSnapshot();
  });
  it('should render container when loading', () => {
    const match = {
      path: '/foodprofile/:profileId',
      url: '/foodprofile/02049',
      isExact: true,
      params: { profileId: '02049' },
    };
    const props = {
      match,
      loading: true,
      profileHeader: profileInfo,
      onLoadProfile: () => {},
      onLoadNewProfile: () => {},
      onTabChange: () => {},
      onPortionChanged: () => {},
      onAgeGroupChanged: () => {},
    };
    const renderedComponent = shallow(
      <FoodProfile {...props} />,
    );
    expect(renderedComponent.find(FoodProfileWrapper).length).toEqual(1);
    expect(renderedComponent).toMatchSnapshot();
  });
  it('should render container using routing information', () => {
    const match = {
      path: '/foodprofile/:profileId',
      url: '/foodprofile/02049',
      isExact: true,
      params: { profileId: '02049' },
    };
    const props = {
      match,
      portions: [],
      portionSelected,
      ageGroupSelected,
      loading: true,
      profileHeader: profileInfo,
      onLoadProfile: () => {},
      onLoadNewProfile: () => {},
      onTabChange: () => {},
      onPortionChanged: () => {},
      onAgeGroupChanged: () => {},
    };
    const renderedComponent = shallow(
      <FoodProfile {...props} />,
    );
    expect(renderedComponent.find(FoodProfileWrapper).length).toEqual(1);
    expect(renderedComponent).toMatchSnapshot();
  });
  it('should render container finished loading', () => {
    const props = {
      loading: false,
      portions: [],
      portionSelected,
      ageGroupSelected,
      profileHeader: profileInfo,
      onLoadProfile: () => {},
      onLoadNewProfile: () => {},
      onTabChange: () => {},
      onPortionChanged: () => {},
      onAgeGroupChanged: () => {},
    };
    const renderedComponent = shallow(
      <FoodProfile {...props} />,
    );
    expect(renderedComponent.find(FoodProfileWrapper).length).toEqual(1);
    expect(renderedComponent).toMatchSnapshot();
  });
  it('should respond to tab change', () => {
    const onTabChangeSpy = jest.fn();
    const props = {
      loading: false,
      profileHeader: profileInfo,
      onLoadProfile: () => {},
      onLoadNewProfile: () => {},
      onTabChange: onTabChangeSpy,
      onPortionChanged: () => {},
      onAgeGroupChanged: () => {},
    };
    const renderedComponent = shallow(
      <FoodProfile {...props} />,
    );
    const nutrientPanel = renderedComponent.find(NutrientDisplay).dive();
    // console.log(nutrientPanel.debug());
    nutrientPanel.find('Tabs').simulate('change', 1);
    expect(onTabChangeSpy).toHaveBeenCalled();
  });
  it('should trigger loadProfile', () => {
    const onLoadProfileSpy = jest.fn();
    const props = {
      loading: true,
      profileHeader: profileInfo,
      onLoadProfile: onLoadProfileSpy,
      onLoadNewProfile: () => {},
      onTabChange: () => {},
      onPortionChanged: () => {},
      onAgeGroupChanged: () => {},
    };
    const renderedComponent = shallow(
      <FoodProfile {...props} />,
    );
    expect(renderedComponent.find(FoodProfileWrapper).length).toEqual(1);
    expect(onLoadProfileSpy).toHaveBeenCalled();
  });
  it('should trigger loadProfile componentDidUpdate when loading is true and using match', () => {
    const onLoadProfileSpy = jest.fn();
    const match = {
      path: '/foodprofile/:profileId',
      url: '/foodprofile/02049',
      isExact: true,
      params: { profileId: '02049' },
    };
    const props = {
      match,
      loading: false,
      profileHeader: profileInfo,
      onLoadProfile: onLoadProfileSpy,
      onLoadNewProfile: () => {},
      onTabChange: () => {},
      onPortionChanged: () => {},
      onAgeGroupChanged: () => {},
    };
    const renderedComponent = shallow(
      <FoodProfile {...props} />,
    );
    renderedComponent.setProps({ loading: true });
    expect(onLoadProfileSpy).toHaveBeenCalled();
  });
  it('should trigger loadProfile componentDidUpdate when loading is true using SN', () => {
    const onLoadProfileSpy = jest.fn();
    const props = {
      loading: false,
      profileHeader: profileInfo,
      onLoadProfile: onLoadProfileSpy,
      onLoadNewProfile: () => {},
      onTabChange: () => {},
      onPortionChanged: () => {},
      onAgeGroupChanged: () => {},
    };
    const renderedComponent = shallow(
      <FoodProfile {...props} />,
    );
    renderedComponent.setProps({ loading: true });
    expect(onLoadProfileSpy).toHaveBeenCalled();
  });
  it('shouldnt trigger loadProfile componentDidUpdate when loading is false', () => {
    const onLoadProfileSpy = jest.fn();
    const props = {
      loading: false,
      profileHeader: profileInfo,
      onLoadProfile: onLoadProfileSpy,
      onLoadNewProfile: () => {},
      onTabChange: () => {},
      onPortionChanged: () => {},
      onAgeGroupChanged: () => {},
    };
    const renderedComponent = shallow(
      <FoodProfile {...props} />,
    );
    renderedComponent.setProps({ loading: false });
    expect(onLoadProfileSpy).not.toHaveBeenCalled();
  });
  it('should respond to portion change', () => {
    const onPortionChangedSpy = jest.fn();
    const props = {
      loading: false,
      profileHeader: profileInfo,
      onLoadProfile: () => {},
      onLoadNewProfile: () => {},
      onTabChange: () => {},
      onPortionChanged: onPortionChangedSpy,
      onAgeGroupChanged: () => {},
    };
    const renderedComponent = shallow(
      <FoodProfile {...props} />,
    );
    const toolbar = renderedComponent.find(FoodProfileToolBar).dive();
    toolbar.find('Select').last().simulate('change', { target: { value: '100g' } });
    expect(onPortionChangedSpy).toHaveBeenCalled();
  });
  it('should respond to ageGroup change', () => {
    const onAgeGroupChangedSpy = jest.fn();
    const props = {
      loading: false,
      profileHeader: profileInfo,
      onLoadProfile: () => {},
      onLoadNewProfile: () => {},
      onTabChange: () => {},
      onPortionChanged: () => {},
      onAgeGroupChanged: onAgeGroupChangedSpy,
    };
    const renderedComponent = shallow(
      <FoodProfile {...props} />,
    );
    const toolbar = renderedComponent.find(FoodProfileToolBar).dive();
    // console.log(toolbar.debug());
    toolbar.find('Select').first().simulate('change', { target: { value: AGES[0].value } });
    expect(onAgeGroupChangedSpy).toHaveBeenCalled();
  });
});
describe('Map Dispatch To Props', () => {
  it('should call loadProfile action', () => {
    // const onLoadProfileSpy = sinon.spy();
    const onLoadProfileSpy = jest.fn();
    const { onLoadProfile } = mapDispatchToProps(onLoadProfileSpy);
    onLoadProfile();
    expect(onLoadProfileSpy).toHaveBeenCalled();
  });
  it('should call tabChanged action', () => {
    // const onLoadProfileSpy = sinon.spy();
    const onTabChangedSpy = jest.fn();
    const { onTabChange } = mapDispatchToProps(onTabChangedSpy);
    onTabChange(1);
    expect(onTabChangedSpy).toHaveBeenCalled();
  });
  it('should call portionChanged action', () => {
    // const onLoadProfileSpy = sinon.spy();
    const onPortionChangedSpy = jest.fn();
    const { onPortionChanged } = mapDispatchToProps(onPortionChangedSpy);
    onPortionChanged(portionSelected);
    expect(onPortionChangedSpy).toHaveBeenCalled();
  });
  it('should call ageGroupChanged action', () => {
    // const onLoadProfileSpy = sinon.spy();
    const onAgeGroupChangedSpy = jest.fn();
    const { onAgeGroupChanged } = mapDispatchToProps(onAgeGroupChangedSpy);
    onAgeGroupChanged(ageGroupSelected);
    expect(onAgeGroupChangedSpy).toHaveBeenCalled();
  });
});
