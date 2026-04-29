import { UserRoundPlus } from "lucide-react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { Authcontext } from "../context/callcontext";
import axios from "axios";

const Navbar = () => {
  const { isloggedin } = useContext(Authcontext);



  return (
    <div className="h-[10vh] bg-[#f5f4f0]/80 backdrop-blur-md w-full sticky top-0 z-50 border-b border-black/5">
      <div className="h-full w-[70%] mx-auto flex justify-between items-center">
        <h2 className="font-space text-4xl font-bold tracking-tighter">
          TAS<span className="text-blue-600">k</span>
        </h2>

        <div className="flex justify-center gap-3 items-center">
          {isloggedin ? (
            <></>
          ) : (
            <Link to={"/register"}>
              <button className="bg-white border border-black/10 cursor-pointer active:scale-95 transition-all font-space text-[#0d0d12] px-5 rounded-lg py-2 text-sm font-medium shadow-sm">
                Get for free
              </button>
            </Link>
          )}

          {isloggedin ? (
            <button
              onClick={logoutHandler}
              className="bg-red-600 cursor-pointer hover:bg-red-700 active:scale-95 transition-all font-space text-white px-5 py-2 rounded-lg flex items-center gap-2 text-sm font-medium shadow-md shadow-blue-500/20"
            >
              Logout <UserRoundPlus size={18} />
            </button>
          ) : (
            <Link to={"/login"}>
              <button className="bg-blue-600 cursor-pointer hover:bg-blue-700 active:scale-95 transition-all font-space text-white px-5 py-2 rounded-lg flex items-center gap-2 text-sm font-medium shadow-md shadow-blue-500/20">
                Login <UserRoundPlus size={18} />
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
