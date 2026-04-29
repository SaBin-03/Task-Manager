import { BookOpenCheck, LayoutDashboard, LogOut } from "lucide-react";
import { NavLink } from "react-router-dom";
import { PlusCircle } from "lucide-react";
import axios from "axios";

const Sidebar = () => {
  const logoutHandler = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-full w-[20%] relative">
      <div className="w-full h-20  p-4 flex justify-center items-center flex-col">
        <div className="flex justify-center  items-center p-2 rounded cursor-pointer">
          <img className="h-15" src="/logo.png" alt="logo" />
          <h2 className="text-3xl">
            Task<span className="text-cyan-700">Manager</span>
          </h2>
        </div>
      </div>
      <div className="w-full h-80 mt-4 grid grid-cols-1 grid-rows-4   gap-4 ">
        <NavLink to={"/dashboard"}>
          <div className="w-full  row-span-1 h-full maindiv hover:bg-gray-50 transition-colors flex justify-center items-center">
            <div className="flex gap-4 ">
              <span>
                <LayoutDashboard />
              </span>{" "}
              <h2 className="text-xl">Dashboard</h2>
            </div>
          </div>
        </NavLink>
        <NavLink to={"/dashCompTaskLedger"}>
          <div className="row-span-1 h-full w-full hover:bg-gray-50 maindiv transition-colors flex justify-center items-center">
            <div className="flex gap-4">
              <span>
                <BookOpenCheck />
              </span>{" "}
              <h2 className="text-xl">Task Ledger</h2>
            </div>
          </div>
        </NavLink>
        <NavLink className={"flex gap-3"} to={"/dashCompTask"}>
          <div className="row-span-1 h-full w-full maindiv hover:bg-gray-50 transition-colors flex justify-center items-center">
            <div className="flex gap-4">
              <span>
                <PlusCircle />
              </span>{" "}
              <h2 className="text-xl">Quick capture</h2>
            </div>
          </div>
        </NavLink>
      </div>
      <div
        className="absolute bottom-5 left-0  flex cursor-pointer transition-all
            hover:bg-linear-to-r
            hover:from-red-50/40
            hover:to-red-100/50 hover:border-r-4 hover:border-r-red-500 justify-center items-center h-15 w-full"
      >
        <button className="flex gap-3 cursor-pointer">
          <LogOut />
          <h2 className="text-xl">Logout</h2>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
