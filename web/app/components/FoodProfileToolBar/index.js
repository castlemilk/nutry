/**
*
* FoodProfileToolBar
* TODO: remove any .toJS() calls and implement the translation in a container/view layer
*/

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import Select from 'react-select';
import { FormattedMessage } from 'react-intl';
import LoadingContent from 'components/LoadingContent';
import messages from './messages';
import FoodProfileToolBarWrapper from './FoodProfileToolBarWrapper';
import { AGES } from './constants';


function FoodProfileToolBar(props) {
  const { ageGroupSelected, portionSelected, portions, loading } = props;
  const { onAgeGroupChanged, onPortionChanged } = props;
  return loading ? (
    <FoodProfileToolBarWrapper>
      <LoadingContent width={150} height={30} speed={1.5} />
      <LoadingContent width={200} height={30} speed={1.5} />
      <LoadingContent width={150} height={30} speed={1.5} />
      <LoadingContent width={200} height={30} speed={1.5} />
    </FoodProfileToolBarWrapper>
  ) :
  (
    <FoodProfileToolBarWrapper>
      <div className="age-group-description" >
        <FormattedMessage {...messages.ageGroup} />
      </div>
      <div className="age-group-wrapper" >
        <Select
          id="foodprofile-toolbar-select-agegroup"
          onBlurResetsInput={false}
          onSelectResetsInput={false}
          autoFocus={false}
          clearable={false}
          options={AGES}
          autosize={false}
          name="foodprofile-toolbar-select-agegroup"
          value={ageGroupSelected}
          onChange={(a) => onAgeGroupChanged(a)}
          searchable
        />
      </div>
      <div className="portion-description" >
        <FormattedMessage {...messages.portion} />
      </div>
      <div className="portion-wrapper" >
        <Select
          id="foodprofile-toolbar-select-portion"
          onBlurResetsInput={false}
          onSelectResetsInput={false}
          autoFocus={false}
          clearable={false}
          options={portions}
          autosize={false}
          name="foodprofile-toolbar-select-portion"
          value={portionSelected}
          onChange={(p) => onPortionChanged(p)}
          searchable
        />
      </div>
    </FoodProfileToolBarWrapper>
  );
}

FoodProfileToolBar.propTypes = {
  ageGroupSelected: PropTypes.object,
  portions: PropTypes.array,
  portionSelected: PropTypes.object,
  onAgeGroupChanged: PropTypes.func.isRequired,
  onPortionChanged: PropTypes.func.isRequired,
  loading: PropTypes.bool,

};

export default FoodProfileToolBar;
