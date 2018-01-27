/**
*
* SearchResultCard
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import Wrapper from './Wrapper';

function SearchResultCard(props) {
  const { profileInfo } = props;
  const nameView = <div className="name" >{profileInfo.name}</div>;
  const groupView = <div className="group" ><b>Food Group:</b>&nbsp;&nbsp;{profileInfo.group}</div>;
  const usageView = profileInfo.usage ? <div className="usage" ><b>Example Usage:</b>&nbsp;&nbsp;{profileInfo.usage.join(', ')}</div> : null;
  return (
    <Wrapper>
      <div role="presentation" className="card" onClick={props.onClick}>
        {nameView}
        <div className="separator"></div>
        {groupView}
        {usageView}
      </div>
    </Wrapper>
  );
}

SearchResultCard.propTypes = {
  profileInfo: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default SearchResultCard;
