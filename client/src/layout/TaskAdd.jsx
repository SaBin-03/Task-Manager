
import React from 'react'
import Sidebar from '../constants/Sidebar'
import TaskAddComponent from '../pages/TaskAddComponent'

const TaskAdd = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <Sidebar />
      <TaskAddComponent />

    </div>
  )
}

export default TaskAdd
