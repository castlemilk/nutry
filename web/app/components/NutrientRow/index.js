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
  const { onNutrientHover, onNutrientSelected, type } = props;
  const childRow = type === CHILD_ROW;
  const parentRow = type === PARENT_ROW;
  const parentNoNameRow = type === PARENT_NONAME_ROW;
  const headerRow = type === HEADER;
  const value = props.nutrient.value ?
     props.nutrient.value :
     (<span style={{ color: 'red' }}>
       {'~'}
     </span>);
  const RowName = styled.div`
    display:table-cell;
    overflow: hidden;
    width:60%;
    font-size: ${(parentRow || headerRow) ? 2.5 : 2}vmin;
    font-family: 'Bitter', serif;
    border-bottom: 1px solid #a79595;
    .row-name-text {
      margin-left: ${(parentRow || headerRow) ? 5 : 15}px;
    }
  `;
  const RowUnits = styled.div`
    display:table-cell;
    overflow: hidden;
    text-align: center;
    font-family: 'Droid Serif', serif;
    border-bottom: 1px solid #a79595;
  `;
  const RowValue = styled.div`
    display:table-cell;
    overflow: hidden;
    width:25%;
    text-align: center;
    font-family: 'Bitter', serif;
    border-bottom: 1px solid #a79595;
  `;
  const Row = styled.div`
      display:table-row;
      width: 100%;
  `;
    // case PARENT_NONAME_ROW:
    //   const RowName = styled.div`
    //     display:table-cell;
    //     width:60%;
    //     font-size: 2.5vmin;
    //     font-family: 'Bitter', serif;
    //     border-bottom: 1px solid #a79595;
    //   `;
    //   const RowUnits = styled.div`
    //     display:table-cell;
    //     text-align: center;
    //     font-family: 'Droid Serif', serif;
    //     border-bottom: 1px solid #a79595;
    //
    //   `;
    //   const RowValue = styled.div`
    //     display:table-cell;
    //     width:25%;
    //     text-align: center;
    //     font-family: 'Droid Serif', serif;
    //     border-bottom: 1px solid #a79595;
    //   `;
    //   const Row = styled.div`
    //       display:table-row;
    //   `;
    //   const rowView = (
    //     <Row>
    //       <RowName> </RowName>
    //       <RowUnits>{units}</RowUnits>
    //       <RowValue>{value}</RowValue>
    //     </Row>
    //   );
    // case CHILD_ROW:
    //   const RowName = styled.div`
    //     display:table-cell;
    //     overflow: hidden;
    //     width:60%;
    //     font-size: 2.0vmin;
    //     font-family: 'Bitter', serif;
    //     border-bottom: 1px solid #a79595;
    //     .child-row-name {
    //       margin-left: 15px;
    //     }
    //   `;
    //   const RowUnits = styled.div`
    //     display:table-cell;
    //     overflow: hidden;
    //     text-align: center;
    //     font-family: 'Bitter', serif;
    //     border-bottom: 1px solid #a79595;
    //   `;
    //   const RowValue = styled.div`
    //     display:table-cell;
    //     overflow: hidden;
    //     width:25%;
    //     text-align: center;
    //     font-family: 'Bitter', serif;
    //     border-bottom: 1px solid #a79595;
    //   `;
    //   const Row = styled.div`
    //     display:table-row;
    //     width: 100%;
    //   `;
    //   const rowView = (
    //     <Row>
    //       <RowName><span className="row-name-text">{name}</span></RowName>
    //       <RowUnits>{units}</RowUnits>
    //       <RowValue>{value}</RowValue>
    //     </Row>
    //   );
    // case HEADER:
    //   const RowName = styled.div`
    //     display:table-cell;
    //     width:60%;
    //     font-size: 4.5vmin;
    //     font-family: 'Bitter', serif;
    //     border-bottom: 1px solid #a79595;
    //   `;
    //   const RowUnits = styled.div`
    //     width:30%;
    //     text-align: center;
    //     font-family: 'Bitter', serif;
    //     border-bottom: 1px solid #a79595;
    //   `;
    //   const RowValue = styled.div`
    //     display:table-cell;
    //     width:25%;
    //     text-align: center;
    //     font-family: 'Bitter', serif;
    //     border-bottom: 1px solid #a79595;
    //   `;
    //   const Row = styled.div`
    //     display:table-row;
    //   `;
    //   const rowView = (<Row>
    //     <RowName className="header-row-name">{props.data.name}</RowName>;
    //   </Row>);
    // default:
    //   const RowName = styled.div`
    //     display:table-cell;
    //     overflow: hidden;
    //     width:60%;
    //     font-size: 2.0vmin;
    //     font-family: 'Bitter', serif;
    //     border-bottom: 1px solid #a79595;
    //     .child-row-name {
    //       margin-left: 15px;
    //     }
    //   `;
    //   const RowUnits = styled.div`
    //     display:table-cell;
    //     overflow: hidden;
    //     text-align: center;
    //     font-family: 'Bitter', serif;
    //     border-bottom: 1px solid #a79595;
    //   `;
    //   const RowValue = styled.div`
    //     display:table-cell;
    //     overflow: hidden;
    //     width:25%;
    //     text-align: center;
    //     font-family: 'Bitter', serif;
    //     border-bottom: 1px solid #a79595;
    //   `;
    //   const Row = styled.div`
    //     display:table-row;
    //     width: 100%;
    //   `;
    //   const rowView = (
    //     <Row>
    //       <RowName><span className="child-row-name">{name}</span></RowName>
    //       <RowUnits>{units}</RowUnits>
    //       <RowValue>{value}</RowValue>
    //     </Row>
    //   );
  return (<Row>
    {(parentRow || headerRow || childRow) ? <RowName><span className="row-name-text" >{name}</span></RowName> : <RowName><span className="row-name-text" ></span></RowName> }
    {(childRow || parentRow || parentNoNameRow) ? <RowUnits>{units}</RowUnits> : null }
    {(childRow || parentRow || parentNoNameRow) ? <RowValue>{value}</RowValue> : null }
  </Row>
  );
}
//
NutrientRow.propTypes = {
  nutrient: PropTypes.object,
  onNutrientHover: PropTypes.func,
  onNutrientSelected: PropTypes.func,
  type: PropTypes.string,
};
