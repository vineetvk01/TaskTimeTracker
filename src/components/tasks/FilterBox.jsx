import React from 'react';
import { FilterButton, Tag } from '../styled-components';
import { connect } from 'react-redux';

export const ALL = 'all';
export const RUNNING = 'running';
export const STOPPED = 'stopped';

export const _FilterBox = ({ filter, setFilter, tags }) => {

  const { show, tagIds } = filter;

  console.log('Initial tag id', tagIds);
  
  const handleShow = (value) => {
    if( show === value ) return;
    setFilter((prev) => {
      prev.show = value;
      console.log(prev);
      return {...prev};
    })
  }

  const handleSelectTags = (tagId) => {
    let tags = [...tagIds];

    if(tags.includes(tagId)){
      tags = tags.filter((id) => id !== tagId);
    }else{
      tags.push(tagId);
    }

    setFilter((prev) => {
      prev.tagIds = tags;
      console.log(prev);
      return {...prev};
    })

  }

  return(
  <div>
    <p>Filter </p>
    <p>Show Tasks</p>
    <FilterButton selected={show === RUNNING} onClick={(e)=> handleShow(RUNNING)}>Running</FilterButton>
    <FilterButton selected={show === STOPPED} onClick={(e)=> handleShow(STOPPED)} >Stopped</FilterButton>
    <FilterButton selected={show === ALL} onClick={(e)=> handleShow(ALL)}>All</FilterButton>
    <p>Select Tags</p>
    { 
      Object.keys(tags).map(tagId => {
      return <Tag key={tagId} selected={tagIds.includes(tagId)} onClick={()=>handleSelectTags(tagId)}>{tags[tagId]}</Tag>
      })
    }
  </div>
  )
}

const mapStateToProps = ({tags}) => {
  return {
    tags,
  }
}

export const FilterBox = connect(mapStateToProps, null)(_FilterBox);
