import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useState } from "react";
import {
  Clock4,
  FileText,
  Save,
  Star,
  TextAlignStart,
  TimerIcon,
  Trash2,
} from "lucide-react";

const TaskAddComponent = () => {
  const rec = {
    title: "",
    description: "",
    duedate: "",
  };
  const [recs, setrecs] = useState(rec);

  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setrecs({ ...recs, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/addtask`,
        {
          ...recs,
        },
        { withCredentials: true },
      );
      if (response.data.success) {
        setTimeout(() => {
          toast.success(response.data.message, { position: "top-right" });
          navigate("/dashCompTaskLedger");
        }, 1000);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.errormessage, {
          position: "top-right",
        });
      }
    }
  };

  return (
    <div className="h-full w-[80%] bg-gray-100 overflow-x-hidden flex justify-center items-center flex-col ">
      <div className="h-40 w-150 flex justify-center items-center flex-col">
        <h2 className="text-3xl">Create task details</h2>
        <h4 className="text-slate-600">
          Creation will be saved to your task ledger immediately.
        </h4>
      </div>
      <div className="h-130 w-150 bg-white  rounded-2xl ">
        <form onSubmit={submitHandler}>
          <div className="flex justify-center  p-3 items-center flex-col gap-4">
            <div className="flex justify-center items-center gap-2">
              <TextAlignStart size={"15px"} />
              <label htmlFor="task">Task</label>
            </div>
            <input
              type="text"
              name="title"
              className="bg-gray-100 p-4 w-full rounded-2xl"
              id="task"
              onChange={inputHandler}
              value={recs.title}
            />
            <div className="flex justify-center items-center gap-2">
              <FileText size={"15px"} />
              <label htmlFor="taskdes">Description</label>
            </div>
            <input
              type="text"
              name="description"
              className="bg-gray-100 p-4 w-full rounded-2xl"
              id="taskdes"
              onChange={inputHandler}
              value={recs.description}
            />
            <div className="flex justify-center items-center gap-2">
              <TimerIcon size={"15px"} />
              <label htmlFor="date">Due Date</label>
            </div>
            <input
              type="date"
              name="duedate"
              className="bg-white p-4 rounded-2xl"
              id="date"
              onChange={inputHandler}
              value={recs.duedate}
            />
          </div>

          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="text-white bg-[#6d5df0] p-2 rounded cursor-pointer flex justify-center items-center gap-2
"
            >
              <Save size={"15px"} />
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskAddComponent;
