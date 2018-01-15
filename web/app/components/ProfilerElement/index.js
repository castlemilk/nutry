/**
*
* ProfilerElement
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Slider, Row, Col } from 'antd';
import Select from 'react-select';
// import styled from 'styled-components';
import ProfilerDeleteElement from 'components/ProfilerDeleteElement';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import ProfilerElementWrapper from './ProfilerElementWrapper';

/**
 * NUTRIENTS - Array of nutrients values usable in the profiler.
 * the value should correspond to a valid field in the nutritional database
 * TODO: move this data to somewhere more appropriate as its kinda a global makeSelectSearchString
 * @type {Array}
 *
 */
const NUTRIENTS = [
  { value: 'CHOCDF', label: 'Carbohydrates', className: 'elements-carbohydrates'},
  { value: 'FAT', label: 'Fat', className: 'elements-fat'},
  { value: 'PROCNT', label: 'Protein', className: 'elements-protein'},
  { value: 'WATER', label: 'Water', className: 'elements-water'},
  { value: 'VITC', label: 'Vitamin C', className: 'elements-vitamin-c'},
  { value: 'SUGAR', label: 'Sugar', className: 'elements-sugar'},
  { value: 'NA', adjustment_factor: 0.1, label: 'Salt (Sodium)', className: 'elements-salt'},
]

export class ProfilerElement extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static displayName: 'ProfilerElement'
  static propTypes: {
    id: PropTypes.string.isRequired,
    scale: PropTypes.number.isRequired,
    nutrient: PropTypes.string,
    onNutrientChange: PropTypes.func.isRequired,
    onScaleChange: PropTypes.func.isRequired,
    onElementRemove: PropTypes.func.isRequired,

  };

  clearValue (e) {
		this.select.setInputValue('');
	}

  render() {
  // console.log(`profilerElement:${this.props.nutrient}`)
  const { nutrient, scale, id } = this.props;
  const body = {
    nutrient,
    scale
  }
  // console.log(`profilerElement:body`)
  // console.log(body)
  return (
    <ProfilerElementWrapper>
        <div className="profiler-element-wrapper">
        <div className="profiler-element-text">
        <Select
					id={id}
          ref={(ref) => { this.select = ref; }}
					onBlurResetsInput={false}
					onSelectResetsInput={false}
					autoFocus
					options={NUTRIENTS}
					clearable={true}
					name={`selected-nutrient-${id}`}
					value={this.props.nutrient}
					onChange={(nutrient) => this.props.onNutrientChange(nutrient, id)}
					searchable={true}
				/>
        </div>
        <div className="profiler-element-slider" >
          <Slider onChange={(scale) => this.props.onScaleChange(scale, id) } defaultValue={Math.round(100 * scale)} />
        </div>
        <div className="profiler-element-remove-wrapper" >
          <ProfilerDeleteElement onClick={() => this.props.onElementRemove(id)}/>
        </div>
        </div>

    </ProfilerElementWrapper>
  );
}
}

// ProfilerElement.propTypes = {
//   id: PropTypes.string.isRequired,
//   scale: PropTypes.number.isRequired,
//   nutrient: PropTypes.string,
//   onNutrientChange: PropTypes.func.isRequired,
//
// };

export default ProfilerElement;
