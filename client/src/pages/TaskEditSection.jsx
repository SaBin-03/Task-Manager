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
  Trash2,
} from "lucide-react";

const TaskEditSection = () => {
  const rec = {
    title: "",
    description: "",
  };
  const [recs, setrecs] = useState(rec);
  const [priority, setPriority] = useState("");
  const [isactiveStatus, setisactiveStatus] = useState("");
  const [isactivePriority, setisactivePriority] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const func = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/specifictask/${id}`,
          { withCredentials: true },
        );
        setrecs(response.data.task);
        setisactiveStatus(response.data.task.status);
        setisactivePriority(response.data.task.priority);
      } catch (error) {
        console.log(error);
      }
    };
    func();
  }, [id]);

  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setrecs({ ...recs, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:4000/api/update/${id}`,
        {
          ...recs,
          status: isactiveStatus,
          priority: isactivePriority,
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

  const deleteHandler = async () => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/deleteTask/${id}`,
        {
          withCredentials: true,
        },
      );
      if (response.data.success) {
        setTimeout(() => {
          toast.success(response.data.message, { position: "top-right" });
          navigate("/dashCompTaskLedger");
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-full w-[80%] bg-gray-100 overflow-x-hidden flex justify-center items-center flex-col ">
      <div className="h-40 w-150 flex justify-center items-center flex-col">
        <h2 className="text-3xl">Update task details</h2>
        <h4 className="text-slate-600">
          Changes will be saved to your task ledger immediately.
        </h4>
      </div>
      <div className="h-150 w-150   rounded-2xl ">
        <form onSubmit={submitHandler}>
          <div className="flex justify-center  p-3 items-center flex-col gap-4">
            <div className="flex justify-center items-center gap-2">
              <TextAlignStart size={"15px"} />
              <label htmlFor="task">Task</label>
            </div>
            <input
              type="text"
              name="title"
              className="bg-white p-4 w-full rounded-2xl"
              id="task"
              value={recs.title}
              onChange={inputHandler}
            />
            <div className="flex justify-center items-center gap-2">
              <FileText size={"15px"} />
              <label htmlFor="taskdes">Description</label>
            </div>
            <input
              type="text"
              name="description"
              className="bg-white p-4 w-full rounded-2xl"
              id="taskdes"
              value={recs.description}
              onChange={inputHandler}
            />
          </div>

          <div className="flex justify-center items-center h-40  ">
            <div className=" h-full  w-full flex justify-center items-center flex-col ">
              <div className="flex justify-center items-center gap-2">
                <Clock4 size={"15px"} />
                <h2>Status</h2>
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => setisactiveStatus("Pending")}
                  className={`p-2 rounded-2xl m-3 cursor-pointer transition-all ${
                    isactiveStatus === "Pending"
                      ? "bg-[#6d5df0] text-white"
                      : "bg-white"
                  }`}
                >
                  Pending
                </button>

                <button
                  type="button"
                  onClick={() => setisactiveStatus("Completed")}
                  className={`p-2 rounded-2xl cursor-pointer transition-all ${
                    isactiveStatus === "Completed"
                      ? "bg-[#6d5df0] text-white"
                      : "bg-white"
                  }`}
                >
                  Completed
                </button>
              </div>
            </div>
            <div className=" h-full  w-full flex justify-center items-center flex-col ">
              <div className="flex justify-center items-center gap-2">
                <Star size={"15px"} />
                <h2>Priority</h2>
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => setisactivePriority("High")}
                  className={`p-2 rounded-2xl m-3 cursor-pointer transition-all ${
                    isactivePriority === "High"
                      ? "bg-[#6d5df0] text-white"
                      : "bg-white"
                  }`}
                >
                  High
                </button>

                <button
                  type="button"
                  onClick={() => setisactivePriority("Medium")}
                  className={`p-2 rounded-2xl cursor-pointer transition-all ${
                    isactivePriority === "Medium"
                      ? "bg-[#6d5df0] text-white"
                      : "bg-white"
                  }`}
                >
                  Medium
                </button>
                <button
                  type="button"
                  onClick={() => setisactivePriority("Low")}
                  className={`p-2 rounded-2xl cursor-pointer transition-all ${
                    isactivePriority === "Low"
                      ? "bg-[#6d5df0] text-white"
                      : "bg-white"
                  }`}
                >
                  Low
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-between">
            <button
              type="submit"
              className="text-white bg-[#6d5df0] p-2 rounded cursor-pointer flex justify-center items-center gap-2
"
            >
              <Save size={"15px"} />
              Save Changes
            </button>
            <button
              onClick={deleteHandler}
              type="button"
              className="text-red-700 hover:bg-red-100 cursor-pointer p-2 rounded transition-all flex justify-center items-center gap-2"
            >
              <Trash2 size={"15px"} />
              Delete Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskEditSection;
