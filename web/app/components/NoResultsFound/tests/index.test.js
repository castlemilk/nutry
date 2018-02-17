import React from 'react';
import { shallow } from 'enzyme';

import NoResultsFound from '../index';
import NoResultsFoundWrapper from '../NoResultsFoundWrapper';

describe('<NoResultsFound />', () => {
  it('display', () => {
    const renderedComponent = shallow(
      <NoResultsFound />
    );
    expect(renderedComponent.find(NoResultsFoundWrapper).length).toEqual(1);
  });
});
