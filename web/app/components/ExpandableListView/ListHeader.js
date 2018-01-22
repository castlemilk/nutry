import React, { Component } from 'react';
import FaMinus from 'react-icons/lib/fa/minus';
import FaPlus from 'react-icons/lib/fa/plus';
import PropTypes from 'prop-types';
import ListViewHeader from './ListViewHeader';


export default class ListHeader extends Component {
  static propTypes = {
    header: PropTypes.string.isRequired,
    headerIndex: PropTypes.number.isRequired,
    handleToggle: PropTypes.func.isRequired,
  }
  constructor() {
    super();
    this.state = { isOpened: true };
    // this.handleClick = this.handleClick.bind(this);
  }
  handleClick = (headerIndex) => {
    const { handleToggle } = this.props;
    this.setState({ isOpened: !this.state.isOpened });
    handleToggle(headerIndex);
  }
  render() {
    const { header, headerIndex } = this.props;

    if (this.state.isOpened) {
      return (
        <ListViewHeader className="Section__ListViewHeaader" onClick={() => this.handleClick(headerIndex)}>
          <span className="headerIcon"><FaMinus /></span>
          <span className="headerText">{header}</span>
        </ListViewHeader>
      );
    }
    return (
      <ListViewHeader className="Section__ListViewHeaader" onClick={() => this.handleClick(headerIndex)}>
        <span className="headerIcon"><FaPlus /></span>
        <span className="headerText">{header}</span>
      </ListViewHeader>
    );
  }


}
