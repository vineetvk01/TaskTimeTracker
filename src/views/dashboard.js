import React from 'react';
import { AddHeaderHOC } from '../hoc/Addheader';
import { TaskManager } from '../components/Dashboard';

const _DashBoard = () => {
  return (
    <TaskManager />  
  )
}

export const DashBoard = (AddHeaderHOC(_DashBoard));