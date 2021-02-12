import React, { createContext, useState } from "react";
import AsyncStorage from "@react-native-community/async-storage";

const NotificationsContext = createContext();

const NotificationsContextProvider = (props) => {
  // const [oldNotifications, setOldNotifications] = useState(false);
  const [newNotifications, setNewNotifications] = useState([]);

  const [notifications, setNotifications] = useState([]);

  ////////////////////////////////////////////////////////////////
  const addNotifications = async (data) => {
    setNotifications([...data]);

    try {
      const jsonData = JSON.stringify([...data]);
      await AsyncStorage.setItem("notifications", jsonData);
    } catch (e) {
      // saving error
      console.log(e);
    }
  };

  if (!notifications) {
    AsyncStorage.getItem("notifications")
      .then((data) => {
        const parsedData = data != null ? JSON.parse(data) : false;

        setNotifications([...parsedData]);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        addNotifications,
        newNotifications,
      }}>
      {props.children}
    </NotificationsContext.Provider>
  );
};

export { NotificationsContextProvider, NotificationsContext };
