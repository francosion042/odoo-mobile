import React, { createContext, useState } from "react";
import AsyncStorage from "@react-native-community/async-storage";

const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [user, setUser] = useState(false);

  if (!user) {
    AsyncStorage.getItem("user").then((data) => {
      const jsonData = data != null ? JSON.parse(data) : false;

      setUser(jsonData);
    });
  }

  ////////////////////////////////////////////////////////////////
  const createUser = async (data) => {
    setUser({ ...data });

    try {
      const jsonData = JSON.stringify({ ...data });
      await AsyncStorage.setItem("user", jsonData);
    } catch (e) {
      // saving error
      console.log(e);
    }
  };

  const removeUser = async () => {
    AsyncStorage.removeItem("user");
    setTimeout(() => {
      setUser(false);
    }, 2000);
  };

  return (
    <AuthContext.Provider value={{ user, createUser, removeUser }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContextProvider, AuthContext };
