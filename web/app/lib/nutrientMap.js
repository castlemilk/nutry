import _ from 'lodash';
import { Map, List } from 'immutable';
/**
 *
 * @param  {[type]} prefix [description]
 * @return {[type]}        [description]
 */
export function defaultNutrient(prefix) {
  return Map({
    name: prefixToName(prefix),
    units: prefixToUnit(prefix),
    value: '~',
  });
}
export function getNutrient(prefix, nutrients, ageGroup, portion = false) {
  // console.log(prefix, nutrients);
  const nutrient = nutrients.get(prefix);
  // console.log('nutrient:');
  // console.log(nutrient);
  if (nutrient) {
    const newNutrient = Nutrient(
      prefix,
      nutrient.get('name') || prefixToName(prefix),
      nutrient.get('units') || prefixToUnit(prefix),
      getScaledValue(nutrient.get('value'), portion) || '~',
      getRDI(prefix, ageGroup)
    );
    console.log(newNutrient);
    return newNutrient;
  }
  return Nutrient(
    prefix,
    prefixToName(prefix),
    prefixToUnit(prefix),
    '~',
    getRDI(prefix, ageGroup)
  );
}
function Nutrient(prefix, name, units, value, rdi = null) {
  return Map({
    prefix,
    name,
    units,
    value,
    rdi,
  });
  // nutrient.set('prefix', prefix);
  // nutrient.set('name', name);
  // nutrient.set('units', units);
  // nutrient.set('value', value);
  // nutrient.set('rdi', rdi);
  // this.prefix = prefix;
  // this.name = name;
  // this.units = units;
  // this.value = value;
  // this.rdi = rdi;
  // console.log('NUTRIENT_FUNCTION:');
  // console.log(nutrient);
  // return nutrient;
}
function Portion(name, amount, value) {
  this.unit = name;
  this.value = value;
  this.className = name ? `${name.replace(/ |_|,|-|/g, '')}` : 'portion-class';
  this.label = name;
  this.amt = amount;
  this.g = value;
}

