import React from 'react';
import PropTypes from 'prop-types';
import ListItem from './ListItem';
import BodyGroup from './BodyGroup';
import Table from './Table';

function ListItemsManager(props) {
  const { items, isReactComponent } = props;
  return (
    <Table>
      <BodyGroup>
        {
            [...items].map((item) => (
              <ListItem key={isReactComponent ? item.key : item.title} isReactComponent={isReactComponent}>
                {item}
              </ListItem>
            ))
          }
      </BodyGroup>
    </Table>
  );
}

ListItemsManager.propTypes = {
  items: PropTypes.oneOfType([
    PropTypes.object.isRequired,
    PropTypes.array.isRequired,
  ]),
  isReactComponent: PropTypes.bool,
};

export default ListItemsManager;
