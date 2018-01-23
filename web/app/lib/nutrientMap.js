import _ from 'lodash';
import {
  HEADER,
  PARENT_NONAME_ROW,
  PARENT_ROW,
  CHILD_ROW,
  CHILD2_ROW,

} from 'containers/FoodProfile/constants';


export function getNutrient(prefix, nutrients, portion = false) {
  const nutrient = nutrients[prefix];
  if (nutrient) {
    return new Nutrient(
      prefix,
      nutrient.name || prefixToName(prefix),
      nutrient.units || prefixToUnit(prefix),
      getScaledValue(nutrient.value, portion) || '~',
      getRDI(prefix)
    );
  }
  return new Nutrient(
    prefix,
    prefixToName(prefix),
    prefixToUnit(prefix),
    '~',
    getRDI(prefix)
  );
}
export function getNormalisedNutrient(prefix, nutrients, portion = false) {
  const nutrient = nutrients[prefix];
  // this.name = nutrient.name || prefixToName(prefix);
  // this.units = nutrient.units || prefixToUnit(prefix);
  // this.value = getScaledValue(nutrient.value, portion) || '~';
  const nut = new Nutrient(
    prefix,
    prefixToName(prefix),
    prefixToUnit(prefix),
    '~'

  );
  // console.log("getNutient:prefix:", prefix)
  // console.log("getNutient:nutrients:", nutrients)
  // console.log("getNutient:defaultName:", prefixToName(prefix))
  // console.log("getNutient:defaultUnit:", prefixToUnit(prefix))
  // console.log("getNutrient:returning:this:", nut)
  if (nutrient) {
    return new Nutrient(
      prefix,
      nutrient.name || prefixToName(prefix),
      nutrient.units || prefixToUnit(prefix),
      getScaledValue(nutrient.value, portion) || '~'
    );
  }
  return new Nutrient(
    prefix,
    prefixToName(prefix),
    prefixToUnit(prefix),
    '~'
  );
}
function Nutrient(prefix, name, units, value, rdi = null) {
  this.prefix = prefix;
  this.name = name;
  this.units = units;
  this.value = value;
  this.rdi = rdi;
}
function Portion(name, amount, value) {
  this.unit = name;
  this.value = value;
  this.className = name ? `${name.replace(/\ |\_|\,|\-|/g, '')}` : 'portion-class';
  this.label = name;
  this.amt = amount;
  this.g = value;
}

