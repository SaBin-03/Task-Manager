import { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import axios from "axios";

export const Authcontext = createContext();

export const Contextprovider = ({ children }) => {
  const [isloggedin, setisloggedin] = useState(null);
  const [name, setname] = useState(null);
  useEffect(() => {
    const auth = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/me`,
          {
            withCredentials: true,
          },
        );
        if (response.data.success) {
          setisloggedin(true);
          setname(response.data.userName);
        }
      } catch (error) {
        setisloggedin(false);
        setname("User");
        console.log(error);
      }
    };
    auth();
  }, []);
  return (
    <Authcontext.Provider value={{ isloggedin, setisloggedin ,name,setname}}>
      {children}
    </Authcontext.Provider>
  );
};
