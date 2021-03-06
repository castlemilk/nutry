/**
 *
 * Profiler
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Col, Row, Icon, Spin } from 'antd';

import ProfilerExpandableList from 'components/ProfilerExpandableList';
import ProfilerAddElement from 'components/ProfilerAddElement';
import ProfilerElement from 'components/ProfilerElement';
import ResultsList from 'components/ResultsList';
import NoResultsFound from 'components/NoResultsFound';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectSearchString } from 'containers/Search/selectors';
import { makeSelectSearchResults } from 'containers/App/selectors';
import {
  makeSelectAllElements,
  makeSelectSearchLoading } from './selectors';
import {
  addProfilerElement,
  deleteProfilerElement,
  updateProfilerElement,
  changeSearch } from './actions';
import reducer from './reducer';
import saga from './saga';
import ProfilerWrapper from './ProfilerWrapper';

export class Profiler extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.props.onChangeSearch();
  }

  handleAddClick() {
    this.props.onAddElement();
  }

  handleNutrientChange(value, id) {
    this.props.onUpdateElement(id, 'nutrient', value);
    this.props.onChangeSearch();
  }

  handleSliderChange(value, id) {
    this.props.onUpdateElement(id, 'scale', value);
    this.props.onChangeSearch();
  }

  handleElementRemove(id) {
    this.props.onDeleteElement(id);
    this.props.onChangeSearch();
  }

  render() {
    const {
      searchResults,
      searchString,
      searchLoading,
      } = this.props;
    const { onProfileSelected } = this.props;
    const loadingSpinner = <Icon type="loading" style={{ fontSize: 40 }} spin />;
    const items = searchResults.items ? searchResults.items : [];
    // console.log(searchLoading, profilerLoading, items, items.length);
    const noResultsFound = items.length === 0
                            && searchString.length > 0
                            && (!searchLoading);
    const nutrientResults = noResultsFound ? <NoResultsFound /> :
    (<ResultsList
      onProfileSelected={(profileData) => onProfileSelected(profileData)}
      results={items}
    />);
    const nutrientResultsView = (searchLoading) ?
    (<div className="loading-spinner">
      <Spin indicator={loadingSpinner} />
    </div>) : nutrientResults;
    const initialList = [
      <ProfilerAddElement
        key="add-element"
        onClick={() => this.handleAddClick()}
      />,
    ];
    const elementComponents = this.props.elements.map((element) => {
      const elementProps = Object.assign(element, {
        onNutrientChange: (id, nutrient) => this.handleNutrientChange(id, nutrient),
        onScaleChange: (id, scale) => this.handleSliderChange(id, scale),
        onElementRemove: (id) => this.handleElementRemove(id),
      });
      return (
        <ProfilerElement key={element.id} {...elementProps} />
      );
    });
    const elementData = [{
      headerName: 'elements',
      isOpened: true,
      isReactComponent: true,
      height: 900,
      items: elementComponents.concat(initialList),
    }];
    return (
      <ProfilerWrapper>
        <Row>
          <Col xs={24} md={24}>
            <ProfilerExpandableList
              data={elementData}
              headerAttName="headerName"
              itemsAttName="items"
            />
          </Col>
        </Row>
        <Row>
          {nutrientResultsView}
        </Row>
      </ProfilerWrapper>
    );
  }
}

Profiler.propTypes = {
  onProfileSelected: PropTypes.func.isRequired,
  elements: PropTypes.oneOfType([
    PropTypes.object.isRequired,
    PropTypes.array.isRequired,
  ]),
  searchResults: PropTypes.object,
  searchString: PropTypes.string,
  searchLoading: PropTypes.bool,
  onChangeSearch: PropTypes.func,
  onUpdateElement: PropTypes.func,
  onAddElement: PropTypes.func,
  onDeleteElement: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  elements: makeSelectAllElements(),
  searchResults: makeSelectSearchResults(),
  searchLoading: makeSelectSearchLoading(),
  searchString: makeSelectSearchString(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeSearch: () => dispatch(changeSearch()),
    onAddElement: () => dispatch(addProfilerElement()),
    onUpdateElement: (id, key, value) => dispatch(updateProfilerElement(id, key, value)),
    onDeleteElement: (id) => dispatch(deleteProfilerElement(id)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'profiler', reducer });
const withSaga = injectSaga({ key: 'profiler', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Profiler);
