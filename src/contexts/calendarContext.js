import React, { createContext, useState } from "react";
import AsyncStorage from "@react-native-community/async-storage";

const CalendarContext = createContext();

const CalendarContextProvider = (props) => {
  const [events, setEvents] = useState([]);

  const addEvents = async (data) => {
    setEvents([...data]);

    try {
      const jsonData = JSON.stringify([...data]);
      await AsyncStorage.setItem("events", jsonData);
    } catch (e) {
      // saving error
      console.log(e);
    }
  };

  if (events.length === 0) {
    AsyncStorage.getItem("events")
      .then((data) => {
        const parsedData = data != null ? JSON.parse(data) : false;

        setEvents([...parsedData]);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <CalendarContext.Provider value={{ events, addEvents }}>
      {props.children}
    </CalendarContext.Provider>
  );
};

export { CalendarContextProvider, CalendarContext };
