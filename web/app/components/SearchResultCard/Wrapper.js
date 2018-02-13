import styled from 'styled-components';

const Wrapper = styled.div`
  
  .separator {
      background: black;
      height: 1px;
      width: 50%;
      margin-left: 20px;
  }

  .card {
    margin-right:30px;
    margin-left:30px;
    margin-bottom:10px;
    border-style: solid;
    border-width: 1px;
    border-color: rgba(127, 63, 191,0.70);
    -webkit-box-shadow: 4px 4px 10px -4px rgba(0,0,0,0.44);
    -moz-box-shadow: 4px 4px 10px -4px rgba(0,0,0,0.44);
    box-shadow: 4px 4px 10px -4px rgba(127, 63, 191,0.70);
    padding-bottom: 5px;
  }

  .card:hover {
    margin-right:23px;
    margin-left:23px;
    margin-bottom:10px;
    border-style: solid;
    border-width: 1px;
    border-color: rgba(127, 63, 191,0.70);
    -webkit-box-shadow: 4px 4px 10px -4px rgba(0,0,0,0.44);
    -moz-box-shadow: 4px 4px 10px -4px rgba(0,0,0,0.44);
    box-shadow: 4px 4px 10px -4px rgba(127, 63, 200,0.90);
    -webkit-transition: all .2s ease-in-out;
    -moz-transition: all .2s ease-in-out;
    -o-transition: all .2s ease-in-out;
    transition: all .2s ease-in-out;
    padding-bottom: 5px;
  }

  .name {
    font-size: 2.3vmin;
    font-family: 'Droid', sans-serif;
    font-weight: bold;
    margin-left: 20px;
  }

  .group {
    margin-left: 20px;
    font-size: 1.5vmin;
  }

  .usage {
    margin-left: 20px;
    font-size: 1.5vmin;
  }
`;

export default Wrapper;
