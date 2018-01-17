import styled from 'styled-components';

const RowName = styled.div`
  display:table-cell;
  overflow: hidden;
  width:60%;
  font-size: 2.0vmin;
  ${''/* font-family: 'Droid Serif', serif; */}
  font-family: 'Bitter', serif;
  border-bottom: 1px solid #a79595;
  .parent-row-name {
    margin-left: 5px;
  }
`;

export default RowName;
