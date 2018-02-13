/**
*
* NutrientChildRow
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FaInfoCircle } from 'react-icons/lib/fa';
import { scaledValue } from 'lib/utils';
import {
  HEADER,
  PARENT_NONAME_ROW,
  PARENT_ROW,
  CHILD_ROW,
  CHILD2_ROW,
} from './constants';
// import { FormattedMessage } from 'react-intl';
// import messages from './messages';


export class NutrientRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: 0,
      safe: false,
    };
  }
  /**
   * Big rendering optimisation to prevent uneeded renders between tab changes
   * and item selection.
   * @param  {Object} nextProps
   * @return {Boolean}           [description]
   */
  shouldComponentUpdate(nextProps) {
    return nextProps.isSelected !== this.props.isSelected || nextProps.portion !== this.props.portion;
  }
  makeSafe() {
    this.setState({ safe: true });
  }
  safeHoverTransistion() {
    return setTimeout(() => this.makeSafe(), 1000);
  }
  handleMouseEnter(prefix, id) {
    this.setState({
      safe: false,
      selectedPrefix: prefix,
      safeTimer: this.safeHoverTransistion(),
      transitionTimeout: setTimeout(() => this.props.onHover(prefix, id), 50),
    });
  }
  handleMouseOut() {
    // cancel hover transition
    // if (prefix === this.state.selectedPrefix) {
    clearTimeout(this.state.transitionTimeout);
    // }
  }
  render() {
    /**
     * Nutrient Row which is a standard row within a category. Will have zero
     * indentation.
     * There are some nutrients which will be children of a parent nutrient and
     * will be depicted as children through indentations
     */
    const { onClick, nutrient, id, prefix, type, isSelected, portion, onInfoClick } = this.props;
    const name = nutrient.get('name');
    const units = nutrient.get('units');
    const value = scaledValue(nutrient.get('value'), portion.g) || (<span style={{ color: 'red' }}>{'~'}</span>);
    const childRow = type === CHILD_ROW;
    const child2Row = type === CHILD2_ROW;
    const parentRow = type === PARENT_ROW;
    const parentNoNameRow = type === PARENT_NONAME_ROW;
    const headerRow = type === HEADER;
    const hasName = (parentRow || child2Row || headerRow || childRow);
    const hasUnits = (childRow || child2Row || parentRow || parentNoNameRow);
    const hasValue = (childRow || child2Row || parentRow || parentNoNameRow);
    let indent = 5;
    let fontSize = 2;
    if (childRow) {
      indent = 15;
    } else if (child2Row) {
      indent = 20;
    } else if (parentRow) {
      indent = 5;
      fontSize = 2.2;
    } else if (headerRow) {
      fontSize = 2.2;
    }
    const Row = styled.div`
         display: block;
         position: relative;
         border-bottom: 1px solid #a79595;
         background-color: ${isSelected ? 'gray' : 'white'};
         transform: scale(${isSelected ? 1.1 : 1});
         transition-duration: 0.1s;
         z-index: ${isSelected ? 10 : 0};
     `;
    const RowName = styled.div`
      display: inline-block;
      overflow: hidden;
      width:57%;
      font-size: ${fontSize}vmin;
      font-family: 'Bitter', serif;

      .row-name-${type}-text {
        margin-left: ${indent}px;
      }
    `;
    const RowUnits = styled.div`
      display: inline-block;
      overflow: hidden;
      width:${isSelected ? 15 : 14}%;
      text-align: center;
      font-family: 'Droid Serif', serif;
    `;
    const RowValue = styled.div`
      display: inline-block;
      overflow: hidden;
      width: ${isSelected ? 17 : 25}%;
      text-align: center;
      font-family: 'Bitter', serif;
    `;
    const RowInfo = styled.div`
      display: inline-block;
      margin: auto;
      overflow: hidden;
      text-align: center;
      font-family: 'Bitter', serif;
      padding-right: 1%;

      .info-icon:hover {
        color: red;
        display: inline-block;
        text-align: center;
        margin: auto;
      }
    `;
    return (<Row className={`Section__${type}__Row__${id}`} onMouseLeave={() => this.handleMouseOut()} onMouseEnter={() => this.handleMouseEnter(prefix, id)} onClick={() => onClick(prefix, id)}>
      {hasName ? <RowName className={`Section__${type}__RowName__${id}`} ><span className="row-name-text" >{name}</span></RowName> : <RowName><span className="row-name-text" > </span></RowName> }
      {hasUnits ? <RowUnits className={`Section__${type}__RowUnits__${id}`} >{units}</RowUnits> : null }
      {hasValue ? <RowValue className={`Section__${type}__RowValue__${id}`} >{value}</RowValue> : null }
      {isSelected ? <RowInfo ><FaInfoCircle onClick={() => onInfoClick(prefix)} className="info-icon" /></RowInfo> : null}

    </Row>
    );
  }
}
NutrientRow.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  prefix: PropTypes.string.isRequired,
  nutrient: PropTypes.object,
  portion: PropTypes.object,
  isSelected: PropTypes.bool,
  onHover: PropTypes.func,
  onClick: PropTypes.func,
  onInfoClick: PropTypes.func,
};


export default NutrientRow;
