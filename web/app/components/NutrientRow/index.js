/**
*
* NutrientChildRow
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  HEADER,
  PARENT_NONAME_ROW,
  PARENT_ROW,
  CHILD_ROW,
  CHILD2_ROW,
} from './constants';
// import { FormattedMessage } from 'react-intl';
// import messages from './messages';


export default function NutrientRow(props) {
  /**
   * Nutrient Row which is a standard row within a category. Will have zero
   * indentation.
   * There are some nutrients which will be children of a parent nutrient and
   * will be depicted as children through indentations
   */
  const { name, units } = props.nutrient;
  const { onNutrientHover, onNutrientSelected, type, viewType, nutrient } = props;
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
    fontSize = 2.5;
  } else if (headerRow) {
    fontSize = 2.5;
  }
  const value = props.nutrient.value ?
     props.nutrient.value :
     (<span style={{ color: 'red' }}>
       {'~'}
     </span>);
  const Row = styled.div`
       display: block;
       border-bottom: 1px solid #a79595;
   `;
  const RowName = styled.div`
    display:inline-block;
    overflow: hidden;
    width:60%;
    font-size: ${fontSize}}vmin;
    font-family: 'Bitter', serif;
    .row-name-${type}-text {
      margin-left: ${indent}px;
    }
  `;
  const RowUnits = styled.div`
    display:inline-block;
    overflow: hidden;
    width:15%;
    text-align: center;
    font-family: 'Droid Serif', serif;
  `;
  const RowValue = styled.div`
    display:inline-block;
    overflow: hidden;
    width:25%;
    text-align: center;
    font-family: 'Bitter', serif;
  `;
  return (<Row className={`Section__${viewType}__Row`} onMouseEnter={() => onNutrientHover(nutrient)} onClick={() => onNutrientSelected(nutrient)}>
    {hasName ? <RowName className={`Section__${viewType}__RowName`} ><span className="row-name-text" >{name}</span></RowName> : <RowName><span className="row-name-text" > </span></RowName> }
    {hasUnits ? <RowUnits className={`Section__${viewType}__RowUnits`} >{units}</RowUnits> : null }
    {hasValue ? <RowValue className={`Section__${viewType}__RowValue`} >{value}</RowValue> : null }
  </Row>
  );
  // return (<Row >
  //   { hasName ? <RowName ><span className={`row-name-${type}-text`} >{name}</span></RowName> : <RowName><span className={`row-name-${type}-text`} > </span></RowName> }
  //   { hasUnits ? <RowUnits >{units}</RowUnits> : null }
  //   { hasValue ? <RowValue >{value}</RowValue> : null }
  // </Row>
  // );
}
//
NutrientRow.propTypes = {
  nutrient: PropTypes.object,
  onNutrientHover: PropTypes.func,
  onNutrientSelected: PropTypes.func,
  type: PropTypes.string,
  viewType: PropTypes.string,
};
