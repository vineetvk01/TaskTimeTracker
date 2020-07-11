import React, {useState} from 'react';
import { connect } from 'react-redux'
import { TaskInput, CreateButton, Tag, Add } from '../styled-components';
import { FaPlus } from 'react-icons/fa';
import { UpdateTags } from '../../redux/reducers/tags';
import { AddNewTask } from '../../redux/reducers/tasks';
import { v4 as uuidv4 } from 'uuid'; 

export const _CreateTask = ({ tags, updateTags, addNewTask }) => {

  console.log(tags);

  const [task, setTask] = useState('');
  const [newTag, setNewTag] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);

  const handleNewTag = () => {

    if(newTag === '') return;

    const updatedTags = {...tags};
    const newId = uuidv4();
    updatedTags[newId] = newTag;
    updateTags(updatedTags);
    setNewTag('');
  }

  const handleNewTask = () => {

    if(task === '') return;

    const id = uuidv4();

    const taskToAdd = {
      title: task,
      tags: [...selectedTags],
      timeLapsed: 0,
      startedAt: 0,
      running: false
    }

    const temp = {};
    temp[id] = taskToAdd;

    addNewTask(temp);
    setTask('');
    setSelectedTags([]);
  }

  const handleSelectTags = (tagId) => {
    let tags = [...selectedTags];
    if(tags.includes(tagId)){
      tags = tags.filter((id) => id !== tagId);
    }else{
      tags.push(tagId);
    }
    setSelectedTags(tags);
  }

  return(
  <div>
    <TaskInput value={task} onChange={(e)=>setTask(e.target.value)} placeholder='Enter new Task' />
    <br />
    <p>Choose Tags :</p>
    { tags && Object.keys(tags).map(tagId => ( 
      <Tag key={tagId} selected={selectedTags.includes(tagId)} onClick={()=>handleSelectTags(tagId)} >{tags[tagId]}</Tag>
      )
    )}
    <div style={{clear: 'both'}} />
    <TaskInput value={newTag} onChange={(e)=>setNewTag(e.target.value)} style={{ width: '76%'}} placeholder='Add new tag ? ' />
    <Add onClick={(e)=>handleNewTag()}><FaPlus /></Add>
    <CreateButton onClick={e => handleNewTask()}>Create</CreateButton>
  </div>
  )
}

const mapStateToProps = ({tags}) => {
  return {
    tags,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateTags: (tags) => dispatch(UpdateTags(tags)),
    addNewTask: (task) => dispatch(AddNewTask(task)),
  }
}

export const CreateTask = connect(mapStateToProps, mapDispatchToProps)(_CreateTask);