export function getOmega3(nutrients, portion) {
  let omega3Total = 0;
  if (nutrients.F20D5) {
    omega3Total += nutrients.F20D5.value;
  }
  if (nutrients.F22D6) {
    omega3Total += nutrients.F22D6.value;
  }
  if (nutrients.F18D3CN3) {
    omega3Total += nutrients.F18D3CN3.value;
  }
  return new Nutrient(
    'LCW3TOTAL',
    'Total Omega-3 Fatty Acid',
    'mg',
    omega3Total * scale(portion)
  );
}
export function updateRDI(nutrients, ageGroup) {
  const newNutrients = List(nutrients.map((nutrient) => nutrient.set('rdi', getRDI(nutrient.get('prefix'), ageGroup))));
  return newNutrients;
}
export function getRDI(prefix, ageGroup) {
  return RDImapping[ageGroup.get('value')][prefix];
}
// const RDIEnergyMapping = {
//   I1: {},
// };
const pc = 0.45;
const ps = 0.1;
const gctoe = 17;
const RDImapping = {
  // Infant (0m-6m)
  I1: {
    ENERC: 2200,
    WATER: 700,
    SUGAR: (2200 * pc * ps) / gctoe,
    CHOCDF: (2200 * pc) / gctoe,
    PROCNT: 10,
    FIBTG: 0,
    NA: 120,
    FAT: 50,
  },
  // Infant (7m-12m)
  I2: {
    ENERC: 3100,
    WATER: 800,
    SUGAR: (3100 * pc * ps) / gctoe,
    CHOCDF: (3100 * pc) / gctoe,
    PROCNT: 14,
    FIBTG: 0,
    NA: 170,
    FAT: 50,
  },
  // Children (1-3)
  C1: {
    ENERC: 4300,
    WATER: 1400,
    SUGAR: (4300 * pc * ps) / gctoe,
    CHOCDF: (4300 * pc) / gctoe,
    PROCNT: 14,
    FIBTG: 14,
    NA: 200,
    FAT: 50,
  },
  // Children (4-8)
  C2: {
    ENERC: 7000,
    WATER: 1600,
    SUGAR: (7000 * pc * ps) / gctoe,
    CHOCDF: (7000 * pc) / gctoe,
    PROCNT: 20,
    FIBTG: 18,
    NA: 300,
    FAT: 50,
  },
  // Boys (9-13)
  B1: {
    ENERC: 8300,
    WATER: 2200,
    SUGAR: (8300 * pc * ps) / gctoe,
    CHOCDF: (8300 * pc) / gctoe,
    PROCNT: 40,
    FIBTG: 24,
    NA: 400,
    FAT: 50,
  },
  // Boys (14-16)
  B2: {
    ENERC: 12000,
    WATER: 2700,
    SUGAR: (12000 * pc * ps) / gctoe,
    CHOCDF: (12000 * pc) / gctoe,
    PROCNT: 65,
    FIBTG: 28,
    NA: 460,
    FAT: 50,
  },
  // Girls (9-13)
  G1: {
    ENERC: 8500,
    WATER: 1900,
    SUGAR: (8500 * pc * ps) / gctoe,
    CHOCDF: (8500 * pc) / gctoe,
    PROCNT: 35,
    FIBTG: 20,
    NA: 400,
    FAT: 50,
  },
  // Girls (14-16)
  G2: {
    ENERC: 11500,
    WATER: 2200,
    SUGAR: (11500 * pc * ps) / gctoe,
    CHOCDF: (11500 * pc) / gctoe,
    PROCNT: 45,
    FIBTG: 22,
    NA: 460,
    FAT: 50,
  },
  // Adult Male (19-30)
  AM19: {
    ENERC: 12000,
    WATER: 3400,
    SUGAR: (12000 * pc * ps) / gctoe,
    CHOCDF: (12000 * pc) / gctoe,
    PROCNT: 64,
    FIBTG: 30,
    NA: 460,
    FAT: 50,
  },
  // 'Adult Male (31-50)
  AM31: {
    ENERC: 11900,
    WATER: 3400,
    SUGAR: (11900 * pc * ps) / gctoe,
    CHOCDF: (11900 * pc) / gctoe,
    PROCNT: 64,
    FIBTG: 30,
    NA: 460,
    FAT: 50,
  },
  // Adult Male (51-70)
  AM51: {
    ENERC: 10900,
    WATER: 3400,
    SUGAR: (10900 * pc * ps) / gctoe,
    CHOCDF: (10900 * pc) / gctoe,
    PROCNT: 64,
    FIBTG: 30,
    NA: 460,
    FAT: 50,
  },
  // Adult Male (71-)
  AM71: {
    ENERC: 10000,
    WATER: 3400,
    SUGAR: (10000 * pc * ps) / gctoe,
    CHOCDF: (10000 * pc) / gctoe,
    PROCNT: 81,
    FIBTG: 30,
    NA: 460,
    FAT: 50,
  },
  // Adult Female (19-30)
  AF19: {
    ENERC: 9600,
    WATER: 2800,
    SUGAR: (9600 * pc * ps) / gctoe,
    CHOCDF: (9600 * pc) / gctoe,
    PROCNT: 46,
    FIBTG: 25,
    NA: 460,
    FAT: 50,
  },
  // Adult Female (31-50)
  AF31: {
    ENERC: 9100,
    WATER: 2800,
    SUGAR: (9100 * pc * ps) / gctoe,
    CHOCDF: (9100 * pc) / gctoe,
    PROCNT: 46,
    FIBTG: 25,
    NA: 460,
    FAT: 50,
  },
  // Adult Female (51-70)
  AF51: {
    ENERC: 8700,
    WATER: 2800,
    SUGAR: (8700 * pc * ps) / gctoe,
    CHOCDF: (8700 * pc) / gctoe,
    PROCNT: 46,
    FIBTG: 25,
    NA: 460,
    FAT: 50,
  },
  // Adult Female (71-)
  AF71: {
    ENERC: 8300,
    WATER: 2800,
    SUGAR: (8300 * pc * ps) / gctoe,
    CHOCDF: (8300 * pc) / gctoe,
    PROCNT: 57,
    FIBTG: 25,
    NA: 460,
    FAT: 50,
  },
  // Pregnant (14-18)
  P1: {
    ENERC: 13000,
    WATER: 2400,
    SUGAR: (13000 * pc * ps) / gctoe,
    CHOCDF: (13000 * pc) / gctoe,
    PROCNT: 58,
    FIBTG: 25,
    NA: 460,
    FAT: 50,
  },
  // Pregnant (19-31)
  P2: {
    ENERC: 12000,
    WATER: 3100,
    SUGAR: (12000 * pc * ps) / gctoe,
    CHOCDF: (12000 * pc) / gctoe,
    PROCNT: 60,
    FIBTG: 28,
    NA: 460,
    FAT: 50,
  },
  // Pregnant (31-50)
  P3: {
    ENERC: 11500,
    WATER: 3100,
    SUGAR: (11500 * pc * ps) / gctoe,
    CHOCDF: (11500 * pc) / gctoe,
    PROCNT: 60,
    FIBTG: 28,
    NA: 460,
    FAT: 50,
  },
  // Lactation (14-18)
  L1: {
    ENERC: 11000,
    WATER: 2900,
    SUGAR: (11000 * pc * ps) / gctoe,
    CHOCDF: (11000 * pc) / gctoe,
    PROCNT: 63,
    FIBTG: 27,
    NA: 460,
    FAT: 50,
  },
  // Lactation (19-30)
  L2: {
    ENERC: 10500,
    WATER: 3500,
    SUGAR: (10500 * pc * ps) / gctoe,
    CHOCDF: (10500 * pc) / gctoe,
    PROCNT: 67,
    FIBTG: 30,
    NA: 460,
    FAT: 50,
  },
  // Lactation (31-50)
  L3: {
    ENERC: 10000,
    WATER: 3500,
    SUGAR: (10000 * pc * ps) / gctoe,
    CHOCDF: (10000 * pc) / gctoe,
    PROCNT: 67,
    FIBTG: 30,
    NA: 460,
    FAT: 50,
  },
};


