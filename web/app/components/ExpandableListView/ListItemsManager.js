import React from 'react';
import PropTypes from 'prop-types';
import ListItem from './ListItem';
import BodyGroup from './BodyGroup';
// import Table from './Table';

function ListItemsManager(props) {
  const { items, isReactComponent } = props;
  return (
    <BodyGroup className="Section__BodyGroup">
      {
            [...items].map((item) => (
              <ListItem className="Section__ListItem" key={isReactComponent ? item.key : item.title} isReactComponent={isReactComponent}>
                {item}
              </ListItem>
            ))
          }
    </BodyGroup>
  );
}

ListItemsManager.propTypes = {
  items: PropTypes.array.isRequired,
  isReactComponent: PropTypes.bool,
};

export default ListItemsManager;
