import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Motion, spring } from 'react-motion';
import ListHeader from './ListHeader';
import ListItemsManager from './ListItemsManager';
// import TableHeader from 'components/TableHeader';

import Wrapper from './Wrapper';
// import Ul from './Ul';
// import TableHeader from 'components/TableHeader';

export default class ProfilerExpandableList extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    headerAttName: PropTypes.string.isRequired,
    itemsAttName: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    const { data } = this.props;
    this.state = {
      data,
    };
  }
  handleToggle = (headerIndex) => {
    const newData = Object.assign({}, this.props.data);
    newData[headerIndex].isOpened = !newData[headerIndex].isOpened;
    this.setState(newData);
    console.log('changing state:');
    console.log(newData);
  }

  render() {
    // const { data } = this.props
    const { headerAttName, itemsAttName } = this.props;
    const { data } = this.props;
    let refi = 0;
    // const makeHeaderRef = () => `ListHeader-${refi}`;

    // const makeItemRef = () => `ListItem-${refi}`;
    return (

      <Wrapper >
        {
          Object.keys(data).map((k, index) => {
            const header = data[k][headerAttName];
            const items = data[k][itemsAttName];
            const { isReactComponent } = data[k];
            const { isOpened } = data[k];
            const { height } = data[k];
            refi += 1;
            const motionIndex = `motion-key${index}`;
            // const headerRef = makeHeaderRef();
            // const itemRef = makeItemRef();
            // console.log("ExpandableListView:items:", items);
            const overflow = isOpened ? 'visible' : 'hidden';
            return (

              <Motion
                key={motionIndex}
                defaultStyle={{ h: 0 }}
                style={{ h: spring(isOpened ? height : 0) }}
              >
                {
                  ({ h }) => (
                    <div className="expandable-listview-wrapper" key={k}>
                      <ListHeader
                        header={header}
                        headerIndex={index}
                        className="expandable-listview_listHeader"
                        isOpened={isOpened}
                        handleToggle={() => this.handleToggle(index)}
                      />
                      <div
                        style={{
                          display: 'block',
                          overflow,
                          width: '100%',
                          maxHeight: Number(`${h}`),
                        }}
                      >
                        <ListItemsManager
                          items={items}
                          isReactComponent={isReactComponent}
                          className="expandable-listview_listItems"
                        />
                      </div>
                    </div>
                  )
                }
              </Motion>
            );
          })
        }
      </Wrapper>
    );
  }


}
