import React, { useContext, useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Alert } from "react-native";
import SplashScreen from "react-native-splash-screen";
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/FontAwesome";
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

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const App = () => {
  const { user } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 500);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    setTimeout(() => {
      Alert.alert(
        "Tips",
        "Dear user, for a better user experience, it is recommended you have a strong internet connection."
      );
    }, 5000);
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
                    style={{ paddingRight: 5 }}
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
