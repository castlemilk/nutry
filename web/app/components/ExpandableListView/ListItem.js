import React from 'react';
import PropTypes from 'prop-types';
import ListViewItem from './ListViewItem';


function ListItem(props) {
  const { isReactComponent } = props;
  return (
    <ListViewItem>
      { isReactComponent ? props.children : props.children.title }
    </ListViewItem>
  );
}

ListItem.propTypes = {
  children: PropTypes.object,
  isReactComponent: PropTypes.bool,
};


export default ListItem;
