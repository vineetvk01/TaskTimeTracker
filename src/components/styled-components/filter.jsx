import styled from 'styled-components';

export const FilterButton = styled.button`
  width: 30%;
  border: 1px solid #fff;
  padding: 10px 20px;
  background-color: ${ props => props.selected ? '#999' : ''};
  cursor: pointer;

  &:hover {
    background-color: ${ props => props.selected ? '#999' : '#d3d3d3'};
  }

  &:focus{
    outline: none;
  }
`