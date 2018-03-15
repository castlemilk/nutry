/**
 * Test store addons
 */

import { firebaseConfig, elasticsearchConfig } from 'config';

describe('firebaseConfig', () => {
  it('should contain an object with firebase related configuration', () => {
    expect(typeof firebaseConfig).toBe('object');
  });
});
describe('elasticsearchConfig', () => {
  it('should contain an object with elasticsearch related configuration', () => {
    expect(typeof elasticsearchConfig).toBe('object');
  });
});