export function getEnergyKJ(nutrients, portion = false) {
  /**
   * There can be variation in the prefix used to denote energy. Function used
   * to abstract complexity away and ensure a result is returned.
   */
  if (nutrients.ENERC) {
    var nutrient = getScaledNutrient('ENERC', nutrients.ENERC, portion);
    nutrient.prefix = 'ENERC';
    nutrient.name = 'Energy';
    return nutrient;
  } else if (nutrients.ENERC1) {
    var nutrient = getScaledNutrient('ENERC1', nutrients.ENERC1, portion);
    nutrient.prefix = 'ENERC1';
    nutrient.name = 'Energy';
    return nutrient;
  }
  return null;
}
export function getEnergyKCAL(nutrients, portion = false) {
  /**
   * There can be variation in the prefix used to denote energy. Function used
   * to abstract complexity away and ensure a result is returned.
   */
  const KJtoKCAL = 0.239006;
  if (nutrients.ENERC_KCAL) {
    const nutrient = getScaledNutrient('ENERC_KCAL', nutrients.ENERC_KCAL, portion);
    nutrient.prefix = 'ENERC_KCAL';
    nutrient.name = 'Energy (KCAL)';
    return nutrient;
  } else if (nutrients.ENERC_KJ) {
    var energyKCAL = _.round(nutrients.ENERC_KJ.value * KJtoKCAL, 1);
    return getScaledNutrient('ENERC_KJ', new Nutrient('ENERC_KJ', 'Energy (KCAL)', 'kcal', energyKCAL), portion);
  } else if (nutrients.ENERC1) {
    var energyKCAL = _.round(nutrients.ENERC1.value * KJtoKCAL, 1);
    return getScaledNutrient('ENERC1', new Nutrient('ENERC1', 'Energy (KCAL)', 'kcal', energyKCAL), portion);
  } else if (nutrients.ENERC) {
    var energyKCAL = _.round(nutrients.ENERC * KJtoKCAL, 1);
    return getScaledNutrient('ENERC', new Nutrient('ENERC', 'Energy (KCAL)', 'kcal', energyKCAL), portion);
  }
  return null;
}
export function getCarbohydrates(nutrients, portion = false) {
  // get availalble carbohydrates by difference.
  if (nutrients.CHOCDF) {
    const nutrient = getScaledNutrient('CHOCDF', nutrients.CHOCDF, portion);
    nutrient.prefix = 'CHOCDF';
    nutrient.name = 'Carbohydrates Total';
    nutrient.rdi = getRDI('CHOCDF');
    return nutrient;
  } else if (nutrients.AVAILCHOCNS) {
    const nutrient = getScaledNutrient('AVAILCHOCNS', nutrients.AVAILCHOCNS, portion);
    nutrient.prefix = 'AVAILCHOCNS';
    nutrient.name = 'Carbohydrates Total';
    nutrient.rdi = getRDI('CHOCDF');
    return nutrient;
  }
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
export function summaryNutrientIds()


export function getSummaryNutrients(nutrients, portion = false) {
  /**
   * Takes the entire nutrient array and returns a sub-structure with the
   * nutrients we want associated with the SummaryCard view
   */
  const rowProperty = (type, nutrient, alias) => ({ type, nutrient, alias });
  const summaryTable = [
    rowProperty(PARENT_ROW, getEnergyKJ(nutrients, portion)),
    rowProperty(PARENT_NONAME_ROW, getEnergyKCAL(nutrients, portion)),
    rowProperty(PARENT_ROW, getCarbohydrates(nutrients, portion)),
    rowProperty(PARENT_ROW, getNutrient('SUGAR', nutrients, portion)),
    rowProperty(PARENT_ROW, getNutrient('FIBTG', nutrients, portion)),
    rowProperty(PARENT_ROW, getNutrient('PROCNT', nutrients, portion)),
    rowProperty(PARENT_ROW, getNutrient('FAT', nutrients, portion)),
    rowProperty(PARENT_ROW, getNutrient('NA', nutrients, portion)),
    rowProperty(PARENT_ROW, getNutrient('K', nutrients, portion)),
    rowProperty(PARENT_ROW, getNutrient('VITC', nutrients, portion)),
    rowProperty(PARENT_ROW, getNutrient('VITD', nutrients, portion)),
  ];
  return summaryTable;
}
export function getRDI(prefix) {
  return RDImapping[prefix];
}
export function getDetailedNutrients(nutrients, portion = false) {
  /**
   * This data structure is used by the ExpandableListView component and expects
   * a strucuture as follows:
   * const DATA = [
   * {
   *  headerName: "Energy",
   *  isOpened: true,
   *  isReactComponent: false,
   *  items: [
   *  rowProperty(..., ...)
   *  rowProperty(..., ...)
   *  ...
   *  ]
   *  height: 100
   *
   * }
   * ]
   *
   *
   */
  console.log('nutrientMap:getDetailedNutrients:portion:', portion);

  console.log('nutrientMap:getDetailedNutrients:Energy:value', getEnergyKJ(nutrients, portion));
  const rowProperty = (type, nutrient, alias) => ({ type, nutrient, alias });
  const detailedTable = [
    {
      headerName: 'Energy',
      isOpened: true,
      isReactComponent: true,
      items: [
        rowProperty(PARENT_ROW, getEnergyKJ(nutrients, portion)),
        rowProperty(PARENT_NONAME_ROW, getEnergyKCAL(nutrients, portion)),
      ],
    },
    {
      headerName: 'Fats & Fatty Acids',
      isOpened: true,
      isReactComponent: true,
      items: [
        rowProperty(PARENT_ROW, getNutrient('FAT', nutrients, portion)),
        rowProperty(CHILD_ROW, getNutrient('FATSAT', nutrients, portion)),
        rowProperty(CHILD_ROW, getNutrient('FAMS', nutrients, portion)),
        rowProperty(CHILD_ROW, getNutrient('FAPU', nutrients, portion)),
        rowProperty(CHILD_ROW, getNutrient('FATRN', nutrients, portion)),
        rowProperty(PARENT_ROW, getOmega3(nutrients, portion)),
      ],
    },
    {
      headerName: 'Carbohydrates',
      isOpened: true,
      isReactComponent: true,
      items: [
        rowProperty(PARENT_ROW, getCarbohydrates(nutrients, portion)),
        rowProperty(CHILD_ROW, getNutrient('FIBTG', nutrients, portion)),
        rowProperty(CHILD_ROW, getNutrient('SUGAR', nutrients, portion)),
        rowProperty(CHILD2_ROW, getNutrient('GLUS', nutrients, portion)),
        rowProperty(CHILD2_ROW, getNutrient('SUCS', nutrients, portion)),
        rowProperty(CHILD2_ROW, getNutrient('MALS', nutrients, portion)),
        rowProperty(CHILD2_ROW, getNutrient('FRUS', nutrients, portion)),
        rowProperty(CHILD2_ROW, getNutrient('LACS', nutrients, portion)),
        rowProperty(CHILD2_ROW, getNutrient('GALS', nutrients, portion)),
      ],
    },
    {
      headerName: 'Protein',
      isOpened: true,
      isReactComponent: true,
      items: [
        rowProperty(PARENT_ROW, getNutrient('PROCNT', nutrients, portion)),
        rowProperty(CHILD_ROW, getNutrient('TRP_G', nutrients, portion)),
        rowProperty(CHILD_ROW, getNutrient('THR_G', nutrients, portion)),
        rowProperty(CHILD_ROW, getNutrient('ILE_G', nutrients, portion)),
        rowProperty(CHILD_ROW, getNutrient('LEU_G', nutrients, portion)),
        rowProperty(CHILD_ROW, getNutrient('LYS_G', nutrients, portion)),
        rowProperty(CHILD_ROW, getNutrient('MET_G', nutrients, portion)),
        rowProperty(CHILD_ROW, getNutrient('CYS_G', nutrients, portion)),
        rowProperty(CHILD_ROW, getNutrient('PHE_G', nutrients, portion)),
        rowProperty(CHILD_ROW, getNutrient('TYR_G', nutrients, portion)),
        rowProperty(CHILD_ROW, getNutrient('VAL_G', nutrients, portion)),
        rowProperty(CHILD_ROW, getNutrient('ARG_G', nutrients, portion)),
        rowProperty(CHILD_ROW, getNutrient('HISTN_G', nutrients, portion)),
        rowProperty(CHILD_ROW, getNutrient('ALA_G', nutrients, portion)),
        rowProperty(CHILD_ROW, getNutrient('ASP_G', nutrients, portion)),
        rowProperty(CHILD_ROW, getNutrient('GLU_G', nutrients, portion)),
        rowProperty(CHILD_ROW, getNutrient('PRO_G', nutrients, portion)),
        rowProperty(CHILD_ROW, getNutrient('SER_G', nutrients, portion)),
        rowProperty(CHILD_ROW, getNutrient('HYP', nutrients, portion)),
      ],
    },
    {
      headerName: 'Minerals',
      isOpened: true,
      isReactComponent: true,
      items: [
        rowProperty(PARENT_ROW, getNutrient('CA', nutrients, portion)),
        rowProperty(PARENT_ROW, getNutrient('FE', nutrients, portion)),
        rowProperty(PARENT_ROW, getNutrient('MG', nutrients, portion)),
        rowProperty(PARENT_ROW, getNutrient('P', nutrients, portion)),
        rowProperty(PARENT_ROW, getNutrient('K', nutrients, portion)),
        rowProperty(PARENT_ROW, getNutrient('NA', nutrients, portion)),
        rowProperty(PARENT_ROW, getNutrient('ZN', nutrients, portion)),
        rowProperty(PARENT_ROW, getNutrient('CU', nutrients, portion)),
        rowProperty(PARENT_ROW, getNutrient('MN', nutrients, portion)),
        rowProperty(PARENT_ROW, getNutrient('SE', nutrients, portion)),
        rowProperty(PARENT_ROW, getNutrient('FLD', nutrients, portion)),

      ],
    },
    {
      headerName: 'Vitamins',
      isOpened: true,
      isReactComponent: true,
      items: [
        rowProperty(PARENT_ROW, getNutrient('VITC', nutrients, portion)),
        rowProperty(CHILD_ROW, getNutrient('VITA_IU', nutrients, portion)),
        rowProperty(CHILD_ROW, getNutrient('RETOL', nutrients, portion)),
        rowProperty(CHILD_ROW, getNutrient('VITA_RAE', nutrients, portion)),
        rowProperty(CHILD_ROW, getNutrient('CARTA', nutrients, portion)),
        rowProperty(CHILD_ROW, getNutrient('CARTB', nutrients, portion)),
        rowProperty(CHILD_ROW, getNutrient('CRYPX', nutrients, portion)),
        rowProperty(CHILD_ROW, getNutrient('LYCPN', nutrients, portion)),
        rowProperty(CHILD_ROW, getNutrient('LUT+ZEA', nutrients, portion)),
        rowProperty(PARENT_ROW, getNutrient('VITD', nutrients, portion)),
        rowProperty(PARENT_ROW, getNutrient('TOCPHA', nutrients, portion)),
        rowProperty(CHILD_ROW, getNutrient('TOCPHB', nutrients, portion)),
        rowProperty(CHILD_ROW, getNutrient('TOCPHD', nutrients, portion)),
        rowProperty(PARENT_ROW, getNutrient('VITK', nutrients, portion)),
        rowProperty(PARENT_ROW, getNutrient('THIA', nutrients, portion)),
        rowProperty(PARENT_ROW, getNutrient('NIA', nutrients, portion)),
        rowProperty(PARENT_ROW, getNutrient('SE', nutrients, portion)),
        rowProperty(PARENT_ROW, getNutrient('FOL', nutrients, portion)),
        rowProperty(PARENT_ROW, getNutrient('FOLFD', nutrients, portion)),
        rowProperty(PARENT_ROW, getNutrient('FOLAC', nutrients, portion)),
        rowProperty(PARENT_ROW, getNutrient('FOLDFE', nutrients, portion)),
        rowProperty(PARENT_ROW, getNutrient('VITB6A', nutrients, portion)),
        rowProperty(PARENT_ROW, getNutrient('CHOLN', nutrients, portion)),
        rowProperty(PARENT_ROW, getNutrient('BETN', nutrients, portion)),
      ],
    },
  ];
  return detailedTable;
}


export function defaultPortions(profilePortions = null) {
  const portions = [];
  portions.push(new Portion('per 100g', 1, 100));
  if (profilePortions) {
    for (const portion of profilePortions) {
      if (portion.unit.includes('tsp')) {
        portions.push(new Portion(
          `${String(portion.amt)} ${portion.unit}`,
          portion.unit,
          portion.g
        ));
      } else {
        portions.push(new Portion(
          portion.name,
          portion.unit,
          portion.g
        ));
      }
    }
  }
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
function getScaledNutrient(prefix, nutrient, portion = false) {
  /**
   * Will attempt to discover the formatting of the scaling factor and
   * convert the current value accordingly
   */
  // TODO: fix this, returning nutrient isnt compaitible with the getNutrient method
  if (!portion) {
    return new Nutrient(prefix, nutrient.name, nutrient.units, nutrient.value);
  }
  return new Nutrient(
    prefix,
    nutrient.name,
    nutrient.units,
    truncateTo(nutrient.value * scale(portion), 1)
  );
}

const truncateTo = (unRouned, nrOfDecimals = 2) => {
  const parts = String(unRouned).split('.');

  if (parts.length !== 2) {
    // without any decimal part
    return unRouned;
  }

  const newDecimals = parts[1].slice(0, nrOfDecimals),
    newString = `${parts[0]}.${newDecimals}`;

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
}
function isFloat(n) {
  return isNumeric(n) && !_.isInteger(n);
}
function isNumeric(n) {
  return !_.isNaN(n) && _.isFinite(n);
}
const RDImapping = {
  WATER: 3400,
  SUGAR: 112,
  CHOCDF: 310,
  PROCNT: 64,
  FIBTG: 30,
  NA: 960,
  FAT: 50,
};
function prefixToName(prefix) {
  /**
   * Convert nutrient prefix to full name from a standard hash/dictionary table
   * stored on the client side??
   * TODO: potentially look at this being hotloaded by REST service
   */
  const prefixToName = {};
  prefixToName.ENERC = 'Energy';
  prefixToName.ENERC1 = 'Energy, including dietary fibre';
  prefixToName.ENERC1 = 'Energy';
  prefixToName.ENERC_KCAL = 'Energy';
  // Carbohydrates
  prefixToName.CHOCDF = 'Carbohydrate, by difference';
  prefixToName.CHOAVL = 'Available carbohydrate';
  prefixToName.SUGAR = 'Sugar Total';
  prefixToName.FIBTG = 'Dietary Fibre';
  prefixToName.SUCS = 'Sucrose';
  prefixToName.MALS = 'Maltose';
  prefixToName.GALS = 'Galactose';
  prefixToName.FRUS = 'Fructose';
  prefixToName.GLUS = 'Glucose';
  prefixToName.LACS = 'Lactose';
  prefixToName.STARCH = 'Starch';
  // common
  prefixToName.DEXTN = 'Dextrin';
  prefixToName.GYRL = 'Glycerol';
  prefixToName.GLYC = 'Glycogen';
  prefixToName.INULN = 'Inulin';
  prefixToName.MANTL = 'Mannitol';
  prefixToName.MALTDEX = 'Maltodextrin';
  prefixToName.OLSAC = 'Oligosaccharides';
  prefixToName.RAFS = 'Raffinose';
  prefixToName.STAS = 'Stachyose';
  prefixToName.SORTL = 'Sorbitol';


  // Protiens & amino acids
  prefixToName.PROCNT = 'Protein';
  prefixToName.TRP = 'Tryptophan';
  prefixToName.TYR = 'Tyrosine';
  prefixToName.THR = 'Threonine';
  prefixToName.SER = 'Serine';
  prefixToName.ALA = 'Alanine';
  prefixToName.ARG = 'Arginine';
  prefixToName.ASP = 'Aspartic acid';
  prefixToName.CYS = 'Cystine';
  prefixToName.HIS = 'Histidine';
  prefixToName.HISTN = 'Histidine';
  prefixToName.ILE = 'Isoleucine';
  prefixToName.HYP = 'Hyroxyprofile';
  prefixToName.PRO = 'Proline';
  prefixToName.GLU = 'Glutamic acid';
  prefixToName.GLY = 'Glycine';
  prefixToName.PHE = 'Phenylalanine';
  prefixToName.MET = 'Methionine';
  prefixToName.LYS = 'Lysine';
  prefixToName.LEU = 'Leucine';
  prefixToName.VAL = 'Valine';
  prefixToName.TRP_G = 'Tryptophan';
  prefixToName.TYR_G = 'Tyrosine';
  prefixToName.THR_G = 'Threonine';
  prefixToName.SER_G = 'Serine';
  prefixToName.ALA_G = 'Alanine';
  prefixToName.ARG_G = 'Arginine';
  prefixToName.ASP_G = 'Aspartic acid';
  prefixToName.CYS_G = 'Cystine';
  prefixToName.HIS_G = 'Histidine';
  prefixToName.HISTN_G = 'Histidine';
  prefixToName.ILE_G = 'Isoleucine';
  prefixToName.HYP_G = 'Hyroxyprofile';
  prefixToName.PRO_G = 'Proline';
  prefixToName.GLU_G = 'Glutamic acid';
  prefixToName.GLY_G = 'Glycine';
  prefixToName.PHE_G = 'Phenylalanine';
  prefixToName.MET_G = 'Methionine';
  prefixToName.LYS_G = 'Lysine';
  prefixToName.LEU_G = 'Leucine';
  prefixToName.VAL_G = 'Valine';
  // Fats & fatty acids
  prefixToName.FAT = 'Total lipid (fat)';
  prefixToName.FAMS = 'Fatty acids, total monounsaturated';
  prefixToName.FAPU = 'Fatty acids, total polyunsaturated';
  prefixToName.FASAT = 'Fatty acids, total saturated';
  prefixToName.FATSAT = 'Fatty acids, total saturated';
  prefixToName.FATRN = 'Fatty acids, total trans';
  prefixToName.F4D0 = '4:0';
  prefixToName.F6D0 = '6:0';
  prefixToName.F8D0 = '8:0';
  prefixToName.F10D0 = '10:0';
  prefixToName.F10D1 = '10:1';
  prefixToName.F12D0 = '12:0';
  prefixToName.F13D0 = '13:0';
  prefixToName.F14D0 = '14:0';
  prefixToName.F14D1 = '14:1';
  prefixToName.F15D0 = '15:0';
  prefixToName.F15D1 = '15:1';
  prefixToName.F16D0 = '16:0';
  prefixToName.F16D1 = '16:1 undifferentiated';
  prefixToName.F16D1T = '16:0T'; // trans
  prefixToName.F16D1T = '16:0C'; // cis
  prefixToName.F17D0 = '17:0';
  prefixToName.F17D1 = '17:1';
  prefixToName.F18D0 = '18:0';
  prefixToName.F18D1C = '18:1 C';
  prefixToName.F18D1TN7 = '18:1 T7';
  prefixToName.F18D1 = '18:1 undifferentiated';
  prefixToName.F18D2 = '18:2 undifferentiated';
  prefixToName.F18D2CN6 = '18:2 c n-6';
  prefixToName.F18D2TT = '18:2 TT';
  prefixToName.F18D2I = '18:2 I';
  prefixToName.F18D2N6 = '18:2 n-6';
  prefixToName.F18D3 = '18:3 undifferentiated';
  prefixToName.F18D3T = '18:3 T';
  prefixToName.F18D3I = '18:3 I';
  prefixToName.F18D3N6 = '18:3 n-6';
  prefixToName.F18D3N3F = '18:3 n-3'; // per unit
  prefixToName.F18D3N3 = '18:3 n-3'; // per %
  prefixToName.F18D4 = '18:4';
  prefixToName.F18D4N3 = '18:4 n-3';
  prefixToName.F19D0 = '19:0';
  prefixToName.F20D0 = '20:0';
  prefixToName.F20D1 = '20:1';
  prefixToName.F20D1N11F = '20:1 n-11';
  prefixToName.F20D2N6 = '20:2 n-6 c,c';
  prefixToName.F20D3N3 = '20:2 n-3';
  prefixToName.F20D3 = '20:3 undifferentiated';
  prefixToName.F20D4 = '20:4 undifferentiated';
  prefixToName.F20D4N6 = '20:4 n-6';
  prefixToName.F20D5 = '20:5 n-3 (EPA)';
  prefixToName.F21D0 = '21:0';
  prefixToName.F22D0 = '22:0';
  prefixToName.F22D1 = '22:1 undifferentiated';
  prefixToName.F22D1C = '22:1 c';
  prefixToName.F22D1T = '22:1 t';
  prefixToName.F22D3 = '20:2 n-3';
  prefixToName.F22D5N3 = '22:5 n-3 (DPA)';
  prefixToName.F22D6 = '22:6';
  prefixToName.F22D6N3 = '22:6 n-3 (DHA)';
  prefixToName.F23D0 = '23:0';
  prefixToName.F24D0 = '24:0';
  prefixToName.F24D1 = '24:1';
  prefixToName.F24D1C = '24:1 c';
  prefixToName.LCW3TOTAL = 'Total Omega 3 Fatty Acid';
  prefixToName.FAUNDIFF = 'Undifferentiated fatty acids';

  // acids
  prefixToName.ACEAC = 'Acetic acid';
  prefixToName.CITAC = 'Citric acid';
  prefixToName.FUMAC = 'Fumaric acid';
  prefixToName.LACAC = 'Lactic acid';
  prefixToName.MALAC = 'Malic acid';
  prefixToName.OXALAC = 'Oxalic acid';
  prefixToName.PROPAC = 'Propionic acid';
  prefixToName.QUINAC = 'Quinic acid';
  prefixToName.SHIKAC = 'Shikimic acid';
  prefixToName.SUCAC = 'Succinic acid';
  prefixToName.TARAC = 'Tartaric acid';


  //        prefixToName[""] = ";
  // Minerals & metals
  prefixToName.AL = 'Aluminium';
  prefixToName.AS = 'Arsenic';
  prefixToName.CA = 'Calcium (Ca)';
  prefixToName.CD = 'Cadmium (Cd)';
  prefixToName.CU = 'Copper (Cu)';
  prefixToName.CO = 'Cobalt (Co)';
  prefixToName.CR = 'Chromium (Cr)';
  prefixToName.FD = 'Fluoride (F)';
  prefixToName.FE = 'Iron (Fe)';
  prefixToName.HG = 'Mercury (Hg)';
  prefixToName.ID = 'Iodine (I)';
  prefixToName.K = 'Potassium (K)';
  prefixToName.MG = 'Magnesium (Mg)';
  prefixToName.MN = 'Manganese (Mn)';
  prefixToName.M0 = 'Molybdenum (Mo)';
  prefixToName.NA = 'Sodium (Na)';
  prefixToName.NI = 'Nickel (Ni)';
  prefixToName.P = 'Phosphorus (P)';
  prefixToName.PB = 'Lead (Pb)';
  prefixToName.S = 'Sulphur (S)';
  prefixToName.SE = 'Selenium (Se)';
  prefixToName.SN = 'Tin (Sn)';
  prefixToName.ZN = 'Zinc (Zn)';
  prefixToName.FLD = 'Flouride (F)';
  // Vitamins
  prefixToName.BIOT = 'Biotin (B7)';
  prefixToName.B1 = 'Thiamin (B1)';
  prefixToName.THIA = 'Thiamin (B1)';
  prefixToName.B2 = 'Riboflavin (B2)';
  prefixToName.B3 = 'Niacin (B3)';
  prefixToName.VITB6 = 'Pyridoxine (B6)';
  prefixToName.VITB12 = 'Cobalamin (B12)';
  prefixToName.CARTA = 'Alpha carotene';
  prefixToName.CARTB = 'Beta carotene';
  prefixToName.CARTBEQ = 'Beta carotene equivalents';
  prefixToName.CHOLN = 'Choline';
  prefixToName.BETN = 'Betaine';
  prefixToName.CRYPX = 'Cryptoxanthin';
  prefixToName.NIA = 'Niacin (B3)';
  prefixToName.NIAEQ = 'Niacin Equivalents';


  prefixToName.FOL = 'Total folates';
  prefixToName.FOLAC = 'Folic acid';
  prefixToName.FOLFD = 'Folate, natural';
  prefixToName.FOLDFE = 'Dietary folate equivalents';
  prefixToName['LUT+ZEA'] = 'Lutein + Zeaxanthin';
  prefixToName.LUTN = 'Lutein';
  prefixToName.LYCPN = 'Lycopene';

  prefixToName.MK4 = 'Menaquinone-4';
  prefixToName.PANTAC = 'Pantothenic acid (B5)';
  prefixToName.VITB6A = 'Pyridoxine (B6)';
  prefixToName.VITB12 = 'Cobalamin (B12)';
  prefixToName.VITE = 'Vitamin E';
  prefixToName.VITK = 'Vitamin K (phylloquinone)';
  prefixToName.VITK1D = '';
  prefixToName.RETOL = 'Retinol';
  prefixToName.VITA_IU = 'Retinol Equivalents (VIT A)';
  prefixToName.VITA_RAE = 'Retinol Activity Equivalent (RAE)';
  prefixToName.VITA = 'Retinol Equivalents (VIT A)';
  prefixToName.VITC = 'Vitamin C';
  // vit d
  prefixToName.CHOCAL = 'Cholecalciferol (D3)';
  prefixToName.ERGCAL = 'Ergocalciferol (D2)';
  prefixToName.CHOCALOH = '25-OH Cholecalciferol (25-OH D3)';
  prefixToName.ERGCALOH = '25-OH Ergocalciferol (25-OH D2)';
  prefixToName.VITDEQ = 'Vitamin D3 equivalents, with factors';
  prefixToName.VITD = 'Vitamin D';
  // sterols
  prefixToName.PHYSTR = 'Phytosterols';
  prefixToName.STID7 = 'Stigmasterol'; // usually delta 7-stigmasterol
  prefixToName.CAMD5 = 'Campesterol';
  prefixToName.SITSTR = 'Sitosterol';
  prefixToName.TOCPHA = 'Alpha-tocopherol';
  prefixToName.TOCTRA = 'Alpha-tocotrienol';
  prefixToName.TOCPHB = 'Beta-tocopherol';
  prefixToName.TOCTRB = 'Beta-tocotrienol';
  prefixToName.TOCPHD = 'Delta-tocopherol';
  prefixToName.TOCTRD = 'Delta-tocotrienol';
  prefixToName.TOCPHG = 'Gamma-tocopherol';
  prefixToName.TOCTRG = 'Gamma-tocotrienol';
  // Other
  prefixToName.CAFFN = 'Caffeine';
  prefixToName.CHOLE = 'Cholesterol';

  return prefixToName[prefix] || null;
}

function portionToValue(portion) {
  /**
   * Attempt to convert a string-based portion to a numerical value from
   * a given look-up table.
   */
  const portions = {};
  portions.tsp = 0.4;
  portions.cup = 0.00;
  portions.dsp = 1;
  portions.handful = 40;
  // ....
  // ....
  return portions[portion];
}
function prefixToUnit(prefix) {
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
