import React, { createContext, useState } from "react";

const ProjectsContext = createContext();

const ProjectsContextProvider = (props) => {
  const [projects, setProjects] = useState([]);

  const addProjects = (data) => {
    setProjects([...data]);
  };

  return (
    <ProjectsContext.Provider value={{ projects, addProjects }}>
      {props.children}
    </ProjectsContext.Provider>
  );
};

export { ProjectsContextProvider, ProjectsContext };
