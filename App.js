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
import BackgroundFetch from "react-native-background-fetch";
import PushNotification from "react-native-push-notification";
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

const App = () => {
  const { user } = useContext(AuthContext);
  const { newNotifications, addNotifications } = useContext(
    NotificationsContext
  );
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState(false);

  /////////////////////////////////////////////////Background Fetch//////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////////////

  ///////////////////////////////////Push Notification///////////////////////////////////////////
  const sendPushNotification = (title, message) => {
    PushNotification.localNotification({
      /* Android Only Properties */

      actions: ["Open", "Cancel"], // (Android only) See the doc for notification actions to know more
      invokeApp: true, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true

      title: title, // (optional)
      message: message, // (required)
    });
  };
  // sendPushNotification();
  ///////////////////////////////////////////////////////////////////////////////////////////////

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
              <App navigation={props.navigation} />
            </NotificationsContextProvider>
          </DiscussContextProvider>
        </TasksContextProvider>
      </ProjectsContextProvider>
    </AuthContextProvider>
  );
};
