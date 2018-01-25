/**
*
* SummaryCard
*
*/
import PropTypes from 'prop-types';
import React from 'react';
import uuidv4 from 'uuid/v4';
// import { FormattedMessage } from 'react-intl';
import NutrientRowView from 'containers/NutrientRowView';
// import messages from './messages';
import Wrapper from './Wrapper';
import Table from './Table';
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
    console.log('rendering:SummaryCard')
    const { nutrientIds } = this.props;
    const mode = 'summary';

    const rows = nutrientIds.map((nutrient) => {
      const id = uuidv4()
      const prefix = nutrient.get('prefix');
      const type = nutrient.get('type');
      const rowProps = {
        id,
        mode,
        prefix,
        type
      }
      return (
        <NutrientRowView {...rowProps} key={id} />
      )
    });
    return (
      <Wrapper>
        <Table>
          {rows}
        </Table>

      </Wrapper>
    );
  }
}
SummaryCard.propTypes = {
  nutrientIds: PropTypes.object.isRequired,
};
export default SummaryCard;
