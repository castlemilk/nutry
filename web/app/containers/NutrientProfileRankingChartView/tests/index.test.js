// import React from 'react';

import { mapDispatchToProps } from '../index';

describe('Map Dispatch To Props', () => {
  it('should call loadRankings action', () => {
    // const onLoadProfileSpy = sinon.spy();
    const onLoadRankingsSpy = jest.fn();
    const { onLoadRankings } = mapDispatchToProps(onLoadRankingsSpy);
    onLoadRankings();
    expect(onLoadRankingsSpy).toHaveBeenCalled();
  });
  it('should call push action', () => {
    // const onLoadProfileSpy = sinon.spy();
    const onLoadNewProfileSpy = jest.fn();
    const { onLoadNewProfile } = mapDispatchToProps(onLoadNewProfileSpy);
    onLoadNewProfile('22222');
    expect(onLoadNewProfileSpy).toHaveBeenCalled();
  });
});
