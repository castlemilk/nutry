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
export const getFoodProfileMockSuccessFull = {
  status: 200,
  statusText: 'OK',
  response: {
    name: 'Fresh thyme',
    group: 'Spices and Herbs',
    SN: '02049',
    alias: [],
    allergen: [],
    nutrients: {
      CHOCDF: {
        name: 'Carbohydrate, by difference',
        units: 'g',
        value: 1 },
      ALC: {
        name: 'Alcohol, ethyl',
        units: 'g',
        value: 2 },
      ARGN: {
        name: 'Arginine',
        units: 'g',
        value: 0.803 },
    },
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
