// TODO: change this structure and naming to fixtures
export const getSearchPlainSuccess = {
  timed_out: false,
  took: 10,
  _shards: {
    failed: 0,
    successful: 5,
    total: 5,
  },
  hits: {
    total: 1,
    max_score: 10,
    hits: [
      {
        _id: 'AWF8pHZ9bw9zRJtz161q',
        _index: 'nutry-names',
        _score: 10,
        _source: {
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
      },
    ],
  },
};
export const getSearchParsedSuccess = {
  items: [
    {
      _id: 'AWF8pHZ9bw9zRJtz161q',
      _index: 'nutry-names',
      _score: 10,
      _source: {
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
    },
  ],
  max_score: 10,
  hits: 1,
};
export const getProfilerQueryRequest = {
  searchString: 'chocolate',
  elements: [
    {
      nutrient: { value: 'CHOCDF', label: 'Carbohydrates', className: 'elements-carbohydrates' },
      scale: 50,
    },
    {
      nutrient: { value: 'PROCNT', label: 'Protien', className: 'elements-protein' },
      scale: 50,
    },
  ],
};
export const getProfilerPlainSuccess = {
  timed_out: false,
  took: 10,
  _shards: {
    failed: 0,
    successful: 5,
    total: 5,
  },
  hits: {
    total: 1,
    max_score: 10,
    hits: [
      {
        _id: 'AWF8pHZ9bw9zRJtz161q',
        _index: 'nutry-names',
        _score: 10,
        _source: {
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
      },
    ],
  },
};
export const getProfilerParsedSuccess = {
  items: [
    {
      _id: 'AWF8pHZ9bw9zRJtz161q',
      _index: 'nutry-names',
      _score: 10,
      _source: {
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
    },
  ],
  max_score: 10,
  hits: 1,
};
export const getDocumentPlainSuccess = {
  timed_out: false,
  took: 10,
  _shards: {
    failed: 0,
    successful: 5,
    total: 5,
  },
  hits: {
    total: 1,
    max_score: 10,
    hits: [
      {
        _id: 'AWF8pHZ9bw9zRJtz161q',
        _index: 'nutry-names',
        _score: 10,
        _source: {
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
      },
    ],
  },
};
export const getDocumentParsedSuccess = {
  items: [
    {
      _id: 'AWF8pHZ9bw9zRJtz161q',
      _index: 'nutry-names',
      _score: 10,
      _source: {
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
    },
  ],
  max_score: 10,
  hits: 1,
};

export const searchQueryMock = {
  bool: {
    should: [{
      match_phrase_prefix: {
        name: {
          query: 'chocolate',
          max_expansions: 10,
          slop: 10,
        },
      },
    },
    {
      match: {
        name: {
          query: 'chocolate',
          fuzziness: 'AUTO',
          operator: 'and',
          prefix_length: 1,
        },
      },
    }],
  },
};
export const profilerQueryMock = {
  bool: {
    boost: 0.001,
    should: [{
      match_phrase_prefix: {
        name: {
          query: 'chocolate',
          max_expansions: 50,
          slop: 50,
        },
      },
    },
    {
      match: {
        name: {
          query: 'chocolate',
          fuzziness: 'AUTO',
          operator: 'and',
          prefix_length: 1,
        },
      },
    }],
  },
};
export const profilerFunctionQueryMock = {
  field_value_factor: {
    field: 'CHOCDF',
    factor: 10,
    missing: 1,
  },
};
export const profilerDecayFunctionQueryMock = {
  gauss: {
    CHOCDF: {
      origin: 10,
      scale: 200,
    },
  },
};
export const matchFieldMock = {
  match: {
    SN: '02049',
  },
};
