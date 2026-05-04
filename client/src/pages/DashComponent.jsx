import React from "react";
import { useContext } from "react";
import { Authcontext } from "../context/callcontext";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import {
  AlarmClockOff,
  ChartBarDecreasing,
  CircleCheck,
  Clock4,
} from "lucide-react";

const DashComponent = () => {
  const [totalTask, settotalTask] = useState(0);
  const [progress, setprogress] = useState(0);
  const [completed, setcompleted] = useState(0);
  const [overdue, setoverdue] = useState(0);

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const name = JSON.parse(localStorage.getItem("user"))?.name;

  useEffect(() => {
    const getNoteFun = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/getTaskWithId`,
          {
            withCredentials: true,
          },
        );
        if (response.data.success) {
          const tTask = response.data.tasks;
          settotalTask(tTask.length);
          const pendingCount = tTask.filter(
            (task) => task.status === "Pending",
          ).length;
          const completedCount = tTask.filter(
            (task) => task.status === "Completed",
          ).length;
          const overdueCount = tTask.filter((task) => {
            const due = new Date(task.duedate);
            return due < today && task.status !== "Completed";
          }).length;

          setprogress(pendingCount);
          setcompleted(completedCount);
          setoverdue(overdueCount);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getNoteFun();
  }, []);

  return (
    <div className="h-full w-[80%] bg-[#f4f6fb]">
      <div className=" h-30 w-full flex justify-between items-center p-3 ">
        <div>
          <h2 className="text-3xl">Hello, {name}</h2>
          <h2>{formattedDate}</h2>
        </div>
        <div className="h-10 w-10 cursor-pointer rounded-full">
          <img src="/icon.png" />
        </div>
      </div>
      <div className="h-130  w-full flex justify-center items-center">
        <div className="h-full w-[50%]  m-3  grid grid-cols-2">
          <div className="col-span-1 bg-white m-2 rounded-2xl p-5 flex  flex-col gap-4">
            <ChartBarDecreasing color="#539dfd" size={"35px"} />
            <div className="flex justify-cennter item-center flex-col gap-4">
              <h2 className="text-slate-600 text-2xl">Total tasks</h2>
              <h2 className="text-3xl font-bold">{totalTask}</h2>
            </div>
          </div>
          <div className="col-span-1 bg-white m-2 rounded-2xl p-5 flex  flex-col gap-4">
            <Clock4 color="#ee792b" size={"35px"} />
            <div className="flex justify-cennter item-center flex-col gap-4">
              <h2 className="text-slate-600 text-2xl">In progress</h2>
              <h2 className="text-3xl font-bold">{progress}</h2>
            </div>
          </div>
          <div className="col-span-1 bg-white m-2 rounded-2xl p-5 flex  flex-col gap-4">
            <CircleCheck color="#44ff00" size={"35px"} />
            <div className="flex justify-cennter item-center flex-col gap-4">
              <h2 className="text-slate-600 text-2xl">Completed</h2>
              <h2 className="text-3xl font-bold">{completed}</h2>
            </div>
          </div>
          <div className="col-span-1 bg-white m-2 rounded-2xl p-5 flex  flex-col gap-4">
            <AlarmClockOff color="#f42525" size={"35px"} />
            <div className="flex justify-cennter item-center flex-col gap-4">
              <h2 className="text-slate-600 text-2xl">Overdue</h2>
              <h2 className="text-3xl font-bold">{overdue}</h2>
            </div>
          </div>
        </div>
        <div className="h-full w-[50%]  m-3 rounded-2xl"></div>
      </div>
    </div>
  );
};

export default DashComponent;
