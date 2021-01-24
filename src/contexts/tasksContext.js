import React, { createContext, useState } from "react";
import AsyncStorage from "@react-native-community/async-storage";

const TasksContext = createContext();

const TasksContextProvider = (props) => {
  const [tasks, setTasks] = useState([]);

  const addTasks = async (data) => {
    setTasks([...data]);

    try {
      const jsonData = JSON.stringify([...data]);
      await AsyncStorage.setItem("tasks", jsonData);
    } catch (e) {
      // saving error
      console.log(e);
    }
  };

  if (tasks.length === 0) {
    AsyncStorage.getItem("tasks")
      .then((data) => {
        const parsedData = data != null ? JSON.parse(data) : false;

        setTasks([...parsedData]);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  return (
    <TasksContext.Provider value={{ tasks, addTasks }}>
      {props.children}
    </TasksContext.Provider>
  );
};

export { TasksContextProvider, TasksContext };
