/**
*
* DetailedCard
*
*/
import PropTypes from 'prop-types';
import React from 'react';

// import { FormattedMessage } from 'react-intl';
import NutrientRow from 'components/NutrientRow';
import ExpandableListView from 'components/ExpandableListView';
import Wrapper from './Wrapper';
// import messages from './messages';

class DetailedCard extends React.Component { // eslint-disable-line react/prefer-stateless-function


  render() {
    console.log('DetailedCard:nutrientTabe:', this.props.detailedTable);
    const { detailedTable } = this.props;
    const filledNutrientTable = detailedTable.map((group) => {
      const { headerName } = group;
      return {
        headerName,
        isOpened: true,
        isReactComponent: true,
        height: (group.items.length * 60) + 70,
        items: group.items.map((row) => {
          const { type, nutrient } = row;
          const rowProps = {
            type,
            nutrient,
          };
          return <NutrientRow {...rowProps} key={`detailed-${nutrient.name}`} />;
        }),
      };
    });
    return (
      <Wrapper>
        <ExpandableListView
          data={filledNutrientTable}
          headerAttName="headerName"
          itemsAttName="items"
        />
      </Wrapper>
    );
  }
}

DetailedCard.propTypes = {
  detailedTable: PropTypes.array.isRequired,
  onNutrientHover: PropTypes.func,
  onNutrientSelected: PropTypes.func,
};

export default DetailedCard;
