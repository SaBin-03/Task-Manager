import axios from "axios";
import React, { useEffect, useState } from "react";

const TaskLedgerComponent = () => {

    const [todos, settodos] = useState([]);

  useEffect(() => {
    const gettaskfun = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/getTaskWithId`,
          {
            withCredentials: true,
          },
        );
        if(response.data.success){
            settodos(response.data.tasks);
        }
      } catch (error) {
        console.log(error);
      }
    };
    gettaskfun();
  }, []);

  return (
    <div className="h-full w-[80%] bg-gray-50">
        <div>
            {todos.map((todo,idx)=>(
                <div key={idx}>{todo.title}</div>
            ))}
        </div>
    </div>
  )
};

export default TaskLedgerComponent;
