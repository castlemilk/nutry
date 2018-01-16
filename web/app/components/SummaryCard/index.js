/**
*
* SummaryCard
*
*/
import {
  HEADER,
  PARENT_NONAME_ROW,
  PARENT_ROW,
  CHILD_ROW,

} from 'containers/FoodProfile/constants';
import PropTypes from 'prop-types';
import React from 'react';

// import { FormattedMessage } from 'react-intl';
import NutrientParentRow from 'components/NutrientParentRow';
import NutrientChildRow from 'components/NutrientChildRow';
import NutrientHeaderRow from 'components/NutrientHeaderRow';
import NutrientParentNoNameRow from 'components/NutrientParentNoNameRow';
import TableHeader from 'components/TableHeader';
// import messages from './messages';
import Wrapper from './Wrapper';
import Table from './Table';
// import Thead from './Thead';
import BodyGroup from './BodyGroup';


class SummaryCard extends React.Component { // eslint-disable-line react/prefer-stateless-function
  /**
   * Generic profile is passed to this component and using the nutrient mapping
   * lib file we work out which nutrients are to be rendered/displayed.
   * nutrients -> mapping -> summary-nutrients
   * In comparison we have the DetailedCard which uses the same mapping file to
   * strucutre the order and grouping of the detailed card which includes
   * all nutrients.
   */
  render() {
    const rows = [];
    this.props.nutrientTable.map((row) => {
      // console.log(row)
      switch (row.type) {
        case PARENT_ROW:
          return rows.push(<NutrientParentRow nutrient={row.nutrient} key={`summary-${row.nutrient.name}`} />);
        case PARENT_NONAME_ROW:
          return rows.push(<NutrientParentNoNameRow nutrient={row.nutrient} key={`summary-${row.nutrient.name}`} />);
        case CHILD_ROW:
          return rows.push(<NutrientChildRow nutrient={row.nutrient} key={`summary-${row.nutrient.name}`} />);
        case HEADER:
          return rows.push(<NutrientHeaderRow data={row.nutrient} key={`summary-${row.nutrient.name}`} />);
        default:
          return null;
      }
    });
    // console.log("rows:", rows);

    return (
      <Wrapper>
        <Table>
          <BodyGroup>
            {rows}
          </BodyGroup>
        </Table>
      </Wrapper>
    );
  }
}
SummaryCard.propTypes = {
  nutrientTable: PropTypes.array.isRequired,
};
export default SummaryCard;
