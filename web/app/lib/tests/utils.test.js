import {
  truncateTo,
  scale,
  scaledValue,
  arrayToObject,
  generateColor,
  convertToRGB,
  trim,
  hex,
  convertToHex,
  getXPosition,
  getYPosition,
  getIndexLargestValue,
  nutrientToIndex } from '../utils';

describe('utils ', () => {
  describe('getXPosition', () => {
    it('produces expected result', () => {
      expect(getXPosition(1, 2)).toEqual(Math.cos(2 * 15) * 1);
    });
  });
  describe('getYPosition', () => {
    it('produces expected result', () => {
      expect(getYPosition(1, 2)).toEqual(Math.sin(2 * 15) * 1);
    });
  });
  describe('hex', () => {
    it('no char input', () => {
      expect(hex('aaaa')).toEqual('00');
    });
    it('i === 0', () => {
      expect(hex(0)).toEqual('00');
    });
    it('valid number', () => {
      expect(hex(222)).toEqual('de');
    });
  });
  describe('convertToHex', () => {
    it('valid input', () => {
      expect(convertToHex([111, 111, 111])).toEqual('6f6f6f');
    });
  });
  describe('trim', () => {
    it('has hash and is valid input', () => {
      expect(trim('#fff')).toEqual('fff');
    });
    it('has no hash', () => {
      expect(trim('fff')).toEqual('fff');
    });
  });
  describe('convertToRGB', () => {
    it('valid hex input', () => {
      expect(convertToRGB('#6f6f6f')).toEqual([111, 111, 111]);
    });
  });
  describe('generateColor', () => {
    it('valid hex input', () => {
      expect(generateColor('#A75FFF', '#5A338A', 2)).toEqual(['#8049c4', '#a75fff']);
    });
  });
  describe('arrayToObject', () => {
    it('converts valid input', () => {
      expect(arrayToObject([{ id: 'lol1' }, { id: 'lol2' }])).toEqual({ lol1: { id: 'lol1' }, lol2: { id: 'lol2' } });
    });
  });
  describe('scaledValue', () => {
    it('float truncate', () => {
      expect(scaledValue(10.222)).toEqual(10.22);
    });
    it('scales value', () => {
      expect(scaledValue(10, 50)).toEqual(5);
    });
    it('invalid input', () => {
      expect(scaledValue(null, 50)).toEqual(0);
    });
  });
  describe('scale', () => {
    it('scales with integer input', () => {
      expect(scale(10)).toEqual(0.1);
    });
    it('scales with integer input', () => {
      expect(scale(10)).toEqual(0.1);
    });
    it('scales with float input', () => {
      expect(scale(11.20)).toEqual(0.112);
    });
    it('returns 1 on invalid input', () => {
      expect(scale('lol')).toEqual(1);
    });
  });
  describe('truncateTo', () => {
    it('manages standarded input', () => {
      expect(truncateTo(10.111, 2)).toEqual(10.11);
    });
    it('non decimal input', () => {
      expect(truncateTo(10)).toEqual(10);
    });
  });
  describe('getIndexLargestValue', () => {
    it('can sort correctly', () => {
      const data = [
      { prefix: 'CHOCDF', name: 'Carbohydrate, by difference', units: 'g', value: 63.94, rdi: 317.6470588235294 },
      { prefix: 'SUGAR', name: 'Sugar Total', units: 'g', value: 1.71, rdi: 31.764705882352942 },
      { prefix: 'FIBTG', name: 'Dietary Fibre', units: 'g', value: 37, rdi: 30 },
      { prefix: 'PROCNT', name: 'Protein', units: 'g', value: 9.11, rdi: 64 },
      { prefix: 'FAT', name: 'Total lipid (fat)', units: 'g', value: 7.43, rdi: 50 },
      { prefix: 'WATER', name: 'Water', units: 'g', value: 7.79, rdi: 3400 },
      ];
      expect(getIndexLargestValue(data)).toEqual(0);
    });
    it('handles empty values in array', () => {
      const data = [
      { prefix: 'CHOCDF', name: 'Carbohydrate, by difference', units: 'g', value: '~', rdi: 317.6470588235294 },
      { prefix: 'SUGAR', name: 'Sugar Total', units: 'g', value: '~', rdi: 31.764705882352942 },
      { prefix: 'FIBTG', name: 'Dietary Fibre', units: 'g', value: '~', rdi: 30 },
      { prefix: 'PROCNT', name: 'Protein', units: 'g', value: '~', rdi: 64 },
      { prefix: 'FAT', name: 'Total lipid (fat)', units: 'g', value: '~', rdi: 50 },
      { prefix: 'WATER', name: 'Water', units: 'g', value: '~', rdi: 3400 },
      ];
      expect(getIndexLargestValue(data)).toEqual(-1);
    });
    it('handles empty data set', () => {
      const data = null;
      expect(getIndexLargestValue(data)).toEqual(-1);
    });
  });
  describe('nutrientToIndex', () => {
    it('can get nutrient from prefix when exists', () => {
      const data = [
      { prefix: 'CHOCDF', name: 'Carbohydrate, by difference', units: 'g', value: 63.94, rdi: 317.6470588235294 },
      { prefix: 'SUGAR', name: 'Sugar Total', units: 'g', value: 1.71, rdi: 31.764705882352942 },
      { prefix: 'FIBTG', name: 'Dietary Fibre', units: 'g', value: 37, rdi: 30 },
      { prefix: 'PROCNT', name: 'Protein', units: 'g', value: 9.11, rdi: 64 },
      { prefix: 'FAT', name: 'Total lipid (fat)', units: 'g', value: 7.43, rdi: 50 },
      { prefix: 'WATER', name: 'Water', units: 'g', value: 7.79, rdi: 3400 },
      ];
      expect(nutrientToIndex(data, 'CHOCDF')).toEqual(0);
    });
    it('expected result when doesnt exist', () => {
      const data = [
      { prefix: 'CHOCDF', name: 'Carbohydrate, by difference', units: 'g', value: 63.94, rdi: 317.6470588235294 },
      { prefix: 'SUGAR', name: 'Sugar Total', units: 'g', value: 1.71, rdi: 31.764705882352942 },
      { prefix: 'FIBTG', name: 'Dietary Fibre', units: 'g', value: 37, rdi: 30 },
      { prefix: 'PROCNT', name: 'Protein', units: 'g', value: 9.11, rdi: 64 },
      { prefix: 'FAT', name: 'Total lipid (fat)', units: 'g', value: 7.43, rdi: 50 },
      { prefix: 'WATER', name: 'Water', units: 'g', value: 7.79, rdi: 3400 },
      ];
      expect(nutrientToIndex(data, 'CHOCOLATE')).toEqual(null);
    });
    it('expected result when prefi exists but value is empty', () => {
      const data = [
      { prefix: 'CHOCDF', name: 'Carbohydrate, by difference', units: 'g', value: '~', rdi: 317.6470588235294 },
      { prefix: 'SUGAR', name: 'Sugar Total', units: 'g', value: '~', rdi: 31.764705882352942 },
      { prefix: 'FIBTG', name: 'Dietary Fibre', units: 'g', value: '~', rdi: 30 },
      { prefix: 'PROCNT', name: 'Protein', units: 'g', value: '~', rdi: 64 },
      { prefix: 'FAT', name: 'Total lipid (fat)', units: 'g', value: '~', rdi: 50 },
      { prefix: 'WATER', name: 'Water', units: 'g', value: '~', rdi: 3400 },
      ];
      expect(nutrientToIndex(data, 'CHOCOLATE')).toEqual(null);
    });
    it('expected result when prefi exists but value is not as expected', () => {
      const data = [
      { prefix: 'CHOCDF', name: 'Carbohydrate, by difference', units: 'g', value: 'lol', rdi: 317.6470588235294 },
      ];
      expect(nutrientToIndex(data, 'CHOCDF')).toEqual(null);
    });
    it('expected result when prefi exists but value is empty', () => {
      const data = null;
      expect(nutrientToIndex(data, null)).toEqual(null);
    });
  });
});
