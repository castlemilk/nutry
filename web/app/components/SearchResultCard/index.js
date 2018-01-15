/**
*
* SearchResultCard
*
*/

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';
import Wrapper from './Wrapper';

function SearchResultCard(props) {
  const nameView = <div className="name" >{props.name}</div>;
  const groupView = <div className="group" ><b>Food Group:</b>&nbsp;&nbsp;{props.group}</div>;
  const usageView = props.usage ? <div className="usage" ><b>Example Usage:</b>&nbsp;&nbsp;{props.usage.join(', ')}</div> : null;
  return (
    <Wrapper>
      <div className="card">
        {nameView}
        <div className="separator"></div>
        {groupView}
        {usageView}
      </div>
    </Wrapper>
  );
}

SearchResultCard.propTypes = {
  name: PropTypes.string.isRequired,
  group: PropTypes.string.isRequired,
  usage: PropTypes.array,
  SN: PropTypes.string.isRequired,
};

export default SearchResultCard;
