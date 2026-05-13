import React from "react";
import Sidebar from "../constants/Sidebar";
import TaskEditSection from "../pages/TaskEditSection";

const TaskEdit = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <Sidebar />
      <TaskEditSection />
    </div>
  );
};

export default TaskEdit;
