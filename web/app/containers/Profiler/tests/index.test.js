import React from 'react';
import { shallow, mount } from 'enzyme';
import { List } from 'immutable';
import { Slider } from 'antd';
import Select from 'react-select';
import { getProfilerParsedSuccess } from 'mocks/getElasticsearchQueryMock';
import { nutrient } from 'fixtures/profiler';
import ProfilerAddElement from 'components/ProfilerAddElement';
import ProfilerDeleteElement from 'components/ProfilerDeleteElement';
import ProfilerElement from 'components/ProfilerElement';
import NoResultsFound from 'components/NoResultsFound';
import ResultsList from 'components/ResultsList';
import { Profiler, mapDispatchToProps } from '../index';
import ProfilerWrapper from '../ProfilerWrapper';


describe('<Profiler />', () => {
  it('should render container when loading', () => {
    const props = {
      elements: [],
      searchResults: List([]),
      searchString: '',
      searchLoading: true,
      profilerLoading: true,
      onProfileSelected: () => {},
      onChangeSearch: () => {},
      onAddElement: () => {},
      onUpdateElement: () => {},
      onDeleteElement: () => {},
    };
    const renderedComponent = shallow(
      <Profiler {...props} />,
    );
    expect(renderedComponent.find(ProfilerWrapper).length).toEqual(1);
  });
  it('should render no results found when results empty and finished loading', () => {
    const props = {
      elements: [],
      searchResults: Object(),
      searchString: 'blabla',
      searchLoading: false,
      profilerLoading: false,
      onProfileSelected: () => {},
      onChangeSearch: () => {},
      onAddElement: () => {},
      onUpdateElement: () => {},
      onDeleteElement: () => {},
    };
    const renderedComponent = shallow(
      <Profiler {...props} />,
    );
    expect(renderedComponent.find(NoResultsFound).length).toEqual(1);
  });
  it('should render results list when results found', () => {
    const props = {
      elements: [],
      searchResults: getProfilerParsedSuccess,
      searchString: 'blabla',
      searchLoading: false,
      profilerLoading: false,
      onProfileSelected: () => {},
      onChangeSearch: () => {},
      onAddElement: () => {},
      onUpdateElement: () => {},
      onDeleteElement: () => {},
    };
    const renderedComponent = shallow(
      <Profiler {...props} />,
    );
    expect(renderedComponent.find(ResultsList).length).toEqual(1);
  });
  it('should handle results list item clicked', () => {
    const onProfileSelectedSpy = jest.fn();
    const props = {
      elements: [],
      searchResults: getProfilerParsedSuccess,
      searchString: 'blabla',
      searchLoading: false,
      profilerLoading: false,
      onProfileSelected: onProfileSelectedSpy,
      onChangeSearch: () => {},
      onAddElement: () => {},
      onUpdateElement: () => {},
      onDeleteElement: () => {},
    };
    const renderedComponent = shallow(
      <Profiler {...props} />,
    );
    const resultsList = renderedComponent.find(ResultsList);
    expect(resultsList.length).toEqual(1);
    resultsList.prop('onProfileSelected')({});
    expect(onProfileSelectedSpy).toHaveBeenCalled();
  });
  it('should call add to add item when add item is clicked', () => {
    const onAddElementSpy = jest.fn();
    const props = {
      elements: [],
      searchResults: getProfilerParsedSuccess,
      searchString: 'blabla',
      searchLoading: false,
      profilerLoading: false,
      onProfileSelected: () => {},
      onChangeSearch: () => {},
      onAddElement: onAddElementSpy,
      onUpdateElement: () => {},
      onDeleteElement: () => {},
    };
    const renderedComponent = mount(
      <Profiler {...props} />,
    );
    expect(renderedComponent.find(ResultsList).length).toEqual(1);
    const addButton = renderedComponent.find(ProfilerAddElement).find('button');
    addButton.simulate('click');
    expect(onAddElementSpy).toHaveBeenCalled();
  });
  it('should response to profilerElement slider change', () => {
    const onUpdateElementSpy = jest.fn();
    const onChangeSearchSpy = jest.fn();
    const props = {
      elements: [{
        id: 'uuid',
        nutrient,
        scale: 50,
      }],
      searchResults: getProfilerParsedSuccess,
      searchString: 'blabla',
      searchLoading: false,
      profilerLoading: false,
      onProfileSelected: () => {},
      onChangeSearch: onChangeSearchSpy,
      onAddElement: () => {},
      onUpdateElement: onUpdateElementSpy,
      onDeleteElement: () => {},
    };
    const renderedComponent = mount(
      <Profiler {...props} />,
    );
    const element = renderedComponent.find(ProfilerElement);
    expect(element.length).toEqual(1);
    // console.log(renderedComponent.debug());
    renderedComponent.find(Slider).prop('onChange')(20, 'uuid');
    expect(onUpdateElementSpy).toHaveBeenCalled();
    expect(onChangeSearchSpy).toHaveBeenCalled();
  });
  it('should response to profilerElement nutrient change', () => {
    const onUpdateElementSpy = jest.fn();
    const onChangeSearchSpy = jest.fn();
    const props = {
      elements: [{
        id: 'uuid',
        nutrient,
        scale: 50,
      }],
      searchResults: getProfilerParsedSuccess,
      searchString: 'blabla',
      searchLoading: false,
      profilerLoading: false,
      onProfileSelected: () => {},
      onChangeSearch: onChangeSearchSpy,
      onAddElement: () => {},
      onUpdateElement: onUpdateElementSpy,
      onDeleteElement: () => {},
    };
    const renderedComponent = mount(
      <Profiler {...props} />,
    );
    const element = renderedComponent.find(ProfilerElement);
    expect(element.length).toEqual(1);
    // console.log(renderedComponent.debug());
    renderedComponent.find(Select).prop('onChange')({ target: { value: '' } });
    expect(onUpdateElementSpy).toHaveBeenCalled();
    expect(onChangeSearchSpy).toHaveBeenCalled();
  });
  it('should response to removal of element', () => {
    const onDeleteElementSpy = jest.fn();
    const onChangeSearchSpy = jest.fn();
    const props = {
      elements: [{
        id: 'uuid',
        nutrient,
        scale: 50,
      }],
      searchResults: getProfilerParsedSuccess,
      searchString: 'blabla',
      searchLoading: false,
      profilerLoading: false,
      onProfileSelected: () => {},
      onChangeSearch: onChangeSearchSpy,
      onAddElement: () => {},
      onUpdateElement: () => {},
      onDeleteElement: onDeleteElementSpy,
    };
    const renderedComponent = mount(
      <Profiler {...props} />,
    );
    const element = renderedComponent.find(ProfilerElement);
    expect(element.length).toEqual(1);
    // console.log(renderedComponent.debug());
    renderedComponent.find(ProfilerDeleteElement).prop('onClick')('uuid');
    expect(onDeleteElementSpy).toHaveBeenCalled();
    expect(onChangeSearchSpy).toHaveBeenCalled();
  });
});
describe('Map Dispatch To Props', () => {
  it('should call onChangeSearch action', () => {
    const onChangeSearchSpy = jest.fn();
    const { onChangeSearch } = mapDispatchToProps(onChangeSearchSpy);
    onChangeSearch();
    expect(onChangeSearchSpy).toHaveBeenCalled();
  });
  it('should call tabChanged action', () => {
    const onAddElementSpy = jest.fn();
    const { onAddElement } = mapDispatchToProps(onAddElementSpy);
    onAddElement();
    expect(onAddElementSpy).toHaveBeenCalled();
  });
  it('should call portionChanged action', () => {
    const onUpdateElementSpy = jest.fn();
    const { onUpdateElement } = mapDispatchToProps(onUpdateElementSpy);
    onUpdateElement('uuid', 'scale', 50);
    expect(onUpdateElementSpy).toHaveBeenCalled();
  });
  it('should call ageGroupChanged action', () => {
    const onDeleteElementSpy = jest.fn();
    const { onDeleteElement } = mapDispatchToProps(onDeleteElementSpy);
    onDeleteElement('uuid');
    expect(onDeleteElementSpy).toHaveBeenCalled();
  });
});
