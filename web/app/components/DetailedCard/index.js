/**
*
* DetailedCard
*
*/
import PropTypes from 'prop-types';
import React from 'react';
import uuidv4 from 'uuid/v4';
import NutrientRowView from 'containers/NutrientRowView';
import ExpandableListView from 'components/ExpandableListView';
import Wrapper from './Wrapper';
// import messages from './messages';

class DetailedCard extends React.Component { // eslint-disable-line react/prefer-stateless-function

  render() {
    const { nutrientSections } = this.props;
    const mode = 'detailed';
    const rows = nutrientSections.reduce((accumulator, { headerName, items }) => accumulator.concat({
      headerName,
      isOpened: true,
      isReactComponent: true,
      height: (items.length * 60) + 90,
      items: items.map((row) => {
        const { type, prefix } = row;
        const id = uuidv4();
        const rowProps = {
          id,
          mode,
          prefix,
          type,
        };
        return <NutrientRowView {...rowProps} key={id} />;
      }),
    }), []);
    return (
      <Wrapper>
        <ExpandableListView
          data={rows}
          headerAttName="headerName"
          itemsAttName="items"
        />
      </Wrapper>
    );
  }
}

DetailedCard.propTypes = {
  nutrientSections: PropTypes.object.isRequired,
};

export default DetailedCard;
