import React, {
  useContext,
  useState,
  useEffect,
  useRef,
  Component,
} from "react";
import { StatusBar } from "expo-status-bar";
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Platform } from "react-native";
import BackgroundFetch from "react-native-background-fetch";
import he from "he";
import { Login } from "./src/screens";
import { HomeTabNavigator } from "./src/navigation";
import {
  AuthContextProvider,
  AuthContext,
  ProjectsContextProvider,
  TasksContextProvider,
  DiscussContextProvider,
  NotificationsContextProvider,
  NotificationsContext,
} from "./src/contexts";
import { LoadingScreen } from "./src/commons";
import { OdooConfig } from "./constants/configs";

const Stack = createStackNavigator();

const App = () => {
  const { user } = useContext(AuthContext);
  const { newNotifications, addNotifications } = useContext(
    NotificationsContext
  );
  const [isLoading, setIsLoading] = useState(true);
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  /////////////////////////////////////////////////Background Fetch//////////////////////////////////////////////////////////
  // Configure it.
  // BackgroundFetch.configure(
  //   {
  //     minimumFetchInterval: 15, // <-- minutes (15 is minimum allowed)
  //     // Android options
  //     forceAlarmManager: false, // <-- Set true to bypass JobScheduler.
  //     stopOnTerminate: false,
  //     startOnBoot: true,
  //     requiredNetworkType: BackgroundFetch.NETWORK_TYPE_NONE, // Default
  //     requiresCharging: false, // Default
  //     requiresDeviceIdle: false, // Default
  //     requiresBatteryNotLow: false, // Default
  //     requiresStorageNotLow: false, // Default
  //   },
  //   async (taskId) => {
  //     console.log("[js] Received background-fetch event: ", taskId);
  //     // Required: Signal completion of your task to native code
  //     // If you fail to do this, the OS can terminate your app
  //     // or assign battery-blame for consuming too much background-time
  //     BackgroundFetch.finish(taskId);
  //   },
  //   (error) => {
  //     console.log("[js] RNBackgroundFetch failed to start");
  //   }
  // );

  //////////////////////////////////////////////////////////////////////////////////////

  setTimeout(() => {
    setIsLoading(false);
  }, 1000);

  if (isLoading) {
    return <LoadingScreen />;
  }
  // Call the background task function

  return (
    <NavigationContainer>
      {/* check if the user data exists in the storage, otherwise show login page. */}
      {!user ? (
        <Stack.Navigator>
          <Stack.Screen
            name="LogIn"
            component={Login}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeTabNavigator}
            options={({ route }) => ({
              title: getHeaderTitle(route),
              headerShown: shouldHeaderBeShown(route),
              headerLeft: null,
              headerStyle: {
                backgroundColor: "#7c7bad",
              },
              headerTintColor: "#fff",
            })}
          />
        </Stack.Navigator>
      )}
      <StatusBar style="light" />
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
              <App navigation={props.navigation} />
            </NotificationsContextProvider>
          </DiscussContextProvider>
        </TasksContextProvider>
      </ProjectsContextProvider>
    </AuthContextProvider>
  );
};

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

  switch (routeName) {
    case "Home":
      return false;
  }
};

////////////////////////////
// the body of each message is a string of HTML element, so it needs to be etracted and decoded
const extractHTML = (html) => {
  const decodedStripedHtml = he.decode(html.replace(/<[^>]+>/g, ""));
  return decodedStripedHtml;
};
/////////////////////////////
