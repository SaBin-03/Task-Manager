import React from 'react'
import DashComponentTask from '../pages/DashComponentTask'
import Sidebar from '../constants/Sidebar'

const AddDash = () => {
  return (
    <div className='h-screen w-screen flex justify-center items-center'>
        <Sidebar />
        <DashComponentTask />
    </div>
  )
}

export default AddDash
