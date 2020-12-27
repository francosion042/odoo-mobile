import { registerRootComponent } from "expo";
import { AppRegistry } from "react-native";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";
import BackgroundFetch from "react-native-background-fetch";

import App from "./App";

// let MyHeadlessTask = async (event) => {
//   // Get task id from event {}:
//   let taskId = event.taskId;
//   console.log("[BackgroundFetch HeadlessTask] start: ", taskId);

//   // Perform an example HTTP request.
//   // Important:  await asychronous tasks when using HeadlessJS.
//   let response = await fetch(
//     "https://facebook.github.io/react-native/movies.json"
//   );
//   let responseJson = await response.json();
//   console.log("[BackgroundFetch HeadlessTask] response: ", responseJson);

//   // Required:  Signal to native code that your task is complete.
//   // If you don't do this, your app could be terminated and/or assigned
//   // battery-blame for consuming too much time in background.
//   BackgroundFetch.finish(taskId);
// };

// // Register your BackgroundFetch HeadlessTask
// BackgroundFetch.registerHeadlessTask(MyHeadlessTask);

PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function (token) {
    console.log("TOKEN:", token);
  },

  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    console.log("NOTIFICATION:", notification);

    // process the notification

    // (required) Called when a remote is received or opened, or local notification is opened
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
  onAction: function (notification) {
    console.log("ACTION:", notification.action);
    console.log("NOTIFICATION:", notification);

    // process the action
  },

  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError: function (err) {
    console.error(err.message, err);
  },

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   * - if you are not using remote notification or do not have Firebase installed, use this:
   *     requestPermissions: Platform.OS === 'ios'
   */
  requestPermissions: true,
});

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(App);

// adb shell cmd jobscheduler run -f <your.application.id> 999
