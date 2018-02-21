/**
*
* Results
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import SearchResultCard from 'components/SearchResultCard';
import NoResultsFound from 'components/NoResultsFound';

function ResultsList(props) { /* eslint no-underscore-dangle: ["error", { "allow": ["_source"] }]*/
  const { onProfileSelected, results } = props;
  const resultsView = results ? results.map((result) => {
    const profileInfo = result._source;
    const searchResultCardProps = {
      profileInfo,
    };
    return <SearchResultCard {...searchResultCardProps} key={profileInfo.SN} onClick={() => onProfileSelected(profileInfo)} />;
  }) : <NoResultsFound />;
  return (
    <div>
      {resultsView}
    </div>
  );
}

ResultsList.propTypes = {
  results: PropTypes.array.isRequired,
  onProfileSelected: PropTypes.func,

};

export default ResultsList;
