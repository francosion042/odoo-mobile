import React, { useContext, useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Icon from "react-native-vector-icons/FontAwesome";
import LinearGradient from "react-native-linear-gradient";
import BackgroundFetch from "react-native-background-fetch";
import PushNotification from "react-native-push-notification";
import he from "he";
import { Login, Profiles } from "./src/screens";
import {
  HomeStackNavigator,
  ProfileStackNavigator,
  CalendarStackNavigator,
} from "./src/navigation";
import {
  AuthContextProvider,
  AuthContext,
  ProjectsContextProvider,
  TasksContextProvider,
  DiscussContextProvider,
  NotificationsContextProvider,
  NotificationsContext,
  CalendarContextProvider,
  CalendarContext,
} from "./src/contexts";
import { LoadingScreen } from "./src/commons";
import { OdooConfig } from "./constants/configs";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Get header title from each screen in the hometab,
const getHeaderTitle = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Home";

  switch (routeName) {
    case "Home":
      return "Home";
    case "Notifications":
      return "Notifications";
    case "Profile":
      return "Profile";
  }
};

const shouldHeaderBeShown = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Home";
  console.log(routeName);
  switch (routeName) {
    case "Home":
      return true;
    case "DirectMessages":
      return false;
    case "ChannelsMessages":
      return false;
  }
};

const App = () => {
  const { user } = useContext(AuthContext);
  const { addEvents } = useContext(CalendarContext);
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      {/* check if the user data exists in the storage, otherwise show login page. */}
      {!user ? (
        <>
          <Stack.Navigator>
            <Stack.Screen
              name="LogIn"
              component={Login}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
          <StatusBar style="dark" />
        </>
      ) : (
        <>
          <Drawer.Navigator>
            <Drawer.Screen
              name="Home"
              children={HomeStackNavigator}
              options={{
                drawerIcon: ({ focused, size }) => (
                  <Icon
                    name="home"
                    size={size}
                    color={focused ? "#017AFF" : "gray"}
                  />
                ),
              }}
            />
            <Drawer.Screen
              name="Calendar"
              children={CalendarStackNavigator}
              options={{
                drawerIcon: ({ focused, size }) => (
                  <Icon
                    name="calendar"
                    size={size}
                    color={focused ? "#017AFF" : "gray"}
                  />
                ),
              }}
            />
            <Drawer.Screen
              name="Profile"
              children={ProfileStackNavigator}
              options={{
                drawerIcon: ({ focused, size }) => (
                  <Icon
                    name="user"
                    size={size}
                    color={focused ? "#017AFF" : "gray"}
                  />
                ),
              }}
            />
          </Drawer.Navigator>
          <StatusBar style="light" />
        </>
      )}
    </NavigationContainer>
  );
};

export default (props) => {
  return (
    <AuthContextProvider>
      <ProjectsContextProvider>
        <TasksContextProvider>
          <DiscussContextProvider>
            <NotificationsContextProvider>
              <CalendarContextProvider>
                <App navigation={props.navigation} />
              </CalendarContextProvider>
            </NotificationsContextProvider>
          </DiscussContextProvider>
        </TasksContextProvider>
      </ProjectsContextProvider>
    </AuthContextProvider>
  );
};
