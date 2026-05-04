import axios from "axios";
import { Dot } from "lucide-react";
import React, { useEffect, useState } from "react";

const TaskLedgerComponent = () => {
  const [todos, settodos] = useState([]);

const getPriorityDotColor = (priority) => {
  switch (priority) {
    case "High":
      return "text-red-500";
    case "Medium":
      return "text-yellow-500";
    case "Low":
      return "text-green-500";
    default:
      return "text-gray-400";
  }
};



  useEffect(() => {
    const gettaskfun = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/getTaskWithId`,
          {
            withCredentials: true,
          },
        );
        if (response.data.success) {
        const formattedTasks = response.data.tasks.map((task) => {
          const dateObj = new Date(task.duedate);

          const formattedDate = dateObj.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
          });

          return {
            ...task,
            duedate: formattedDate,
          };
        });

        settodos(formattedTasks);
      }
      } catch (error) {
        console.log(error);
      }
    };
    gettaskfun();
  }, []);

  return (
    <div className="h-full w-[80%] bg-gray-50 overflow-x-hidden">
      <div className="h-[15vh]     w-full"></div>
      <div className=" w-full p-3 flex justify-center items-start flex-col ">
        <div className=" h-16  w-full grid grid-cols-4 items-center place-items-center border border-slate-300 bg-[#fafaf8]">
          <h2 className="font-semibold text-slate-600">TASK</h2>
          <h2 className="font-semibold text-slate-600">STATUS</h2>
          <h2 className="font-semibold text-slate-600">PRIORITY</h2>
          <h2 className="font-semibold text-slate-600">DUE DATE</h2>
        </div>
        {todos.map((todo,idx) => (
          <div key={idx} className="  h-16  w-full grid grid-cols-4 items-center place-items-center border border-slate-200 bg-white hover:bg-[#fafaf8]">
            <h2 className="font-sans">{todo.title}</h2>
            <h2 className={`font-sans rounded-2xl p-2  ${todo.status === "Completed" ? "bg-[#EAF3DE] text-[#27500A]" : "bg-[#FAEEDA] text-[#633806]"}`}>{todo.status}</h2>
            <h2 className="font-sans rounded-2xl p-2 flex  place-items-center"><Dot size={"53px"} className={`${getPriorityDotColor(todo.priority)}`} />{todo.priority}</h2>
            <h2 className="font-sans">{todo.duedate}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskLedgerComponent;
