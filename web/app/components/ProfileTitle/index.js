/**
*
* ProfileTitle
*
*/

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';
import ProfileTitleWrapper from './ProfileTitleWrapper';

function ProfileTitle(props) {
  const { profileHeader } = props;
  return (
    <ProfileTitleWrapper>
      <div className="profile-title">
        <h1 className="profile-title-name" >{profileHeader.name}</h1>
        <h2 className="profile-title-group" >{profileHeader.group}</h2>
        <div className="profile-title-usage-wrapper">
          <h3 className="profile-title-usage-header">Example Usage: </h3>
          <h3 className="profile-title-usage-values">{profileHeader.usage.join(', ')}</h3>
        </div>
      </div>
    </ProfileTitleWrapper>
  );
}

ProfileTitle.propTypes = {
  profileHeader: PropTypes.object.isRequired,
};

export default ProfileTitle;
