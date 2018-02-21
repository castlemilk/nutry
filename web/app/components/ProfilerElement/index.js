/**
*
* ProfilerElement
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Slider } from 'antd';
import Select from 'react-select';
import ProfilerDeleteElement from 'components/ProfilerDeleteElement';
import ProfilerElementWrapper from './ProfilerElementWrapper';
import { NUTRIENTS } from './constants';
/**
 * NUTRIENTS - Array of nutrients values usable in the profiler.
 * the value should correspond to a valid field in the nutritional database
 * TODO: move this data to somewhere more appropriate as its kinda a global makeSelectSearchString
 * @type {Array}
 *
 */


export class ProfilerElement extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { scale, id } = this.props;
    return (
      <ProfilerElementWrapper>
        <div className="profiler-element-wrapper">
          <div className="profiler-element-text">
            <Select
              id={id}
              onBlurResetsInput={false}
              onSelectResetsInput={false}
              autoFocus
              options={NUTRIENTS}
              clearable
              name={`selected-nutrient-${id}`}
              value={this.props.nutrient}
              onChange={(n) => this.props.onNutrientChange(n, id)}
              searchable
            />
          </div>
          <div className="profiler-element-slider" >
            <Slider onChange={(s) => this.props.onScaleChange(s, id)} defaultValue={Math.round(100 * scale)} />
          </div>
          <div className="profiler-element-remove-wrapper" >
            <ProfilerDeleteElement onClick={() => this.props.onElementRemove(id)} />
          </div>
        </div>

      </ProfilerElementWrapper>
    );
  }
}

ProfilerElement.propTypes = {
  id: PropTypes.string.isRequired,
  scale: PropTypes.number.isRequired,
  nutrient: PropTypes.object,
  onNutrientChange: PropTypes.func.isRequired,
  onScaleChange: PropTypes.func,
  onElementRemove: PropTypes.func,

};

export default ProfilerElement;
