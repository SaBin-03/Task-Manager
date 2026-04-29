import React from 'react'
import Sidebar from '../constants/Sidebar'
import TaskLedgerComponent from '../pages/TaskLedgerComponent';

const TaskLedgerLayout = () => {
  return (
    <div className='h-screen w-screen flex justify-center items-center'>
        <Sidebar />
        <TaskLedgerComponent />
    </div>
  )
}

export default TaskLedgerLayout;
