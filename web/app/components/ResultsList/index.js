/**
*
* Results
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import SearchResultCard from 'components/SearchResultCard';
import NoResultsFound from 'components/NoResultsFound';
// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

function ResultsList(props) { /* eslint no-underscore-dangle: ["error", { "allow": ["_source"] }]*/
  const resultsView = props.results ? props.results.map((result) => {
    const { name, SN, usage, group } = result._source;
    const searchResultCardProps = {
      SN,
      name,
      group,
      usage,
    };
    return <SearchResultCard {...searchResultCardProps} key={SN} />;
  }) : <NoResultsFound />;
  return (
    <div>
      {resultsView}
    </div>
  );
}

ResultsList.propTypes = {
  results: PropTypes.array.isRequired,

};

export default ResultsList;
