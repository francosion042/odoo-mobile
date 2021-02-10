import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  Notifiactions,
  NewNotifiactions,
  NotificationDetails,
} from "../screens";

const NotificationStack = createStackNavigator();
const NewNotificationStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const NotificationStackNavigator = ({ navigation, route }) => {
  if (route.state) {
    navigation.setOptions({
      tabBarVisible: route.state.index > 0 ? false : true,
    });
  }
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
        component={NotificationDetails}
        options={({ route }) => ({
          title: "Notification",
          headerShown: false,
        })}
      />
    </NotificationStack.Navigator>
  );
};

const NewNotificationStackNavigator = ({ navigation, route }) => {
  if (route.state) {
    navigation.setOptions({
      tabBarVisible: route.state.index > 0 ? false : true,
    });
  }
  return (
    <NewNotificationStack.Navigator>
      <NewNotificationStack.Screen
        name="NewNotification"
        component={NewNotifiactions}
        options={({ route }) => ({
          headerShown: false,
        })}
      />
      <NewNotificationStack.Screen
        name="NewNotificationDetails"
        component={NotificationDetails}
        options={({ route }) => ({
          headerShown: false,
        })}
      />
    </NewNotificationStack.Navigator>
  );
};

const NotificationTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "New") {
            iconName = "ios-notifications";
          } else if (route.name === "Old") {
            iconName = focused ? "ios-list-box" : "ios-list";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "#017AFF",
        inactiveTintColor: "gray",
      }}>
      <Tab.Screen name="New" component={NewNotificationStackNavigator} />
      <Tab.Screen name="Old" component={NotificationStackNavigator} />
    </Tab.Navigator>
  );
};

export default NotificationTabNavigator;
