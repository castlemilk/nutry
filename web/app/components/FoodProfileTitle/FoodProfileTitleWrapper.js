import styled from 'styled-components';

const FoodProfileTitleWrapper = styled.div`
  margin-top: 30px;

  .profile-title {
    padding: 20px;
    background: white;
    border-style: solid;
    border-width: 1px;
    border-color: black;
    box-shadow: 10px 10px 16px -10px rgba(0, 0, 0, 0.44);
  }

  .profile-title .profile-title-usage-wrapper {
    vertical-align: center;
    text-align: center;
    display: flex;
  }

  .profile-title .profile-title-usage-values {
    font-size: 15px;
    margin-top: 3px;
    margin-bottom: 0.5em;
    margin-left: 10px;
  }

  .profile-title .profile-title-usage-header {
    font-size: 20px;
    display: inline;
  }
`;

export default FoodProfileTitleWrapper;
