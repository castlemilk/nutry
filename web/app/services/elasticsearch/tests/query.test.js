import {
  searchQuery,
  profilerSearchQuery,
  profilerFunctionQuery,
  profilerDecayFunctionQuery,
  matchField } from '../queries';
import {
  searchQueryMock,
  profilerQueryMock,
  profilerFunctionQueryMock,
  profilerDecayFunctionQueryMock,
  matchFieldMock,
} from '../../../mocks/getElasticsearchQueryMock';


describe('elasticsearch query functions', () => {
  it('searchQuery', (done) => {
    expect(searchQuery('chocolate')).toMatchObject(searchQueryMock);
    done();
  });
  it('profilerQuery', (done) => {
    expect(profilerSearchQuery('chocolate')).toMatchObject(profilerQueryMock);
    done();
  });
  it('profilerFunctionQuery', (done) => {
    expect(profilerFunctionQuery('CHOCDF', 10)).toMatchObject(profilerFunctionQueryMock);
    done();
  });
  it('profilerDecayFunctionQuery', (done) => {
    expect(profilerDecayFunctionQuery('CHOCDF', 10)).toMatchObject(profilerDecayFunctionQueryMock);
    done();
  });
  it('matchField', (done) => {
    expect(matchField('02049')).toMatchObject(matchFieldMock);
    done();
  });
});
