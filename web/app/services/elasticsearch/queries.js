export function searchQuery(searchString) {
  return {
    bool: {
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
export function profilerSearchQuery(searchString) {
  return {
    bool: {
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
              missing: 1
          }
  }
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
export function matchField(SN) {
  return {
    match: {
      SN,
    }
  }
}
