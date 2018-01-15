/**
 *
 * Profiler
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Col, Row, Icon, Spin } from 'antd';

import ExpandableListView from 'components/ExpandableListView';
import ProfilerAddElement from 'components/ProfilerAddElement';
import ProfilerElement from 'components/ProfilerElement';
import ResultsList from 'components/ResultsList';
import NoResultsFound from 'components/NoResultsFound';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectSearchString } from 'containers/Search/selectors';
import { makeSelectAllElements, makeSelectElement, makeSelectSearchResults, makeSelectSearchLoading } from './selectors';
import { addProfilerElement, deleteProfilerElement, updateProfilerElement, changeSearch } from './actions';
import reducer from './reducer';
import saga from './saga';
import ProfilerWrapper from './ProfilerWrapper';
// import messages from './messages';


export class Profiler extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props)

    this.handleAddClick = this.handleAddClick.bind(this);
  }
  handleAddClick() {
    console.log('add clicked!')
    this.props.onAddElement()
  }
  handleNutrientChange(value, id) {
    // console.log(`element:id:${id}`)
    // console.log(`element:value:${value}`)
    this.props.onUpdateElement(id, 'nutrient', value)
    this.props.onChangeSearch()
  }
  handleSliderChange(value, id) {
    // console.log(`element:id:${id}`)
    // console.log(`element:value:${value}`)
    this.props.onUpdateElement(id, 'scale', value)
    this.props.onChangeSearch()
  }
  handleElementRemove(id) {
    // console.log(`element:id:${id}`)
    this.props.onDeleteElement(id)
  }
  handleSearchStringChange(event) {
    const { searchType } = this.props;
    if (searchType === 'all' || searchType === 'nutrients') {
      this.props.onChangeSearchString(event)
    }
  }
  render() {
    console.log('results:')
    console.log(this.props.searchResults)
    const loadingSpinner = <Icon type="loading" style={{ fontSize: 40 }} spin />;
    const items = this.props.searchResults.items ? this.props.searchResults.items : [];
    console.log('items:')
    console.log(items)
    const noResultsFound = items.length === 0 && this.props.searchString.length > 0 && !this.props.loading;
    const nutrientResults = noResultsFound ? <NoResultsFound /> : <ResultsList results={items} />;
    const nutrientResultsView = this.props.loading ?
    (<div className="loading-spinner">
      <Spin indicator={loadingSpinner} />
    </div>) : nutrientResults;
    const addElementProps = {
      key: 'add-element',
    }
    const initialList = [
      <ProfilerAddElement key='add-element' onClick={() => this.handleAddClick()} />,
    ]
    const elementComponents = this.props.elements.map((element) => {
      const elementProps = Object.assign(element, {
        onNutrientChange: (id, nutrient) => this.handleNutrientChange(id, nutrient),
        onScaleChange: (id, scale) => this.handleSliderChange(id, scale),
        onElementRemove: (id) => this.handleElementRemove(id)
      })
      // console.log(elementProps)
      return (
          <ProfilerElement key={element.id} {...elementProps} />
      )
    })
    // console.log('elements: ')
    // console.log(this.props.elements);
    const sampleDataAdvanced = [{
      headerName: 'elements',
      isOpened: true,
      isReactComponent: true,
      height: 900,
      items: elementComponents.concat(initialList),
    }];
    // console.log(sampleDataAdvanced);
    return (
      <ProfilerWrapper>
      <Row>
        <Col xs={24} md={24}>
          <ExpandableListView
            data={sampleDataAdvanced}
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
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  elements: makeSelectAllElements(),
  searchResults: makeSelectSearchResults(),
  loading: makeSelectSearchLoading(),
  searchString: makeSelectSearchString(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
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
