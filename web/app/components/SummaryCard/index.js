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
        onNutrientHover,
        onNutrientSelected,
        type,
        nutrient,
      };
      return <NutrientRow {...rowProps} key={`summary-${nutrient.name}`} />;
    }) : null;

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
