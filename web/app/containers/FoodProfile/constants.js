/*
 *
 * FoodProfile constants
 *
 */
import { Map, List } from 'immutable';
const prefix = (name) => `app/FoodProfile/${name}`;

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
export const SUMMARY_IDS = [
  {
    prefix: 'ENERC',
    type: PARENT_ROW,
    selected: false,
  },
  {
    prefix: 'ENERC_KCAL',
    type: PARENT_NONAME_ROW,
    selected: false,
  },
  {
    prefix: 'CHOCDF',
    type: PARENT_ROW,
    selected: false,
  },
  {
    prefix: 'SUGAR',
    type: PARENT_ROW,
    selected: false,
  },
  {
    prefix: 'FIBTG',
    type: PARENT_ROW,
    selected: false,
  },
  {
    prefix: 'PROCNT',
    type: PARENT_ROW,
    selected: false,
  },
  {
    prefix: 'FAT',
    type: PARENT_ROW,
    selected: false,
  },
  {
    prefix: 'NA',
    type: PARENT_ROW,
    selected: false,
  },
  {
    prefix: 'K',
    type: PARENT_ROW,
    selected: false,
  },
  {
    prefix: 'VITC',
    type: PARENT_ROW,
    selected: false,
  },
  {
    prefix: 'VITD',
    type: PARENT_ROW,
    selected: false,
  },
  {
    prefix: 'WATER',
    type: PARENT_ROW,
    selected: false,
  },
];
export const DETAILED_IDS = [
  // energy
  'ENERC', 'ENERC_KCAL',
  // fats
  'FAT', 'FASAT', 'FAMS', 'FAPU', 'FATRN', 'LCW3TOTAL',
  // carbohydrates
  'CHOCDF', 'FIBTG', 'SUGAR', 'GLUS', 'MALS', 'FRUS', 'LACS', 'GALS',
  // proteins
  'PROCNT', 'TRP', 'THR', 'ILE', 'LEU', 'LYS', 'MET', 'CYS', 'PHE', 'TYR', 'VAL',
  'ARG', 'HISTN', 'ALA', 'ASP', 'GLU', 'PRO', 'SER', 'HYP',
  // minerals
  'CA', 'FE', 'MG', 'P', 'K', 'NA', 'ZN', 'CU', 'MN', 'FLD',
  // vitamins
  'VITC', 'VITA_IU', 'RETOL', 'VITA_RAE', 'CARTA', 'CARTB', 'CRYPX', 'LYCPN',
  'LUT+ZEA', 'VITD', 'TOCPHA', 'TOCPHB', 'TOCPHD', 'VITK', 'THIA', 'NIA', 'SE',
  'FOL', 'FOLFD', 'FOLAC', 'FOLDFE', 'VITB6A', 'CHOLN', 'BETN',
  // basics
  'WATER',
];
export const DETAILED_SECTIONS = {
  energy: {
    headerName: 'Energy',
    items: [
      {
        prefix: 'ENERC',
        type: PARENT_ROW,
        selected: false,
      }, {
        prefix: 'ENERC_KCAL',
        type: PARENT_NONAME_ROW,
        selected: false,
      }],
  },
  fat: {
    headerName: 'Fat & Fatty Acids',
    items: [
      {
        prefix: 'FAT',
        type: PARENT_ROW,
        selected: false,
      }, {
        prefix: 'FASAT',
        type: CHILD_ROW,
        selected: false,
      }, {
        prefix: 'FAMS',
        type: CHILD_ROW,
        selected: false,
      }, {
        prefix: 'FAPU',
        type: CHILD_ROW,
        selected: false,
      }, {
        prefix: 'FATRN',
        type: CHILD_ROW,
        selected: false,
      }, {
        prefix: 'LCW3TOTAL',
        type: PARENT_ROW,
        selected: false,
      }],
  },
  carbohydrates: {
    headerName: 'Carbohydrates',
    items: [
      {
        prefix: 'CHOCDF',
        type: PARENT_ROW,
        selected: false,
      },
      {
        prefix: 'FIBTG',
        type: CHILD_ROW,
        selected: false,
      },
      {
        prefix: 'SUGAR',
        type: CHILD_ROW,
        selected: false,
      },
      {
        prefix: 'GLUS',
        type: CHILD2_ROW,
        selected: false,
      },
      {
        prefix: 'SUCS',
        type: CHILD2_ROW,
        selected: false,
      },
      {
        prefix: 'MALS',
        type: CHILD2_ROW,
        selected: false,
      },
      {
        prefix: 'FRUS',
        type: CHILD2_ROW,
        selected: false,
      },
      {
        prefix: 'LACS',
        type: CHILD2_ROW,
        selected: false,
      },
      {
        prefix: 'GALS',
        type: CHILD2_ROW,
        selected: false,
      },
    ],
  },
  protein: {
    headerName: 'Proteins',
    items: [
      {
        prefix: 'PROCNT',
        type: PARENT_ROW,
        selected: false,
      },
      {
        prefix: 'TRP',
        type: CHILD_ROW,
        selected: false,
      },
      {
        prefix: 'THR',
        type: CHILD_ROW,
        selected: false,
      },
      {
        prefix: 'ILE',
        type: CHILD_ROW,
        selected: false,
      },
      {
        prefix: 'LEU',
        type: CHILD_ROW,
        selected: false,
      },
      {
        prefix: 'LYS',
        type: CHILD_ROW,
        selected: false,
      },
      {
        prefix: 'MET',
        type: CHILD_ROW,
        selected: false,
      },
      {
        prefix: 'CYS',
        type: CHILD_ROW,
        selected: false,
      },
      {
        prefix: 'PHE',
        type: CHILD_ROW,
        selected: false,
      },
      {
        prefix: 'TYR',
        type: CHILD_ROW,
        selected: false,
      },
      {
        prefix: 'VAL',
        type: CHILD_ROW,
        selected: false,
      },
      {
        prefix: 'ARG',
        type: CHILD_ROW,
        selected: false,
      },
      {
        prefix: 'HISTN',
        type: CHILD_ROW,
        selected: false,
      },
      {
        prefix: 'ALA',
        type: CHILD_ROW,
        selected: false,
      },
      {
        prefix: 'ASP',
        type: CHILD_ROW,
        selected: false,
      },
      {
        prefix: 'GLU',
        type: CHILD_ROW,
        selected: false,
      },
      {
        prefix: 'PRO',
        type: CHILD_ROW,
        selected: false,
      },
      {
        prefix: 'SER',
        type: CHILD_ROW,
        selected: false,
      },
      {
        prefix: 'HYP',
        type: CHILD_ROW,
        selected: false,
      },
    ],
  },
  minerals: {
    headerName: 'Minerals',
    items: [
      {
        prefix: 'CA',
        type: PARENT_ROW,
        selected: false,
      },
      {
        prefix: 'FE',
        type: PARENT_ROW,
        selected: false,
      },
      {
        prefix: 'MG',
        type: PARENT_ROW,
        selected: false,
      },
      {
        prefix: 'P',
        type: PARENT_ROW,
        selected: false,
      },
      {
        prefix: 'K',
        type: PARENT_ROW,
        selected: false,
      },
      {
        prefix: 'NA',
        type: PARENT_ROW,
        selected: false,
      },
      {
        prefix: 'ZN',
        type: PARENT_ROW,
        selected: false,
      },
      {
        prefix: 'CU',
        type: PARENT_ROW,
        selected: false,
      },
      {
        prefix: 'MN',
        type: PARENT_ROW,
        selected: false,
      },
      {
        prefix: 'SE',
        type: PARENT_ROW,
        selected: false,
      },
      {
        prefix: 'FLD',
        type: PARENT_ROW,
        selected: false,
      },
    ],
  },
  vitamins: {
    headerName: 'Vitamins',
    items: [
      {
        prefix: 'VITC',
        type: PARENT_ROW,
        selected: false,
      },
      {
        prefix: 'VITA_IU',
        type: CHILD_ROW,
        selected: false,
      },
      {
        prefix: 'RETOL',
        type: CHILD_ROW,
        selected: false,
      },
      {
        prefix: 'VITA_RAE',
        type: CHILD_ROW,
        selected: false,
      },
      {
        prefix: 'CARTA',
        type: CHILD_ROW,
        selected: false,
      },
      {
        prefix: 'CARTB',
        type: CHILD_ROW,
        selected: false,
      },
      {
        prefix: 'CRYPX',
        type: CHILD_ROW,
        selected: false,
      },
      {
        prefix: 'LYCPN',
        type: CHILD_ROW,
        selected: false,
      },
      {
        prefix: 'LUT+ZEA',
        type: CHILD_ROW,
        selected: false,
      },
      {
        prefix: 'VITD',
        type: PARENT_ROW,
        selected: false,
      },
      {
        prefix: 'TOCPHA',
        type: PARENT_ROW,
        selected: false,
      },
      {
        prefix: 'TOCPHB',
        type: CHILD_ROW,
        selected: false,
      },
      {
        prefix: 'TOCPHD',
        type: CHILD_ROW,
        selected: false,
      },
      {
        prefix: 'VITK',
        type: PARENT_ROW,
        selected: false,
      },
      {
        prefix: 'THIA',
        type: PARENT_ROW,
        selected: false,
      },
      {
        prefix: 'NIA',
        type: PARENT_ROW,
        selected: false,
      },
      {
        prefix: 'SE',
        type: PARENT_ROW,
        selected: false,
      },
      {
        prefix: 'FOL',
        type: PARENT_ROW,
        selected: false,
      },
      {
        prefix: 'FOLFD',
        type: PARENT_ROW,
        selected: false,
      },
      {
        prefix: 'FOLAC',
        type: PARENT_ROW,
        selected: false,
      },
      {
        prefix: 'FOLDFE',
        type: PARENT_ROW,
        selected: false,
      },
      {
        prefix: 'VITB6A',
        type: PARENT_ROW,
        selected: false,
      },
      {
        prefix: 'CHOLN',
        type: PARENT_ROW,
        selected: false,
      },
      {
        prefix: 'BETN',
        type: PARENT_ROW,
        selected: false,
      },
    ],
  },
};
export const FILTERS = {
  summary: [
    'CHOCDF',
    'SUGAR',
    'FIBTG',
    'PROCNT',
    'FAT',
    'WATER',
  ],
  detailed: [
    'CHOCDF',
    'SUGAR',
    'FIBTG',
    'PROCNT',
    'FAT',
    'WATER',
  ],
};
export const INITIAL_STATE = {
  loading: true,
  serialNumber: false,
  profileHeader: {},
  error: false,
  source: false,
  nutrients: {
    byId: {},
    bySection: Map(DETAILED_SECTIONS),
    bySummaryIds: SUMMARY_IDS,
    byDetailedIds: DETAILED_IDS,
    bySummaryPie: List([]),
    byDetailedPie: List([]),
  },
  tabSelected: 'summary',
  idSelected: false,
  nutrientSelected: '',
  portionSelected: { amt: 1,
    className: 'per100g',
    g: 100,
    label: 'per 100g',
    unit: 'per 100g',
    value: 100,
  },
  portionsAvailable: [],
  ageGroupSelected: { value: 'AM19', label: 'Adult Male (19-30)', className: 'am-19' },
};
