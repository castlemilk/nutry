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
import { Col, Row } from 'antd';

import ExpandableListView from 'components/ExpandableListView';
import ProfilerAddElement from 'components/ProfilerAddElement';
import ProfilerElement from 'components/ProfilerElement';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectAllElements, makeSelectElement } from './selectors';
import { addProfilerElement, deleteProfilerElement, updateProfilerElement } from './actions';
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
    console.log(`element:id:${id}`)
    console.log(`element:value:${value}`)
    this.props.onUpdateElement(id, 'nutrient', value)
  }
  handleSliderChange(value, id) {
    console.log(`element:id:${id}`)
    console.log(`element:value:${value}`)
    this.props.onUpdateElement(id, 'scale', value)
  }
  handleElementRemove(id) {
    console.log(`element:id:${id}`)
    this.props.onDeleteElement(id)
  }
  render() {
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
      console.log(elementProps)
      return <ProfilerElement key={element.id} {...elementProps} />
    })
    console.log('elements: ')
    console.log(this.props.elements);
    const sampleDataAdvanced = [{
      headerName: 'elements',
      isOpened: true,
      isReactComponent: true,
      height: 900,
      items: elementComponents.concat(initialList),
    }];
    console.log(sampleDataAdvanced);
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
      </ProfilerWrapper>
    );
  }
}

Profiler.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  elements: makeSelectAllElements(),


});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
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
