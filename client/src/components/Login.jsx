import { Eye, EyeOff } from "lucide-react";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Authcontext } from "../context/callcontext";

const Login = () => {
    const { isloggedin,setisloggedin } = useContext(Authcontext);
  const navigate = useNavigate();
  const [isvisible, setisvisible] = useState(false);
  const [users, setusers] = useState({
    name: "",
    email: "",
    password: "",
  });

  const inputHandler = (e) => {
    const { name, value } = e.target;

    setusers({ ...users, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/login`,
        users,
        {
          withCredentials: true,
        },
      );
      if (response.data.success) {
        setisloggedin(true);
        const { name, email,token } = response.data.regsiteredUser;
        const safeUser = { name, email};
        localStorage.setItem("Atoken",token);
        localStorage.setItem("user", JSON.stringify(safeUser));
        toast.success(response.data.message, { position: "top-right" });
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed", {
        position: "top-right",
      });
    }
  };

  return (
    <div className="h-screen w-full bg-[#f5f4f0] grid grid-cols-2">
      <div className=" grid grid-rows-9 col-span-1">
        <Link to={"/"}>
          <div className="row-span-1  p-3">
            <h2 className="font-space text-4xl font-bold tracking-tighter">
              TAS<span className="text-blue-600">k</span>
            </h2>
          </div>
        </Link>
        <div className="row-span-8">
          <div className="flex justify-center items-center">
            <h2 className="text-4xl">Login to your account</h2>
          </div>
          <div className="h-[90%]  m-3  flex justify-center items-center">
            <form
              onSubmit={submitHandler}
              className=" h-[90%] w-[60%] p-2 grid grid-rows-5"
            >
              <div className="flex flex-col gap-2">
                <label className="text-gray-500" htmlFor="email">
                  Email
                </label>
                <input
                  onChange={inputHandler}
                  className="h-11 p-3  rounded-2xl bg-white border border-slate-300 focus:ring-2 focus:ring-blue-600 outline-none"
                  type="email"
                  name="email"
                  value={users.email}
                  id="email"
                  placeholder="abc@gmail.com"
                />
              </div>
              <div className="flex flex-col gap-2 relative">
                <label className="text-gray-500" htmlFor="password">
                  Password
                </label>
                <input
                  onChange={inputHandler}
                  className="h-11  p-3 relative rounded-2xl bg-white border border-slate-300 focus:ring-2 focus:ring-blue-600 outline-none"
                  type={isvisible ? "text" : "password"}
                  name="password"
                  id="password"
                  value={users.password}
                  placeholder="*********"
                />
                <button
                  onClick={() => setisvisible(!isvisible)}
                  className="absolute right-2 top-11 cursor-pointer"
                >
                  {isvisible ? <Eye size={"20"} /> : <EyeOff size={"20"} />}
                </button>
              </div>
              <div>
                <button
                  className="h-15 rounded-2xl text-white shadow-md shadow-blue-500/20  w-full bg-blue-600 cursor-pointer hover:bg-blue-700 active:scale-95 transition-all font-space "
                  type="submit"
                >
                  Submit
                </button>
              </div>
              <div className="place-items-center">
                <h2>
                  Need an account?{" "}
                  <Link to={"/register"} className="text-blue-500 underline">
                    Register
                  </Link>
                </h2>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className=" col-span-1 overflow-hidden p-4">
        <img
          className="h-full w-full object-cover rounded-2xl bg-[#121212] shadow-xl"
          src="/register.avif"
          alt=""
        />
      </div>
    </div>
  );
};

export default Login;
