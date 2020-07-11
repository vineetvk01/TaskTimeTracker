import styled from 'styled-components';

export const TaskBox = styled.div`
  background-color: ${props => props.active ? '#EAECEF' : '#fff'}; 
  padding: 10px;
  margin: 5px;
  border: 1px solid #EAECEF;
  border-radius: 10px;
  overflow: hidden;
  min-height: 60px;
  box-shadow: ${props => props.active ? '0px 1px 4px #222' : ''};
`;

export const TaskName = styled.p`
  font-size: 15px;
  font-weight: 600;
  float: left;
  margin: 0px 5px;
  margin-top: 5px;
  width: 100%;
`;

export const Tag = styled.p`
  font-size: 12px;
  font-weight: 300;
  float: left;
  border: 1px solid #fff;
  border-radius: 5px;
  background-color: ${ props => props.selected ? '#a356a3': '#EE82EE'};
  padding: 5px 10px;
  margin-right: 5px;
  color: #fff;
  cursor: pointer;
`;

export const TimeBox = styled.div`
  clear:both;
  margin-top: 20px;
`
export const Time = styled.p`
  color: #666;
  margin: 0;
  padding: 0 10px;
  float: left;
`

export const Controller = styled.div`
  float: right;
  margin: 0 15px;
  color: #666;
  cursor: pointer;
`;

export const TaskInput = styled.input`
  padding: 10px 2px;
  width: 90%;
  border: 1px solid #fff;
  border-bottom: 3px solid #d3d3d3;
  font-size: 15px;

  &:focus{
    outline: none;
  }
`;

export const CreateButton = styled.button`

  border: 1px solid #228B22;
  border-radius: 5px;
  background-color: #228B22;
  padding: 10px;
  width: 95%;
  cursor: pointer;
  font-size: 16px;
  color: #fff;
  margin: 10px 0;

  &:hover{
    box-shadow: 0px 0px 5px #999;
  }

  &:focus{
    outline: none;
  }
`;

export const Add = styled.button`
  background-color: #fff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 20px;
  color: blue;

  &:hover{
    transform: rotate(10deg);
  }
  
  &:focus{
    outline: none;
  }
`;

export const TaskNameInput = styled.input`
  padding: 5px;
  width: 80%;
  border: none;
  border-bottom: 2px solid #d3d3d3;

  &:focus{
    outline: none;
  }
`
