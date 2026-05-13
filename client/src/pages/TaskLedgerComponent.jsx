import axios from "axios";
import { Dot, SquarePen } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TaskLedgerComponent = () => {
  const [todos, settodos] = useState([]);
  const [statusfilter, setstatusfilter] = useState("All");
  const [priorityfilter, setpriorityfilter] = useState("All");
  const [isedit, setisedit] = useState(false);

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
          { withCredentials: true },
        );
        if (response.data.success) {
          const formattedTasks = response.data.tasks.map((task) => {
            const dateObj = new Date(task.duedate);
            return {
              ...task,
              duedate: dateObj.toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
              }),
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

  const filteredTodos = todos.filter((todo) => {
    const statusMatch = statusfilter === "All" || todo.status === statusfilter;
    const priorityMatch =
      priorityfilter === "All" || todo.priority === priorityfilter;
    return statusMatch && priorityMatch;
  });

  return (
    <div className="h-full w-[80%] bg-gray-50 overflow-x-hidden relative">
      {isedit && (
        <div className="fixed h-screen w-full flex items-center">
          <div className="h-150 w-200 bg-red-300">
            <input
              type="text"
              name="task"
              id="task"
              className="bg-white p-4"
              placeholder="Task"
            />
          </div>
        </div>
      )}

      <div className="h-[10vh] m-2 w-full grid grid-cols-2">
        <div>
          <h1 className="ml-2 font-bold text-xs text-gray-500">STATUS</h1>
          <button
            onClick={() => setstatusfilter("All")}
            className="px-3 bg-slate-100 m-2 rounded-2xl cursor-pointer"
          >
            All
          </button>
          <button
            onClick={() => setstatusfilter("Completed")}
            className="px-3 bg-[#EAF3DE] text-[#27500A] cursor-pointer m-2 rounded-2xl"
          >
            Completed
          </button>
          <button
            onClick={() => setstatusfilter("Pending")}
            className="px-3 bg-[#FAEEDA] text-[#633806] cursor-pointer m-2 rounded-2xl"
          >
            Pending
          </button>
        </div>
        <div>
          <h1 className="ml-2 font-bold text-xs text-gray-500">PRIORITY</h1>
          <button
            onClick={() => setpriorityfilter("All")}
            className="px-3 bg-slate-100 m-2 rounded-2xl cursor-pointer"
          >
            All
          </button>
          <button
            onClick={() => setpriorityfilter("High")}
            className="px-3 bg-red-400 text-white cursor-pointer m-2 rounded-2xl"
          >
            High
          </button>
          <button
            onClick={() => setpriorityfilter("Medium")}
            className="px-3 bg-yellow-400 cursor-pointer m-2 rounded-2xl"
          >
            Medium
          </button>
          <button
            onClick={() => setpriorityfilter("Low")}
            className="px-3 bg-green-400 text-white cursor-pointer m-2 rounded-2xl"
          >
            Low
          </button>
        </div>
      </div>

      <div className="w-full p-3 flex justify-center items-start flex-col">
        <div className="h-12 w-full grid grid-cols-4 items-center border border-slate-300 bg-[#fafaf8] px-6">
          <h2 className="font-semibold text-slate-600 text-sm">TASK</h2>
          <h2 className="font-semibold text-slate-600 text-sm">STATUS</h2>
          <h2 className="font-semibold text-slate-600 text-sm">PRIORITY</h2>
          <h2 className="font-semibold text-slate-600 text-sm">DUE DATE</h2>
        </div>

        {filteredTodos.length === 0 ? (
          <div className="w-full h-[60vh] flex flex-col items-center justify-center border-x border-b border-slate-200 bg-white">
            <div className="h-28 w-28 rounded-full bg-blue-50 flex items-center justify-center">
              <img
                src="/imgtask.png"
                alt="empty"
                className="h-16 w-16 opacity-70"
              />
            </div>

            <h1 className="mt-6 text-3xl font-bold text-slate-700">
              No tasks yet
            </h1>

            <p className="text-slate-500 mt-2 text-center">
              You haven’t added any tasks yet. <br />
              Create your task to get started.
            </p>

            <Link to={"/dashCompTaskAddSection"}>
                <button className="mt-6 bg-blue-600 hover:bg-blue-700 transition-all text-white px-6 py-3 rounded-xl shadow-md cursor-pointer">
              + Add Task
            </button>
            </Link>
          </div>
        ) : (
          filteredTodos.map((todo, idx) => (
            <div
              key={idx}
              className="h-16 w-full grid grid-cols-4 items-center border-x border-b border-slate-200 bg-white hover:bg-[#fafaf8] px-6"
            >
              <div className="flex items-center gap-4">
                <Link to={`/dashCompTaskEditSection/${todo._id}`}>
                  <SquarePen
                    size={18}
                    className="cursor-pointer text-slate-500 hover:text-black"
                  />
                </Link>

                <h2 className="font-sans whitespace-nowrap overflow-hidden text-ellipsis">
                  {todo.title}
                </h2>
              </div>

              <div className="flex justify-start">
                <h2
                  className={`font-sans rounded-2xl px-3 py-1 text-sm ${
                    todo.status === "Completed"
                      ? "bg-[#EAF3DE] text-[#27500A]"
                      : "bg-[#FAEEDA] text-[#633806]"
                  }`}
                >
                  {todo.status}
                </h2>
              </div>

              <div className="flex items-center">
                <div className="flex items-center -ml-4">
                  <Dot
                    size={48}
                    className={`${getPriorityDotColor(todo.priority)}`}
                  />
                  <span className="font-sans text-sm -ml-2">
                    {todo.priority}
                  </span>
                </div>
              </div>

              <div className="flex justify-start">
                <h2 className="font-sans text-sm text-slate-600">
                  {todo.duedate}
                </h2>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TaskLedgerComponent;
