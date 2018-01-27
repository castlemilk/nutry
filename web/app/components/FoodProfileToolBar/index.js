/**
*
* FoodProfileToolBar
*
*/

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import Select from 'react-select';
import { FormattedMessage } from 'react-intl';
import LoadingContent from 'components/LoadingContent';
import messages from './messages';
import FoodProfileToolBarWrapper from './FoodProfileToolBarWrapper';
const AGES = [
  { value: 'I1', label: 'Infant (0m-6m)', className: 'infant1' },
  { value: 'I2', label: 'Infant (7m-12m)', className: 'infant2' },
  { value: 'C1', label: 'Children (1-3)', className: 'children1' },
  { value: 'C2', label: 'Children (4-8)', className: 'children1' },
  { value: 'B1', label: 'Boys (9-13)', className: 'boys1' },
  { value: 'B2', label: 'Boys (14-16)', className: 'boys2' },
  { value: 'G1', label: 'Girls (9-13)', className: 'girls1' },
  { value: 'G2', label: 'Girls (14-16)', className: 'girls2' },
  { value: 'AM19', label: 'Adult Male (19-30)', className: 'am-19' },
  { value: 'AM31', label: 'Adult Male (31-50)', className: 'am-31' },
  { value: 'AM51', label: 'Adult Male (51-70)', className: 'am-51' },
  { value: 'AM71', label: 'Adult Male (71-)', className: 'am-71' },
  { value: 'AF19', label: 'Adult Female (19-30)', className: 'af-19' },
  { value: 'AF31', label: 'Adult Female (31-50)', className: 'af-31' },
  { value: 'AF51', label: 'Adult Female (51-70)', className: 'af-51' },
  { value: 'AF71', label: 'Adult Female (71-)', className: 'af-71' },
  { value: 'P1', label: 'Pregnant (14-18)', className: 'preg-14' },
  { value: 'P2', label: 'Pregnant (19-31)', className: 'preg-19' },
  { value: 'P3', label: 'Pregnant (31-50)', className: 'preg-31' },
  { value: 'L1', label: 'Lactation (14-18)', className: 'lac-14' },
  { value: 'L2', label: 'Lactation (19-30)', className: 'lac-19' },
  { value: 'L3', label: 'Lactation (31-50)', className: 'lac-31' },
];

function FoodProfileToolBar(props) {
  const { ageGroupSelected, portionSelected, portions, loading } = props;
  const { onAgeGroupChanged, onPortionChanged } = props;
  return (
    <FoodProfileToolBarWrapper>
      {
        loading ? <LoadingContent width={150} height={30} speed={1.5} /> :
        <div className="age-group-description" >
          <FormattedMessage {...messages.ageGroup} />
        </div>
      }
      {
        loading ? <LoadingContent width={200} height={30} speed={1.5} /> : (
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
              value={ageGroupSelected.toJS()}
              onChange={(a) => onAgeGroupChanged(a)}
              searchable
            />
          </div>)
      }
      {
        loading ? <LoadingContent width={150} height={30} speed={1.5} /> :
        <div className="portion-description" >
          <FormattedMessage {...messages.portion} />
        </div>
      }
      {loading ? <LoadingContent width={200} height={30} speed={1.5} /> : (
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
        </div>)
    }
    </FoodProfileToolBarWrapper>
  );
}

FoodProfileToolBar.propTypes = {
  ageGroupSelected: PropTypes.object,
  portions: PropTypes.object,
  portionSelected: PropTypes.object,
  onAgeGroupChanged: PropTypes.func.isRequired,
  onPortionChanged: PropTypes.func.isRequired,
  loading: PropTypes.bool,

};

export default FoodProfileToolBar;
