import { BookOpenCheck, LayoutDashboard, LogOut } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { PlusCircle } from "lucide-react";
import axios from "axios";
import { useContext, useState } from "react";
import { Authcontext } from "../context/callcontext";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";

const Sidebar = () => {
  const { token, settoken, isloggedin, setisloggedin } =
    useContext(Authcontext);
  const navigate = useNavigate();
  const [loading, setloading] = useState(false)

  const logoutHandler = async () => {
    if (loading) return;
    setloading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/logout`,
        {},
        { withCredentials: true },
      );

      if (response.data.success) {
        setisloggedin(false);

        toast.success(response.data.message, {
          position: "top-right",
        });

        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error("Logout failed");
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="h-full w-[20%] relative">
      <div className="w-full h-20  p-4 flex justify-center items-center flex-col">
        <div className="flex justify-center  items-center p-2 rounded cursor-pointer">
          <img className="h-15" src="/logo.png" alt="logo" />
          <h2 className="text-2xl">
            Task<span className="text-[#6d5df0]">Manager</span>
          </h2>
        </div>
      </div>
      <h4 className="ml-3 text-slate-500 uppercase">Workspace</h4>
      <div className="w-full h-80 mt-4 grid grid-cols-1 grid-rows-4   gap-4 ">
        <NavLink to={"/dashboard"}>
          <div className="w-full  row-span-1 h-full maindiv hover:bg-gray-50 transition-colors flex justify-center items-center">
            <div className="flex gap-4 ">
              <span>
                <LayoutDashboard />
              </span>{" "}
              <h3 className="text-xl">Dashboard</h3>
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
        <NavLink className={"flex gap-3"} to={"/dashCompTaskAddSection"}>
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
        <button onClick={logoutHandler} className="flex gap-3 w-full items-center justify-center cursor-pointer">
          <LogOut />
          <h2 className="text-xl">Logout</h2>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
