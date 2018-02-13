import styled from 'styled-components';

const ProfilerElementWrapper = styled.div`
  z-index: 1;
  overflow: visible;

  .profiler-element-wrapper {
    position: relative;
    display: inline-block;
    padding: 4px;
    border-radius: 20px;
  }

  .profiler-element-slider {
    float: left;
    width: 200px;
  }

  .profiler-element-text {
    float: left;
    margin: 3px 6px 10px;
    font-size: 20px;
    color: rgb(127, 63, 191);
    width: 300px;
  }

  .ant-slider-track {
    background-color: #b877f0;
  }

  .ant-slider-handle {
    border: solid 2px #b877f0;
  }

  .profiler-element-remove-wrapper {
    float: left;
    margin: 3px 6px 10px;
  }
`;

export default ProfilerElementWrapper;
