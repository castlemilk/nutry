import { Map, fromJS } from 'immutable';
import {
  nutrients,
  ageGroupSelected,
  portionSelected } from 'fixtures/foodprofile';
import {
  updateRDI,
  getOmega3,
  getNutrient,
  defaultNutrient,
  defaultPortions,
  Nutrient,
  Portion,
} from '../nutrientMap';


describe('nutrientMap ', () => {
  describe('defaultNutrient', () => {
    it('produces the expected default nutrient', () => {
      expect(defaultNutrient('CHOCDF')).toEqual(Map({
        name: 'Carbohydrate, by difference',
        units: 'g',
        value: '~',
      }));
    });
  });
  describe('defaultPortions', () => {
    it('produces the expected default portion on empty', () => {
      expect(defaultPortions()).toMatchSnapshot();
    });
    it('produces the expected default portion with pre-list with tsp', () => {
      expect(defaultPortions([
        new Portion('tsp', 'tsp', 2),
      ])).toMatchSnapshot();
    });
    it('produces the expected default portion with pre-list non tsp', () => {
      expect(defaultPortions([
        new Portion('1 cup', 'cup', 250),
      ])).toMatchSnapshot();
    });
  });
  describe('getNutrient', () => {
    it('a specifc nutrient with all inputs', () => {
      expect(getNutrient(
        'CHOCDF',
        fromJS(nutrients),
        Map(ageGroupSelected),
        portionSelected)).toMatchSnapshot();
    });
    it('a specifc nutrient with no portions', () => {
      expect(getNutrient(
        'CHOCDF',
        fromJS(nutrients),
        Map(ageGroupSelected),
        undefined)).toMatchSnapshot();
    });
    it('a specifc nutrient with no ageGroup', () => {
      expect(getNutrient(
        'CHOCDF',
        fromJS(nutrients),
        undefined,
        undefined)).toMatchSnapshot();
    });
    it('returns defaultNutrient with no nutrients specified', () => {
      expect(getNutrient(
        'CHOCDF',
        undefined,
        undefined,
        undefined)).toMatchSnapshot();
    });
    it('returns defaultNutrient when cannot find nutrient for given prefix', () => {
      expect(getNutrient(
        'LOL',
        fromJS(nutrients),
        Map(ageGroupSelected),
        portionSelected)).toMatchSnapshot();
    });
    it('returns defaultNutrient when cannot find nutrient for given prefix', () => {
      const nutrientsOdd = {
        CHOCDF: { selected: false },
        CHOLE: { name: 'Cholesterol', units: 'mg', value: 0, selected: false },
      };
      expect(getNutrient(
        'CHOCDF',
        fromJS(nutrientsOdd),
        Map(ageGroupSelected),
        portionSelected)).toMatchSnapshot();
    });
  });
  describe('Nutrient', () => {
    it('returns expected Nutrient', () => {
      const result = Nutrient('CHOCDF',
      'Carbohydrate, by difference',
      'g',
      10,
      'AM19');
      expect(result).toMatchSnapshot();
    });
  });
  describe('Portion', () => {
    it('produces the expected Portion', () => {
      const result = new Portion('100g', 1, 100, 'AM19');
      expect(result).toMatchSnapshot();
    });
    it('produces the expected Portion on no name', () => {
      const result = new Portion(undefined, undefined, undefined);
      expect(result).toMatchSnapshot();
    });
  });
  describe('getOmega3', () => {
    it('produces the expected omega3 output combination', () => {
      const result = getOmega3(nutrients);
      expect(result).toMatchSnapshot();
    });
    it('produces the expected omega3 output no nutrients', () => {
      const nutrientsEmpty = {

      };
      const result = getOmega3(nutrientsEmpty);
      expect(result).toMatchSnapshot();
    });
  });
  describe('updateRDI', () => {
    it('updates nutrient maps RDI values', () => {
      const ageGroup = Map(ageGroupSelected);
      expect(updateRDI(fromJS(nutrients), ageGroup)).toMatchSnapshot();
    });
  });
  describe('defaultNutrient', () => {
    it('produces the expected default nutrient', () => {
    });
  });
  describe('defaultNutrient', () => {
    it('produces the expected default nutrient', () => {
    });
  });
});
