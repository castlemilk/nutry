export function searchQuery(searchString) {
  return {
    bool: {
      should: [{
        match_phrase_prefix: {
          name: {
            query: searchString,
            max_expansions: 10,
            slop: 10,
          },
        },
      },
      {
        match: {
          name: {
            query: searchString,
            fuzziness: 'AUTO',
            operator: 'and',
            prefix_length: 1,
          },
        },
      }],
    },
  };
}
export function profilerSearchQuery(searchString) {
  return {
    bool: {
      boost: 0.001,
      should: [{
        match_phrase_prefix: {
          name: {
            query: searchString,
            max_expansions: 50,
            slop: 50,
          },
        },
      },
      {
        match: {
          name: {
            query: searchString,
            fuzziness: 'AUTO',
            operator: 'and',
            prefix_length: 1,
          },
        },
      }],
    },
  };
}
export function profilerFunctionQuery(field, factor) {
  return {
    field_value_factor: {
      field,
      factor,
      missing: 1,
    },
  };
}
export function profilerDecayFunctionQuery(field, scale) {
  const gaussPayload = {
    gauss: {},
  };
  gaussPayload.gauss[field] = {
    origin: scale,
    scale: 200,
  };
  // const linearPayload = {
  //   linear: {},
  // };
  // linearPayload.linear[field] = {
  //   origin: scale,
  //   scale: 100,
  // };
  // const expPayload = {
  //   exp: {},
  // };
  // expPayload.exp[field] = {
  //   origin: scale,
  //   scale: 50,
  // };
  return gaussPayload;
}

/**
 * [matchField description]
 *   {
 *     "size":1,
 *     "query":{
 *      "match": {
 *         "SN": "02049"
 *      }
 *    }
 *  }
 * @param  {[type]} SN [serialNumber]
 * @return {[type]}    [query body]
 */
export function matchField(serialNumber) {
  return {
    match: {
      SN: serialNumber,
    },
  };
}
