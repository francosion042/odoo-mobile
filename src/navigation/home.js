import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/Ionicons";
import { Home, Notifiactions, Profiles } from "../screens";
import ProjectsTabNavigator from "./projects";
import DiscussTabNavigator from "./discuss";

const MaterialTopTabs = createMaterialTopTabNavigator();
const HomeStack = createStackNavigator();

const HomeStackNavigator = ({ navigation, route }) => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        children={HomeTabNavigator}
        options={({ route }) => ({
          headerShown: false,
          headerBackground: () => (
            <LinearGradient
              colors={["#017AFF", "#A1CDF2"]}
              style={{ flex: 1 }}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            />
          ),
        })}
      />
    </HomeStack.Navigator>
  );
};

const HomeTabNavigator = ({ navigation, route }) => {
  console.log(route);
  // const getProjectHeaderTitle = (route) => {
  //   const routeName = getFocusedRouteNameFromRoute(route) ?? "Projects";

  //   switch (routeName) {
  //     case "Projects":
  //       return "Projects";
  //     case "Tasks":
  //       return "Tasks";
  //   }
  // };

  // const getDiscussHeaderTitle = (route) => {
  //   const routeName = getFocusedRouteNameFromRoute(route) ?? "Direct";

  //   switch (routeName) {
  //     case "Direct":
  //       return "Chats";
  //     case "Channels":
  //       return "Channels";
  //   }
  // };

  // const shouldProjectHeaderBeShown = (route) => {
  //   const routeName = getFocusedRouteNameFromRoute(route) ?? "Projects";

  //   switch (routeName) {
  //     case "Projects":
  //       return false;
  //   }
  // };

  // const shouldDiscussHeaderBeShown = (route) => {
  //   const routeName = getFocusedRouteNameFromRoute(route) ?? "Discuss";
  //   console.log("Route Name" + routeName);

  //   switch (routeName) {
  //     case "Discuss":
  //       return false;

  //     case "Direct":
  //       return false;

  //     case "Channels":
  //       return false;
  //   }
  // };

  // if (route.state) {
  //   navigation.setOptions({
  //     tabBarVisible: route.state.index > 0 ? false : true,
  //   });
  // }
  return (
    <MaterialTopTabs.Navigator>
      <MaterialTopTabs.Screen
        name="Discuss"
        component={DiscussTabNavigator}
        // options={({ route }) => ({
        //   title: getDiscussHeaderTitle(route),
        //   // headerShown: shouldDiscussHeaderBeShown(route),
        //   headerBackground: () => (
        //     <LinearGradient
        //       colors={["#017AFF", "#A1CDF2"]}
        //       style={{ flex: 1 }}
        //       start={{ x: 0, y: 0 }}
        //       end={{ x: 1, y: 0 }}
        //     />
        //   ),
        //   headerTintColor: "#fff",
        // })}
      />
      <MaterialTopTabs.Screen
        name="Projects"
        component={ProjectsTabNavigator}
        // options={({ route }) => ({
        //   title: getProjectHeaderTitle(route),
        //   // headerShown: shouldProjectHeaderBeShown(route),
        //   headerBackground: () => (
        //     <LinearGradient
        //       colors={["#017AFF", "#A1CDF2"]}
        //       style={{ flex: 1 }}
        //       start={{ x: 0, y: 0 }}
        //       end={{ x: 1, y: 0 }}
        //     />
        //   ),
        //   // headerStyle: {
        //   //   backgroundColor: "#7c7bad",
        //   // },
        //   headerTintColor: "#fff",
        // })}
      />
      <MaterialTopTabs.Screen name="Notifications" component={Notifiactions} />
    </MaterialTopTabs.Navigator>
  );
};

export default HomeStackNavigator;
