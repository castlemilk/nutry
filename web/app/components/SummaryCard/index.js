/**
*
* SummaryCard
*
*/
import PropTypes from 'prop-types';
import React from 'react';

// import { FormattedMessage } from 'react-intl';
import NutrientRow from 'components/NutrientRow';
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
    const { summaryTable, onNutrientHover, onNutrientSelected } = this.props;
    const rows = summaryTable ? summaryTable.map((row) => {
      const { type, nutrient } = row;
      const rowProps = {
        type,
        nutrient,
      };
      return <NutrientRow {...rowProps} key={`summary-${nutrient.name}`} />;
    }) : null;
    // nutrientTable.map((row) => {
      // console.log(row)
    //   switch (row.type) {
    //     case PARENT_ROW:
    //       return rows.push(<NutrientParentRow onSelect={onNutrientSelected} nutrient={row.nutrient} key={`summary-${row.nutrient.name}`} />);
    //     case PARENT_NONAME_ROW:
    //       return rows.push(<NutrientParentNoNameRow nutrient={row.nutrient} key={`summary-${row.nutrient.name}`} />);
    //     case CHILD_ROW:
    //       return rows.push(<NutrientChildRow nutrient={row.nutrient} key={`summary-${row.nutrient.name}`} />);
    //     case HEADER:
    //       return rows.push(<NutrientHeaderRow data={row.nutrient} key={`summary-${row.nutrient.name}`} />);
    //     default:
    //       return null;
    //   }
    // });
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
  summaryTable: PropTypes.array.isRequired,
  onNutrientHover: PropTypes.func,
  onNutrientSelected: PropTypes.func,
};
export default SummaryCard;
