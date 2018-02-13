/**
*
* LoadingContent
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Progress } from 'antd';
import styled from 'styled-components';
// import LoadingContentWrapper from './LoadingContentWrapper';
function LoadingContent(props) {
  const { width } = props;
  const LoadingContentWrapper = styled.div`
    margin: 5px;
    display: inline-block;

    .ant-progress-bg {
      background-color: #babfc3;
    }

    .ant-progress-status-active .ant-progress-bg::before {
      animation: ant-progress-active ${props.speed || 1}s cubic-bezier(0.23, 1, 0.32, 1) infinite;
    }
  `;
  return (
    <LoadingContentWrapper >
      <div style={{ width }}>
        <Progress percent={100} status="active" showInfo={false} strokeWidth={props.height} />
      </div>
    </LoadingContentWrapper>
  );
}

LoadingContent.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  speed: PropTypes.number,

};

export default LoadingContent;