export function defaultPortions(profilePortions = null) {
  let portions = [];

  if (profilePortions) {
    portions = profilePortions.map((portion) => portion.unit.includes('tsp') ?
      new Portion(`${String(portion.amt)} ${portion.unit}`,
        portion.unit,
        portion.g
      ) :
      new Portion(portion.name,
      portion.unit,
      portion.g));
  }
  portions.unshift(new Portion('per 100g', 1, 100));
  return portions;
}

function getScaledValue(value, portion = false) {
  if (!portion) {
    return truncateTo(value, 2);
  } else if (value) {
    return truncateTo(value * scale(portion), 2);
  }

  return '~';
}
// function getScaledNutrient(prefix, nutrient, portion = false) {
//   /**
//    * Will attempt to discover the formatting of the scaling factor and
//    * convert the current value accordingly
//    */
//   // TODO: fix this, returning nutrient isnt compaitible with the getNutrient method
//   if (!portion) {
//     return new Nutrient(prefix, nutrient.name, nutrient.units, nutrient.value);
//   }
//   return new Nutrient(
//     prefix,
//     nutrient.name,
//     nutrient.units,
//     truncateTo(nutrient.value * scale(portion), 1)
//   );
// }

const truncateTo = (unRouned, nrOfDecimals = 2) => {
  const parts = String(unRouned).split('.');

  if (parts.length !== 2) {
    // without any decimal part
    return unRouned;
  }

  const newDecimals = parts[1].slice(0, nrOfDecimals);
  const newString = `${parts[0]}.${newDecimals}`;

  return Number(newString);
};

function scale(portion) {
  /**
   * Attempt to parse combinations of scales/portions and return an numerical
   * value for usage by higher order functions.
   */
  const defaultUnit = 100; // per 100g is the default measurement

  if (_.isInteger(portion)) {
    // portion = 200 (g)
    return _.parseInt(portion) / defaultUnit;
  } else if (isFloat(portion)) {
    // portion = 28.5 (g)
    return parseFloat(portion) / defaultUnit;
  } else if (!isNumeric(portion)) {
    // portion = 1 tsp
  } else {
    return 1;
  }
  return 1;
}
function isFloat(n) {
  return isNumeric(n) && !_.isInteger(n);
}
function isNumeric(n) {
  return !_.isNaN(n) && _.isFinite(n);
}

