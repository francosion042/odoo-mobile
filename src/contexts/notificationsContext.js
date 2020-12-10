import React, { createContext, useState } from "react";
import AsyncStorage from "@react-native-community/async-storage";

const NotificationsContext = createContext();

const NotificationsContextProvider = (props) => {
  // const [oldNotifications, setOldNotifications] = useState(false);
  const [newNotifications, setNewNotifications] = useState(false);

  const [notifications, setNotifications] = useState(false);

  ////////////////////////////////////////////////////////////////
  const addNotifications = async (data) => {
    setNotifications([...data]);

    await AsyncStorage.getItem("notifications").then((oldNotes) => {
      if (oldNotes !== null) {
        const parsedNotes = JSON.parse(oldNotes);
        // filter the data recieved, extract the objects in it that are not in the previously stored notifications data
        const exclude = (arr1, arr2) =>
          arr1.filter((o1) => arr2.map((o2) => o2.id).indexOf(o1.id) === -1);

        setNewNotifications(exclude(data, parsedNotes));
      }
    });

    try {
      const jsonData = JSON.stringify([...data]);
      await AsyncStorage.setItem("notifications", jsonData);
    } catch (e) {
      // saving error
      console.log(e);
    }
  };

  if (!notifications) {
    AsyncStorage.getItem("notifications").then((data) => {
      const parsedData = data != null ? JSON.parse(data) : false;

      setNotifications([...parsedData]);
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
