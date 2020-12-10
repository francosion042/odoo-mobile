import React, { createContext, useState } from "react";

const DiscussContext = createContext();

const DiscussContextProvider = (props) => {
  const [messages, setMessages] = useState([]);
  const [channels, setChannels] = useState([]);
  const [directChannels, setDirectChannels] = useState([]);

  const addMessages = (data) => {
    setMessages([...data]);
  };
  const addChannels = (data) => {
    setChannels([...data]);
  };

  const addDirectChannels = (data) => {
    setDirectChannels([...data]);
  };

  return (
    <DiscussContext.Provider
      value={{
        messages,
        addMessages,
        channels,
        addChannels,
        directChannels,
        addDirectChannels,
      }}>
      {props.children}
    </DiscussContext.Provider>
  );
};

export { DiscussContextProvider, DiscussContext };
