import React, { useState, useRef, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { UpdateTask, DeleteTask } from '../../redux/reducers/tasks';
import { TaskBox, TaskName, TaskNameInput, Tag, TimeBox, Time, Controller } from '../styled-components';
import { FaPlay, FaStop, FaRegClock, FaPencilAlt, FaCheck } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { ALL, RUNNING, STOPPED } from './FilterBox.jsx'

const PlayStop = ({running, toggleStatus }) => {
  return (
  <Controller onClick={() => toggleStatus()}>
    { running ? <FaStop /> : <FaPlay /> }
  </Controller>)
}

const Delete = ({deleteMe}) => {
  return (
  <Controller onClick={() => deleteMe()}>
    <MdDelete size='20px' />
  </Controller>
  )
}

const Timer = ({ task, taskId, updateTask, deleteMe}) => {

  const { running, timeLapsed, startedAt = 0 } = task;
  //const requestRef = useRef();
  const [timeRan, setTimeRan] = useState(running ? Math.floor(Date.now()/1000) - parseInt(startedAt) : 0)

  const animate = useCallback((time) => {
    console.log('Ran?')
    setTimeRan(Math.floor(Date.now()/1000) - parseInt(startedAt));
  }, [startedAt]);

  useEffect(()=>{
    //requestRef.current = requestAnimationFrame(animate);
    //return () => cancelAnimationFrame(requestRef.current);
    if(running){
      const id = setInterval(() => {
        animate()
      }, 1000);
      return () => clearInterval(id);
    }
    setTimeRan(0);
  },[running, animate]);

  const toggleStatus = () => {
    const update = { ...task};
    update.running = !task.running;
    if(update.running){
      update.startedAt = Math.floor(Date.now()/1000);
    }else{
      const timeLapsed = Math.floor(Date.now()/1000) - update.startedAt;
      update.timeLapsed = task.timeLapsed + timeLapsed;
      update.startedAt = 0;
    }
    console.log(update);

    const obj = {};
    obj[taskId] = update;
    updateTask(obj);
  }

  return (
    <TimeBox>
      <Time><FaRegClock /> { parseInt(timeLapsed) + timeRan } sec</Time>
      <Delete deleteMe={deleteMe} />
      <PlayStop running={running} toggleStatus={toggleStatus} />
    </TimeBox>
  )
}

const Task = ({task, tagsObj, taskId, updateTask, deleteMe}) => {

  const taskInp = useRef(null);
  const { title, tags } = task;
  const [ localTitle, setLocalTitle] = useState(title);
  const [ editable, setEditable] = useState(false);

  const handleTitleChange = () => {
    if(localTitle !== title) {
      const update = { ...task};
      update.title = localTitle;
      const obj = {};
      obj[taskId] = update;
      updateTask(obj);
    }
    setEditable((prev) => !prev);
  }
  
  return (
    <TaskBox>
      {!editable ? 
        <><TaskName ref={taskInp}>{title}<FaPencilAlt onClick={()=>handleTitleChange()} style={{margin:'0px 5px'}} /></TaskName></> :
        <><TaskNameInput value={localTitle} onChange={e => setLocalTitle(e.target.value)} /><FaCheck onClick={()=>handleTitleChange()} style={{color:'green', margin:'0px 15px'}} /></> 
      }
      <br />
      {tags && tags.map((tagId) => {
        return <Tag key={tagId}>{tagsObj[tagId]}</Tag>
      })}
      <Timer taskId={taskId} task={task} updateTask={updateTask} deleteMe={deleteMe} />
    </TaskBox>
  )
}

export const _ViewTasks = ({ tasks, tags, updateTask, deleteTask, filter }) => {

  const { search, show, tagIds } = filter;

  let tasksToShow = (tasks && Object.keys(tasks).reverse()) || [];

  if(search !== '' || show !== ALL || tagIds.length){
    tasksToShow = tasksToShow.filter((taskId)=>{
      const { title, running, tags  } = tasks[taskId];
      const inSearchQuery = title.toLowerCase().includes(search.toLowerCase());
      const inShowQuery = (running && show === RUNNING) || (!running && show === STOPPED) || show === ALL;
      const hasTags = tagIds.length === 0 ? true : tagIds.some(r=> tags.indexOf(r) >= 0)
      return inSearchQuery && inShowQuery && hasTags;
    })
  }

  return(
  <div>
    { tasksToShow.map((taskId) => {
      return <Task key={taskId} taskId={taskId} task={tasks[taskId]} tagsObj={tags} updateTask={updateTask} deleteMe={() => deleteTask(taskId)} />
    })}
    { tasksToShow.length === 0 ? <div style={{ textAlign: 'center', width: '100%' }}>No Task to Show</div>: ''}
  </div>
  )
}

const mapStateToProps = ({tags, tasks}) => {
  return {
    tags,
    tasks
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateTask : (task) => dispatch(UpdateTask(task)),
    deleteTask : (taskId) => dispatch(DeleteTask(taskId)),
  }
}

export const ViewTasks = connect(mapStateToProps, mapDispatchToProps)(_ViewTasks);