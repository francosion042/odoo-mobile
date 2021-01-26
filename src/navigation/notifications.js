import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Notifiactions, notificationDetails } from "../screens";

const NotificationStack = createStackNavigator();

const NotificationStackNavigator = ({ navigation, route }) => {
  return (
    <NotificationStack.Navigator>
      <NotificationStack.Screen
        name="Notification"
        component={Notifiactions}
        options={({ route }) => ({
          title: "Odoo Mobile",
          headerShown: false,
        })}
      />
      <NotificationStack.Screen
        name="NotificationDetails"
        component={notificationDetails}
        options={({ route }) => ({
          title: "Notification",
          headerShown: false,
        })}
      />
    </NotificationStack.Navigator>
  );
};

export default NotificationStackNavigator;
