import React from 'react';
import PropTypes from 'prop-types';
import { Motion, spring } from 'react-motion';
import ListHeader from './ListHeader';
import ListItemsManager from './ListItemsManager';
import Section from './Section';

import Wrapper from './Wrapper';

class ExpandableListView extends React.Component {
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
  }

  render() {
    const { headerAttName, itemsAttName } = this.props;
    const { data } = this.props;
    console.log('rendering:ExpandableListView');
    return (
      <Wrapper >
        {
          Object.keys(data).map((k, index) => {
            const header = data[k][headerAttName];
            const items = data[k][itemsAttName];
            const { isReactComponent } = data[k];
            const { isOpened } = data[k];
            const { height } = data[k];
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
                    <Section k={k} >
                      <ListHeader
                        header={header}
                        headerIndex={index}
                        isOpened={isOpened}
                        handleToggle={() => this.handleToggle(index)}
                      />
                      <div
                        className="Section__Content"
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
                    </Section>
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
ExpandableListView.propTypes = {
  data: PropTypes.array.isRequired,
  headerAttName: PropTypes.string.isRequired,
  itemsAttName: PropTypes.string.isRequired,
}

export default ExpandableListView;
