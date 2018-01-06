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
                // name : null,
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