export function prefixToName(prefix) {
  /**
   * Convert nutrient prefix to full name from a standard hash/dictionary table
   * stored on the client side??
   * TODO: potentially look at this being hotloaded by REST service
   */
  const mapping = {};
  mapping.ENERC = 'Energy';
  mapping.ENERC1 = 'Energy, including dietary fibre';
  mapping.ENERC1 = 'Energy';
  mapping.ENERC_KCAL = 'Energy';
  mapping.WATER = 'Water';
  // Carbohydrates
  mapping.CHOCDF = 'Carbohydrate, by difference';
  mapping.CHOAVL = 'Available carbohydrate';
  mapping.SUGAR = 'Sugar Total';
  mapping.FIBTG = 'Dietary Fibre';
  mapping.SUCS = 'Sucrose';
  mapping.MALS = 'Maltose';
  mapping.GALS = 'Galactose';
  mapping.FRUS = 'Fructose';
  mapping.GLUS = 'Glucose';
  mapping.LACS = 'Lactose';
  mapping.STARCH = 'Starch';
  // common
  mapping.DEXTN = 'Dextrin';
  mapping.GYRL = 'Glycerol';
  mapping.GLYC = 'Glycogen';
  mapping.INULN = 'Inulin';
  mapping.MANTL = 'Mannitol';
  mapping.MALTDEX = 'Maltodextrin';
  mapping.OLSAC = 'Oligosaccharides';
  mapping.RAFS = 'Raffinose';
  mapping.STAS = 'Stachyose';
  mapping.SORTL = 'Sorbitol';


  // Protiens & amino acids
  mapping.PROCNT = 'Protein';
  mapping.TRP = 'Tryptophan';
  mapping.TYR = 'Tyrosine';
  mapping.THR = 'Threonine';
  mapping.SER = 'Serine';
  mapping.ALA = 'Alanine';
  mapping.ARG = 'Arginine';
  mapping.ASP = 'Aspartic acid';
  mapping.CYS = 'Cystine';
  mapping.HIS = 'Histidine';
  mapping.HISTN = 'Histidine';
  mapping.ILE = 'Isoleucine';
  mapping.HYP = 'Hyroxyprofile';
  mapping.PRO = 'Proline';
  mapping.GLU = 'Glutamic acid';
  mapping.GLY = 'Glycine';
  mapping.PHE = 'Phenylalanine';
  mapping.MET = 'Methionine';
  mapping.LYS = 'Lysine';
  mapping.LEU = 'Leucine';
  mapping.VAL = 'Valine';
  mapping.TRP_G = 'Tryptophan';
  mapping.TYR_G = 'Tyrosine';
  mapping.THR_G = 'Threonine';
  mapping.SER_G = 'Serine';
  mapping.ALA_G = 'Alanine';
  mapping.ARG_G = 'Arginine';
  mapping.ASP_G = 'Aspartic acid';
  mapping.CYS_G = 'Cystine';
  mapping.HIS_G = 'Histidine';
  mapping.HISTN_G = 'Histidine';
  mapping.ILE_G = 'Isoleucine';
  mapping.HYP_G = 'Hyroxyprofile';
  mapping.PRO_G = 'Proline';
  mapping.GLU_G = 'Glutamic acid';
  mapping.GLY_G = 'Glycine';
  mapping.PHE_G = 'Phenylalanine';
  mapping.MET_G = 'Methionine';
  mapping.LYS_G = 'Lysine';
  mapping.LEU_G = 'Leucine';
  mapping.VAL_G = 'Valine';
  // Fats & fatty acids
  mapping.FAT = 'Total lipid (fat)';
  mapping.FAMS = 'Fatty acids, total monounsaturated';
  mapping.FAPU = 'Fatty acids, total polyunsaturated';
  mapping.FASAT = 'Fatty acids, total saturated';
  mapping.FATSAT = 'Fatty acids, total saturated';
  mapping.FATRN = 'Fatty acids, total trans';
  mapping.F4D0 = '4:0';
  mapping.F6D0 = '6:0';
  mapping.F8D0 = '8:0';
  mapping.F10D0 = '10:0';
  mapping.F10D1 = '10:1';
  mapping.F12D0 = '12:0';
  mapping.F13D0 = '13:0';
  mapping.F14D0 = '14:0';
  mapping.F14D1 = '14:1';
  mapping.F15D0 = '15:0';
  mapping.F15D1 = '15:1';
  mapping.F16D0 = '16:0';
  mapping.F16D1 = '16:1 undifferentiated';
  mapping.F16D1T = '16:0T'; // trans
  mapping.F16D1T = '16:0C'; // cis
  mapping.F17D0 = '17:0';
  mapping.F17D1 = '17:1';
  mapping.F18D0 = '18:0';
  mapping.F18D1C = '18:1 C';
  mapping.F18D1TN7 = '18:1 T7';
  mapping.F18D1 = '18:1 undifferentiated';
  mapping.F18D2 = '18:2 undifferentiated';
  mapping.F18D2CN6 = '18:2 c n-6';
  mapping.F18D2TT = '18:2 TT';
  mapping.F18D2I = '18:2 I';
  mapping.F18D2N6 = '18:2 n-6';
  mapping.F18D3 = '18:3 undifferentiated';
  mapping.F18D3T = '18:3 T';
  mapping.F18D3I = '18:3 I';
  mapping.F18D3N6 = '18:3 n-6';
  mapping.F18D3N3F = '18:3 n-3'; // per unit
  mapping.F18D3N3 = '18:3 n-3'; // per %
  mapping.F18D4 = '18:4';
  mapping.F18D4N3 = '18:4 n-3';
  mapping.F19D0 = '19:0';
  mapping.F20D0 = '20:0';
  mapping.F20D1 = '20:1';
  mapping.F20D1N11F = '20:1 n-11';
  mapping.F20D2N6 = '20:2 n-6 c,c';
  mapping.F20D3N3 = '20:2 n-3';
  mapping.F20D3 = '20:3 undifferentiated';
  mapping.F20D4 = '20:4 undifferentiated';
  mapping.F20D4N6 = '20:4 n-6';
  mapping.F20D5 = '20:5 n-3 (EPA)';
  mapping.F21D0 = '21:0';
  mapping.F22D0 = '22:0';
  mapping.F22D1 = '22:1 undifferentiated';
  mapping.F22D1C = '22:1 c';
  mapping.F22D1T = '22:1 t';
  mapping.F22D3 = '20:2 n-3';
  mapping.F22D5N3 = '22:5 n-3 (DPA)';
  mapping.F22D6 = '22:6';
  mapping.F22D6N3 = '22:6 n-3 (DHA)';
  mapping.F23D0 = '23:0';
  mapping.F24D0 = '24:0';
  mapping.F24D1 = '24:1';
  mapping.F24D1C = '24:1 c';
  mapping.LCW3TOTAL = 'Total Omega 3 Fatty Acid';
  mapping.FAUNDIFF = 'Undifferentiated fatty acids';

  // acids
  mapping.ACEAC = 'Acetic acid';
  mapping.CITAC = 'Citric acid';
  mapping.FUMAC = 'Fumaric acid';
  mapping.LACAC = 'Lactic acid';
  mapping.MALAC = 'Malic acid';
  mapping.OXALAC = 'Oxalic acid';
  mapping.PROPAC = 'Propionic acid';
  mapping.QUINAC = 'Quinic acid';
  mapping.SHIKAC = 'Shikimic acid';
  mapping.SUCAC = 'Succinic acid';
  mapping.TARAC = 'Tartaric acid';


  //        prefixToName[""] = ";
  // Minerals & metals
  mapping.AL = 'Aluminium';
  mapping.AS = 'Arsenic';
  mapping.CA = 'Calcium (Ca)';
  mapping.CD = 'Cadmium (Cd)';
  mapping.CU = 'Copper (Cu)';
  mapping.CO = 'Cobalt (Co)';
  mapping.CR = 'Chromium (Cr)';
  mapping.FD = 'Fluoride (F)';
  mapping.FE = 'Iron (Fe)';
  mapping.HG = 'Mercury (Hg)';
  mapping.ID = 'Iodine (I)';
  mapping.K = 'Potassium (K)';
  mapping.MG = 'Magnesium (Mg)';
  mapping.MN = 'Manganese (Mn)';
  mapping.M0 = 'Molybdenum (Mo)';
  mapping.NA = 'Sodium (Na)';
  mapping.NI = 'Nickel (Ni)';
  mapping.P = 'Phosphorus (P)';
  mapping.PB = 'Lead (Pb)';
  mapping.S = 'Sulphur (S)';
  mapping.SE = 'Selenium (Se)';
  mapping.SN = 'Tin (Sn)';
  mapping.ZN = 'Zinc (Zn)';
  mapping.FLD = 'Flouride (F)';
  // Vitamins
  mapping.BIOT = 'Biotin (B7)';
  mapping.B1 = 'Thiamin (B1)';
  mapping.THIA = 'Thiamin (B1)';
  mapping.B2 = 'Riboflavin (B2)';
  mapping.B3 = 'Niacin (B3)';
  mapping.VITB6 = 'Pyridoxine (B6)';
  mapping.VITB12 = 'Cobalamin (B12)';
  mapping.CARTA = 'Alpha carotene';
  mapping.CARTB = 'Beta carotene';
  mapping.CARTBEQ = 'Beta carotene equivalents';
  mapping.CHOLN = 'Choline';
  mapping.BETN = 'Betaine';
  mapping.CRYPX = 'Cryptoxanthin';
  mapping.NIA = 'Niacin (B3)';
  mapping.NIAEQ = 'Niacin Equivalents';


  mapping.FOL = 'Total folates';
  mapping.FOLAC = 'Folic acid';
  mapping.FOLFD = 'Folate, natural';
  mapping.FOLDFE = 'Dietary folate equivalents';
  prefixToName['LUT+ZEA'] = 'Lutein + Zeaxanthin';
  mapping.LUTN = 'Lutein';
  mapping.LYCPN = 'Lycopene';

  mapping.MK4 = 'Menaquinone-4';
  mapping.PANTAC = 'Pantothenic acid (B5)';
  mapping.VITB6A = 'Pyridoxine (B6)';
  mapping.VITB12 = 'Cobalamin (B12)';
  mapping.VITE = 'Vitamin E';
  mapping.VITK = 'Vitamin K (phylloquinone)';
  mapping.VITK1D = '';
  mapping.RETOL = 'Retinol';
  mapping.VITA_IU = 'Retinol Equivalents (VIT A)';
  mapping.VITA_RAE = 'Retinol Activity Equivalent (RAE)';
  mapping.VITA = 'Retinol Equivalents (VIT A)';
  mapping.VITC = 'Vitamin C';
  // vit d
  mapping.CHOCAL = 'Cholecalciferol (D3)';
  mapping.ERGCAL = 'Ergocalciferol (D2)';
  mapping.CHOCALOH = '25-OH Cholecalciferol (25-OH D3)';
  mapping.ERGCALOH = '25-OH Ergocalciferol (25-OH D2)';
  mapping.VITDEQ = 'Vitamin D3 equivalents, with factors';
  mapping.VITD = 'Vitamin D';
  // sterols
  mapping.PHYSTR = 'Phytosterols';
  mapping.STID7 = 'Stigmasterol'; // usually delta 7-stigmasterol
  mapping.CAMD5 = 'Campesterol';
  mapping.SITSTR = 'Sitosterol';
  mapping.TOCPHA = 'Alpha-tocopherol';
  mapping.TOCTRA = 'Alpha-tocotrienol';
  mapping.TOCPHB = 'Beta-tocopherol';
  mapping.TOCTRB = 'Beta-tocotrienol';
  mapping.TOCPHD = 'Delta-tocopherol';
  mapping.TOCTRD = 'Delta-tocotrienol';
  mapping.TOCPHG = 'Gamma-tocopherol';
  mapping.TOCTRG = 'Gamma-tocotrienol';
  // Other
  mapping.CAFFN = 'Caffeine';
  mapping.CHOLE = 'Cholesterol';

  return mapping[prefix] || null;
}

