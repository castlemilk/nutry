export const getFoodProfileMockSuccess = {
  status: 200,
  statusText: 'OK',
  response: {
    name: 'Fresh thyme',
    group: 'Spices and Herbs',
    SN: '02049',
    alias: [],
    allergen: [],
    nutrients: {},
    portions: [],
    tags: [],
    usage: [],
  },
};

export const getMultiFoodProfileMockSuccess = [
  {
    status: 200,
    statusText: 'OK',
    response: {
      name: 'item1',
      group: 'group1',
      SN: '00000',
      alias: [],
      allergen: [],
      nutrients: {},
      portions: [],
      tags: [],
      usage: [],
    },
  },
  {
    status: 200,
    statusText: 'OK',
    response: {
      name: 'item2',
      group: 'group2',
      SN: '00001',
      alias: [],
      allergen: [],
      nutrients: {},
      portions: [],
      tags: [],
      usage: [],
    },
  },
];
