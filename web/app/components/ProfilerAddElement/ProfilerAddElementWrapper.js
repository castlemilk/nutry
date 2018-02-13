import styled from 'styled-components';

const ProfilerAddElementWrapper = styled.div`
  .plus-button-wrapper {
    background-color: #b778ef;
    position: relative;
    display: inline-block;
    margin: 20px;
    padding: 4px;
    border-radius: 20px;
    outline: none;
  }

  .plus-button-wrapper:hover {
    outline: none;
    background-color: #b778ef;
    position: relative;
    display: inline-block;
    margin: 20px;
    border-radius: 20px;
    bottom: 2px;
    border-color: rgba(127, 63, 191, 0.70);
    -webkit-box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.70);
    -moz-box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.60);
    box-shadow: 0px 4px 10px 0px rgba(127, 63, 191, 0.70);
  }

  .plus-button-wrapper:focus {
    outline: none;
  }

  .plus-text {
    margin-top: 20px;
    color: white;
  }
`;

export default ProfilerAddElementWrapper;
