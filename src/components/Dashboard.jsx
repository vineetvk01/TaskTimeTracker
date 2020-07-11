import React, { useState } from 'react';
import styled from 'styled-components';
import { ViewTasks, CreateTask, FilterBox } from './tasks';
import { Container, Content, Title } from './styled-components';
import { ALL } from './tasks/FilterBox.jsx'

const Search = styled.input`
  position: absolute;
  padding: 10px;
  margin: 0px 30px;
  border: 1px solid #d3d3d3;
  border-radius: 10px;
  width: 200px;
  transition: width 0.5s;
  &:hover {
    border: 1px solid #333;
  }
  &:focus {
    border: 1px solid #999;
    width: 250px;
    outline: none;
  }
`;

export const TaskHandler = ({search}) => {

  const [filter, setFilter] = useState({ show: ALL, tagIds: []});



  return (
    <>
      <div className="container">
        <Content className="column" style={{ flex: 1 }}>
          <CreateTask /> 
        </Content> 
        <Content className="column" style={{ flex: 1 }}>
          <FilterBox filter={filter} setFilter={setFilter}/>
        </Content> 
        <Content className="column" style={{ flex: 1 }}>
          <ViewTasks filter={{...filter, search}} />
        </Content> 
      </div>
    </>)
}


const _TaskManager = () => {

  const [search, setSearch] = useState('')

  return (
    <div id="right" className="column" style={{ width: '100%' }}>
      <div className="bottom">
        <Container>
          <Title>Task Manager</Title>
          <Search placeholder="Quick search" value={search} onChange={(e) => setSearch(e.target.value)} />
          <TaskHandler search={search}/>
        </Container>
      </div>
    </div>
  )
}


export const TaskManager = (_TaskManager);