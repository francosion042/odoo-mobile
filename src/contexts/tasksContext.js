import React, { createContext, useState } from "react";

const TasksContext = createContext();

const TasksContextProvider = (props) => {
  const [tasks, setTasks] = useState([]);

  const addTasks = (data) => {
    setTasks([...data]);
  };

  return (
    <TasksContext.Provider value={{ tasks, addTasks }}>
      {props.children}
    </TasksContext.Provider>
  );
};

export { TasksContextProvider, TasksContext };
