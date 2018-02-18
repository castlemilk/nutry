import { getIndexLargestValue, nutrientToIndex } from '../utils';

describe('utils ', () => {
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
  });
});
