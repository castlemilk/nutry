import React from 'react';
import { fromJS } from 'immutable';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import configureStore from 'configureStore';
import createHistory from 'history/createBrowserHistory';
import { INITIAL_STATE } from 'containers/FoodProfile/constants';
import NutrientRowView, { mapDispatchToProps } from '../index';

describe('<NutrientRowView />', () => {
  it('should render wrapper', () => {
    const initialState = fromJS({
      foodProfile: INITIAL_STATE,
    });
    const props = {
      id: 'uuid',
      type: 'parent_row',
      prefix: 'CHOCDF',
    };
    // TODO: work out how to correctly test a connected component in this scenario
    const history = createHistory();
    const store = configureStore(initialState, history);
    const renderedComponent = mount(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <NutrientRowView {...props} />
        </ConnectedRouter>
      </Provider>
    );
    expect(renderedComponent.find('NutrientRow').length).toEqual(1);
  });
});


describe('Map Dispatch To Props', () => {
  it('should call onClick action', () => {
    // const onLoadProfileSpy = sinon.spy();
    const onClickSpy = jest.fn();
    const { onClick } = mapDispatchToProps(onClickSpy);
    onClick('CHOCDF', 'uuid');
    expect(onClickSpy).toHaveBeenCalled();
  });
  it('should call onHover action', () => {
    // const onLoadProfileSpy = sinon.spy();
    const onHoverSpy = jest.fn();
    const { onHover } = mapDispatchToProps(onHoverSpy);
    onHover('CHOCDF', 'uuid');
    expect(onHoverSpy).toHaveBeenCalled();
  });
  it('should call push action (router)', () => {
    // const onLoadProfileSpy = sinon.spy();
    const onInfoClickSpy = jest.fn();
    const { onInfoClick } = mapDispatchToProps(onInfoClickSpy);
    onInfoClick('CHOCDF');
    expect(onInfoClickSpy).toHaveBeenCalled();
  });
});
