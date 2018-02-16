/**
*
* ProfileTitle
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';
import LoadingContent from 'components/LoadingContent';
import FoodProfileTitleWrapper from './FoodProfileTitleWrapper';

function FoodProfileTitle(props) {
  const { profileHeader, loading } = props;

  return (
    <FoodProfileTitleWrapper>
      <div className="profile-title">
        <div>
          { loading ? <LoadingContent width={200} height={55} speed={1.5} /> : <h1 className="profile-title-name" >{profileHeader.name}</h1>}
        </div>
        <div>
          { loading ? <LoadingContent width={400} height={23} speed={1.5} /> : <h2 className="profile-title-group" >{profileHeader.group}</h2>}
        </div>


        { loading ? <LoadingContent width={700} height={23} speed={1.5} /> : (<div className="profile-title-usage-wrapper">
          <h3 className="profile-title-usage-header">Example Usage: </h3>
          <h3 className="profile-title-usage-values">{profileHeader.usage.join(', ')}</h3>
        </div>
        )}

      </div>
    </FoodProfileTitleWrapper>
  );
}

FoodProfileTitle.propTypes = {
  profileHeader: PropTypes.object.isRequired,
  loading: PropTypes.bool,
};

export default withRouter(FoodProfileTitle);
