import React, { createContext, useState, useEffect } from "react";
import authService from "../service/AuthService";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = await authService.getUser();
      setUser(userInfo);
    };
    fetchUser();
  }, []);
  // console.log(user);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
