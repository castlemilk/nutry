/**
*
* DetailedCard
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
import ExpandableListView from 'components/ExpandableListView';
import Wrapper from './Wrapper';
// import messages from './messages';

class DetailedCard extends React.Component { // eslint-disable-line react/prefer-stateless-function


  render() {
    console.log('DetailedCard:nutrientTabe:', this.props.nutrientTable);
    this.filledNutrientTable = [];
    this.props.nutrientTable.map((group) => {
      const componentGroup = {};
      componentGroup.headerName = group.headerName;
      componentGroup.isOpened = true;
      componentGroup.isReactComponent = true;
      componentGroup.height = (group.items.length * 60) + 70;
      const items = [];
      group.items.map((row) => {
        switch (row.type) {
          case PARENT_ROW:
            return items.push((<NutrientParentRow nutrient={row.nutrient} key={`detailed-${row.nutrient.name}`} />));
          case PARENT_NONAME_ROW:
            return items.push((<NutrientParentNoNameRow nutrient={row.nutrient} key={`detailed-${row.nutrient.name}`} />));
          case CHILD_ROW:
            return items.push((<NutrientChildRow nutrient={row.nutrient} key={`detailed-${row.nutrient.name}`} />));
          case HEADER:
            return items.push((<NutrientHeaderRow data={row.nutrient} key={`detailed-${row.nutrient.name}`} />));
          default:
            return items.push((<NutrientChildRow nutrient={row.nutrient} key={`detailed-${row.nutrient.name}`} />));
        }
      });
      componentGroup.items = items;
      this.filledNutrientTable.push(componentGroup);
      return componentGroup;
      // console.log("ExpandableListView:
    });
    return (
      <Wrapper>
        <ExpandableListView
          data={this.filledNutrientTable}
          headerAttName="headerName"
          itemsAttName="items"
        />
      </Wrapper>
    );
  }
}

DetailedCard.propTypes = {
  nutrientTable: PropTypes.array.isRequired,
};

export default DetailedCard;
