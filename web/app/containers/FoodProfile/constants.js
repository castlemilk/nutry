/*
 *
 * FoodProfile constants
 *
 */

const prefix = (name) => `app/FoodProfile/${name}`;
export const DEFAULT_ACTION = prefix('DEFAULT_ACTION');

export const ON_BACK = prefix('ON_BACK');

export const GET_PROFILE = prefix('GET_PROFILE');
export const GET_PROFILE_SUCCESS = prefix('GET_PROFILE_SUCCESS');
export const GET_PROFILE_FAILURE = prefix('GET_PROFILE_FAILURE');

export const TAB_CHANGED = prefix('TAB_CHANGED');
export const PORTION_CHANGED = prefix('PORTION_CHANGED');
export const NUTRIENT_SELECTED = prefix('NUTRIENT_SELECTED');
export const AGE_GROUP_CHANGED = prefix('AGE_GROUP_CHANGED');

export const HEADER = 'HEADER';
export const PARENT_ROW = 'PARENTR_ROW';
export const PARENT_NONAME_ROW = 'PARENT_NONAME_ROW';
export const CHILD_ROW = 'CHILD_ROW';
export const CHILD2_ROW = 'CHILD2_ROW';
export const SUMMARY_IDS = ['ENERC', 'ENER_KCAL', 'SUAGAR', 'FIBTG', 'PROCNT', 'FAT', 'NA', 'K', 'VITC', 'VITD', 'CHOCDF'];
export const DETAILED_IDS = [
  // energy
  'ENERC', 'ENERC_KJ',
  // fats
  'FAT', 'FATSAT', 'FAMS', 'FAPU', 'FATRN', 'LCW3TOTAL',
  // carbohydrates
  'CHOCDF', 'FIBTG', 'SUGAR', 'GLUS', 'MALS', 'FRUS', 'LACS', 'GALS',
  // proteins
  'PROCNT', 'TRP', 'THR', 'ILE', 'LEU', 'LYS', 'MET', 'CYS', 'PHE', 'TYR', 'VAL',
  'ARG', 'HISTN', 'ALA', 'ASP', 'GLU', 'PRO', 'SER', 'HYP',
  // minerals
  'CA', 'FE', 'MG', 'P', 'K', 'NA', 'ZN', 'CU', 'MN', 'SE', 'FLD',
  // vitamins
  'VITC', 'VITA_IU', 'RETOL', 'VITA_RAE', 'CARTA', 'CARTB', 'CRYPX', 'LYCPN',
  'LUT+ZEA', 'VITD', 'TOCPHA', 'TOCPHB', 'TOCPHD', 'VITK', 'THIA', 'NIA', 'SE',
  'FOL', 'FOLFD', 'FOLAC', 'FOLDFE', 'VITB6A', 'CHOLN', 'BETN'
]






];
export const DETAILED_SECTIONS = {
  energy: [
    {
      id: 'ENERC',
      type: PARENT_ROW,
    }, {
      id: 'ENERC_KJ',
      type: PARENT_NONAME_ROW,
    }],
  fat: [
    {
      id: 'FAT',
      type: PARENT_ROW,
    }, {
      id: 'FATSAT',
      type: CHILD_ROW,
    }, {
      id: 'FAMS',
      type: CHILD_ROW,
    }, {
      id: 'FAPU',
      type: CHILD_ROW,
    }, {
      id: 'FATRN',
      type: CHILD_ROW,
    }, {
      id: 'LCW3TOTAL',
      type: PARENT_ROW,
    }],
  carbohydrates: [
    {
      id: 'CHOCDF',
      type: PARENT_ROW,
    },
    {
      id: 'FIBTG',
      type: CHILD_ROW,
    },
    {
      id: 'SUGAR',
      type: CHILD_ROW,
    },
    {
      id: 'GLUS',
      type: CHILD2_ROW,
    },
    {
      id: 'SUCS',
      type: CHILD2_ROW,
    },
    {
      id: 'MALS',
      type: CHILD2_ROW,
    },
    {
      id: 'FRUS',
      type: CHILD2_ROW,
    },
    {
      id: 'LACS',
      type: CHILD2_ROW,
    },
    {
      id: 'GALS',
      type: CHILD2_ROW,
    },
  ],
  protein: [
    {
      id: 'PROCNT',
      type: PARENT_ROW,
    },
    {
      id: 'TRP',
      type: CHILD_ROW,
    },
    {
      id: 'THR',
      type: CHILD_ROW,
    },
    {
      id: 'ILE',
      type: CHILD_ROW,
    },
    {
      id: 'LEU',
      type: CHILD_ROW,
    },
    {
      id: 'LYS',
      type: CHILD_ROW,
    },
    {
      id: 'MET',
      type: CHILD_ROW,
    },
    {
      id: 'CYS',
      type: CHILD_ROW,
    },
    {
      id: 'PHE',
      type: CHILD_ROW,
    },
    {
      id: 'TYR',
      type: CHILD_ROW,
    },
    {
      id: 'VAL',
      type: CHILD_ROW,
    },
    {
      id: 'ARG',
      type: CHILD_ROW,
    },
    {
      id: 'HISTN',
      type: CHILD_ROW,
    },
    {
      id: 'ALA',
      type: CHILD_ROW,
    },
    {
      id: 'ASP',
      type: CHILD_ROW,
    },
    {
      id: 'GLU',
      type: CHILD_ROW,
    },
    {
      id: 'PRO',
      type: CHILD_ROW,
    },
    {
      id: 'SER',
      type: CHILD_ROW,
    },
    {
      id: 'HYP',
      type: CHILD_ROW,
    },
  ],
  minerals: [
    {
      id: 'CA',
      type: PARENT_ROW,
    },
    {
      id: 'FE',
      type: PARENT_ROW,
    },
    {
      id: 'MG',
      type: PARENT_ROW,
    },
    {
      id: 'P',
      type: PARENT_ROW,
    },
    {
      id: 'K',
      type: PARENT_ROW,
    },
    {
      id: 'NA',
      type: PARENT_ROW,
    },
    {
      id: 'ZN',
      type: PARENT_ROW,
    },
    {
      id: 'CU',
      type: PARENT_ROW,
    },
    {
      id: 'MN',
      type: PARENT_ROW,
    },
    {
      id: 'SE',
      type: PARENT_ROW,
    },
    {
      id: 'FLD',
      type: PARENT_ROW,
    },
  ],
  vitamins: [
    {
      id: 'VITC',
      type: PARENT_ROW,
    },
    {
      id: 'VITA_IU',
      type: CHILD_ROW,
    },
    {
      id: 'VITA_IU',
      type: CHILD_ROW,
    },
    {
      id: 'RETOL',
      type: CHILD_ROW,
    },
    {
      id: 'VITA_RAE',
      type: CHILD_ROW,
    },
    {
      id: 'CARTA',
      type: CHILD_ROW,
    },
    {
      id: 'CARTB',
      type: CHILD_ROW,
    },
    {
      id: 'CRYPX',
      type: CHILD_ROW,
    },
    {
      id: 'LYCPN',
      type: CHILD_ROW,
    },
    {
      id: 'LUT+ZEA',
      type: CHILD_ROW,
    },
    {
      id: 'VITD',
      type: PARENT_ROW,
    },
    {
      id: 'TOCPHA',
      type: PARENT_ROW,
    },
    {
      id: 'TOCPHB',
      type: CHILD_ROW,
    },
    {
      id: 'TOCPHD',
      type: CHILD_ROW,
    },
    {
      id: 'VITK',
      type: PARENT_ROW,
    },
    {
      id: 'THIA',
      type: PARENT_ROW,
    },
    {
      id: 'NIA',
      type: PARENT_ROW,
    },
    {
      id: 'SE',
      type: PARENT_ROW,
    },
    {
      id: 'FOL',
      type: PARENT_ROW,
    },
    {
      id: 'FOLFD',
      type: PARENT_ROW,
    },
    {
      id: 'FOLAC',
      type: PARENT_ROW,
    },
    {
      id: 'FOLDFE',
      type: PARENT_ROW,
    },
    {
      id: 'VITB6A',
      type: PARENT_ROW,
    },
    {
      id: 'CHOLN',
      type: PARENT_ROW,
    },
    {
      id: 'BETN',
      type: PARENT_ROW,
    },
  ],
};
