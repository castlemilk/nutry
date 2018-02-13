import styled from 'styled-components';

const SearchWrapper = styled.div`
  width: 100%;

  .tabs {
    overflow: visible;
  }

  .ant-tabs {
    overflow: visible;
  }

  .tab-bar .ant-tabs-bar {
    background-color: rgba(211, 211, 211, 0.3);
  }

  @media only screen and (min-width: 700px) {
    .tab-bar .ant-tabs-nav-container {
      margin-left: 160px;
    }
  }

  .loading-spinner {
    margin-left: 50%;
  }
`;

export default SearchWrapper;