// function portionToValue(portion) {
//   /**
//    * Attempt to convert a string-based portion to a numerical value from
//    * a given look-up table.
//    */
//   const portions = {};
//   portions.tsp = 0.4;
//   portions.cup = 0.00;
//   portions.dsp = 1;
//   portions.handful = 40;
//   // ....
//   // ....
//   return portions[portion];
// }
export function prefixToUnit(prefix) {
  /**
   * Return standardized units for particular nutrient. This issue can be solved
   * by assuming the served content is reliable and standardized - may not be
   * a safe assumption when considering multiple data sources etc.
   * TODO: potentially look at this being hotloaded by REST service
   */
  const units = {};
  units.ENERC = 'kJ';
  units.ENERC1 = 'kJ';
  units.ENERC_KCAL = 'kCal';
  units.WATER = 'g';
  // Carbohydrates
  units.CHOCDF = 'g';
  units.CHOAVL = 'g';
  units.SUGAR = 'g';
  units.FIBTG = 'g';
  units.SUCS = 'g';
  units.MALS = 'g';
  units.GALS = 'g';
  units.FRUS = 'g';
  units.LACS = 'g';
  units.GLUS = 'g';
  units.STARCH = 'g';
  // common
  units.DEXTN = 'g';
  units.GYRL = 'g';
  units.GLYC = 'g';
  units.INULN = 'g';
  units.MANTL = 'g';
  units.MALTDEX = 'g';
  units.OLSAC = 'g';
  units.RAFS = 'g';
  units.STAS = 'g';
  units.SORTL = 'g';


  // Protiens & amino acids
  units.PROCNT = 'g';
  units.TRP = 'mg';
  units.TYR = 'mg';
  units.THR = 'mg';
  units.SER = 'mg';
  units.ALA = 'mg';
  units.ARG = 'mg';
  units.ASP = 'mg';
  units.CYS = 'mg';
  units.HIS = 'mg';
  units.HISTN = 'mg';
  units.ILE = 'mg';
  units.HYP = 'mg';
  units.PRO = 'mg';
  units.GLU = 'mg';
  units.GLY = 'mg';
  units.PHE = 'mg';
  units.MET = 'mg';
  units.LYS = 'mg';
  units.LEU = 'mg';

  units.TRP_G = 'mg';
  units.TYR_G = 'mg';
  units.THR_G = 'mg';
  units.SER_G = 'mg';
  units.ALA_G = 'mg';
  units.ARG_G = 'mg';
  units.ASP_G = 'mg';
  units.CYS_G = 'mg';
  units.HIS_G = 'mg';
  units.HISTN_G = 'mg';
  units.ILE_G = 'mg';
  units.HYP_G = 'mg';
  units.PRO_G = 'mg';
  units.GLU_G = 'mg';
  units.GLY_G = 'mg';
  units.PHE_G = 'mg,';
  units.MET_G = 'mg';
  units.LYS_G = 'mg';
  units.LEU_G = 'mg';
  units.VAL_G = 'mg';
  // Fats & fatty acids
  units.FAT = 'g';
  units.FAMS = 'g';
  units.FAPU = 'g';
  units.FASAT = 'g';
  units.FATSAT = 'g';
  units.FATRN = 'g';
  units.F4D0 = 'mg'; // %T or g?
  units.F6D0 = 'mg';
  units.F8D0 = 'mg';
  units.F10D0 = 'mg';
  units.F10D1 = 'mg';
  units.F12D0 = 'mg';
  units.F13D0 = 'mg';
  units.F14D0 = 'mg';
  units.F14D1 = 'mg';
  units.F15D0 = 'mg';
  units.F15D1 = 'mg';
  units.F16D0 = 'mg';
  units.F16D1 = 'mg';
  units.F16D1T = 'mg'; // trans
  units.F16D1T = 'mg'; // cis
  units.F17D0 = 'mg';
  units.F17D1 = 'mg';
  units.F18D0 = 'mg';
  units.F18D1C = 'mg';
  units.F18D1TN7 = 'mg';
  units.F18D1 = 'mg';
  units.F18D2 = 'mg';
  units.F18D2CN6 = 'mg';
  units.F18D2TT = 'mg';
  units.F18D2I = 'mg';
  units.F18D2N6 = 'mg';
  units.F18D3 = 'mg';
  units.F18D3T = 'mg';
  units.F18D3I = 'mg';
  units.F18D3N6 = 'mg';
  units.F18D3N3F = 'mg'; // per unit
  units.F18D3N3 = 'mg'; // per %
  units.F18D4 = 'mg';
  units.F18D4N3 = 'mg';
  units.F19D0 = 'mg';
  units.F20D0 = 'mg';
  units.F20D1 = 'mg';
  units.F20D1N11F = 'mg';
  units.F20D2N6 = 'mg';
  units.F20D3N3 = 'mg';
  units.F20D3 = 'mg';
  units.F20D4 = 'mg';
  units.F20D4N6 = 'mg';
  units.F20D5 = 'mg';
  units.F21D0 = 'mg';
  units.F22D0 = 'mg';
  units.F22D1 = 'mg';
  units.F22D1C = 'mg';
  units.F22D1T = 'mg';
  units.F22D3 = 'mg';
  units.F22D5N3 = 'mg';
  units.F22D6 = 'mg';
  units.F22D6N3 = 'mg';
  units.F23D0 = 'mg';
  units.F24D0 = 'mg';
  units.F24D1 = 'mg';
  units.F24D1C = 'mg';
  units.LCW3TOTAL = 'mg';
  units.FAUNDIFF = 'mg';

  // acids
  units.ACEAC = 'g';
  units.CITAC = 'g';
  units.FUMAC = 'g';
  units.LACAC = 'g';
  units.MALAC = 'g';
  units.OXALAC = 'g';
  units.PROPAC = 'g';
  units.QUINAC = 'g';
  units.SHIKAC = 'g';
  units.SUCAC = 'g';
  units.TARAC = 'g';


  //        units["] = ";
  // Minerals & metals
  units.AL = 'ug';
  units.AS = 'ug';
  units.CA = 'mg';
  units.CD = 'ug';
  units.CU = 'mg';
  units.CO = 'ug';
  units.CR = 'ug';
  units.FD = 'ug';
  units.FE = 'mg';
  units.HG = 'ug';
  units.ID = 'ug';
  units.K = 'mg';
  units.MG = 'mg';
  units.MN = 'mg';
  units.M0 = 'ug';
  units.NA = 'mg';
  units.NI = 'ug';
  units.P = 'mg';
  units.PB = 'ug';
  units.S = 'mg';
  units.SE = 'ug';
  units.SN = 'ug';
  units.ZN = 'mg';
  units.FLD = 'mg';
  // Vitamins
  units.BIOT = 'ug';
  units.B1 = 'mg';
  units.THIA = 'mg';
  units.B2 = 'mg';
  units.B3 = 'mg';
  units.VITB6 = 'mg';
  units.VITB12 = 'ug';
  units.CARTA = 'ug';
  units.CARTB = 'ug';
  units.CARTBEQ = 'ug';
  units.CHOLN = 'ug';
  units.BETN = 'ug';
  units.CRYPX = 'ug';
  units.NIA = 'mg';
  units.NIAEQ = 'mg';

  units.FOL = 'ug';
  units.FOLAC = 'ug';
  units.FOLFD = 'ug';
  units.FOLDFE = 'ug';
  units['LUT+ZEA'] = 'ug';
  units.LUTN = 'ug';
  units.LYCPN = 'ug';

  units.MK4 = 'ug';
  units.PANTAC = 'mg';
  units.VITB6A = 'mg';
  units.VITB12 = 'ug';
  units.VITE = 'mg';
  units.VITK = 'ug';
  units.VITK1D = 'ug';
  units.RETOL = 'ug';
  units.VITA_IU = 'IU';
  units.VITA = 'ug';
  units.VITA_RAE = 'mg';
  units.VITC = 'mg';
  // vit d
  units.CHOCAL = 'ug';
  units.ERGCAL = 'ug';
  units.CHOCALOH = 'ug';
  units.ERGCALOH = 'ug';
  units.VITDEQ = 'ug';
  units.VITD = 'ug';
  // sterols
  units.PHYSTR = 'mg';
  units.STID7 = 'mg'; // usually delta 7-stigmasterol
  units.CAMD5 = 'mg';
  units.SITSTR = 'mg';
  units.TOCPHA = 'mg';
  units.TOCTRA = 'mg';
  units.TOCPHB = 'mg';
  units.TOCTRB = 'mg';
  units.TOCPHD = 'mg';
  units.TOCTRD = 'mg';
  units.TOCPHG = 'mg';
  units.TOCTRG = 'mg';
  // Other
  units.CAFFN = 'mg';
  units.CHOLE = 'mg';
  return units[prefix] || 'NA';
}
