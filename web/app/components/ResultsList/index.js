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
  const { onProfileSelected } = props;
  const resultsView = props.results ? props.results.map((result) => {
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
