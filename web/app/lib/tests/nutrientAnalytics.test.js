import { Map } from 'immutable';
import moxios from 'moxios';
import sinon from 'sinon';
import {
  getFoodProfileMockSuccessFull } from 'mocks/getFoodProfileMock';
import {
  getSearchParsedSuccess,
  getSearchParsedSuccessMulti } from 'mocks/getElasticsearchQueryMock';
import {
  getFilteredData,
  getRankingResults,
} from '../nutrientAnalytics';


describe('nutrientAnalytics ', () => {
  describe('getFilteredData', () => {
    it('selects filtered data', () => {
      const nutrients = Map({
        CHOCDF: Map({
          name: 'Fatty acids, total polyunsaturated',
          units: 'g',
          value: 1.19,
          selected: false }),
        VITA: Map({
          name: 'Retinol Equivalents (VIT A)',
          units: 'ug',
          value: 190,
          selected: false }),
        FOLDFE: Map({
          name: 'Dietary folate equivalents',
          units: 'ug',
          value: 274,
          selected: false }) });
      const nutrientFilter = ['FAPU'];
      const ageGroupSelected = Map({ value: 'AM19', label: 'Adult Male (19-30)', className: 'am-19' });
      expect(getFilteredData(nutrients, nutrientFilter, ageGroupSelected)).toMatchSnapshot();
    });
    it('handles empty data', () => {
      const ageGroupSelected = Map({ value: 'AM19', label: 'Adult Male (19-30)', className: 'am-19' });
      expect(getFilteredData(undefined, undefined, ageGroupSelected)).toEqual([]);
    });
  });
  describe('getRankingResults', () => {
    beforeEach(() => {
      moxios.install();
    });
    afterEach(() => {
      moxios.uninstall();
    });
    it('processes searchResults', (done) => {
      const onFulfilled = sinon.spy();
      moxios.stubRequest(/.*profiles\/02049.json.*/, getFoodProfileMockSuccessFull);
      getRankingResults(getSearchParsedSuccess).then(onFulfilled);
      moxios.wait(() => {
        expect(onFulfilled.getCall(0).args[0].toJS()).toMatchSnapshot();
        done();
      });
    });
    it('processes searchResults when multiple results', (done) => {
      const onFulfilled = sinon.spy();
      moxios.stubRequest(/.*profiles\/02049.json.*/, getFoodProfileMockSuccessFull);
      moxios.stubRequest(/.*profiles\/11111.json.*/, getFoodProfileMockSuccessFull);
      getRankingResults(getSearchParsedSuccessMulti).then(onFulfilled);
      moxios.wait(() => {
        expect(onFulfilled.getCall(0).args[0].toJS()).toMatchSnapshot();
        done();
      });
    });
    it('processes empty searchResults', (done) => {
      // moxios.stubRequest(/.*profiles\/02049.json.*/, {});
      expect(getRankingResults({})).toEqual([]);
      done();
    });
  });
});
