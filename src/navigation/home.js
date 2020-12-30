import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/Ionicons";
import { Home, Notifiactions, Profiles } from "../screens";
import ProjectsTabNavigator from "./projects";
import DiscussTabNavigator from "./discuss";

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();

const HomeStackNavigator = ({ navigation, route }) => {
  const getProjectHeaderTitle = (route) => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? "Projects";

    switch (routeName) {
      case "Projects":
        return "Projects";
      case "Tasks":
        return "Tasks";
    }
  };

  const getDiscussHeaderTitle = (route) => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? "Direct";

    switch (routeName) {
      case "Direct":
        return "Chats";
      case "Channels":
        return "Channels";
    }
  };

  const shouldProjectHeaderBeShown = (route) => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? "Projects";

    switch (routeName) {
      case "Projects":
        return false;
    }
  };

  const shouldDiscussHeaderBeShown = (route) => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? "Discuss";
    console.log("Route Name" + routeName);

    switch (routeName) {
      case "Discuss":
        return false;

      case "Direct":
        return false;

      case "Channels":
        return false;
    }
  };

  if (route.state) {
    navigation.setOptions({
      tabBarVisible: route.state.index > 0 ? false : true,
    });
  }
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={Home}
        options={() => ({
          headerLeft: null,
          headerBackground: () => (
            <LinearGradient
              colors={["#017AFF", "#A1CDF2"]}
              style={{ flex: 1 }}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            />
          ),
          headerTintColor: "#fff",
        })}
      />
      <HomeStack.Screen
        name="Discuss"
        component={DiscussTabNavigator}
        options={({ route }) => ({
          title: getDiscussHeaderTitle(route),
          headerShown: shouldDiscussHeaderBeShown(route),
          headerBackground: () => (
            <LinearGradient
              colors={["#017AFF", "#A1CDF2"]}
              style={{ flex: 1 }}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            />
          ),
          headerTintColor: "#fff",
        })}
      />
      <HomeStack.Screen
        name="Projects"
        component={ProjectsTabNavigator}
        options={({ route }) => ({
          title: getProjectHeaderTitle(route),
          headerShown: shouldProjectHeaderBeShown(route),
          headerBackground: () => (
            <LinearGradient
              colors={["#017AFF", "#A1CDF2"]}
              style={{ flex: 1 }}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            />
          ),
          // headerStyle: {
          //   backgroundColor: "#7c7bad",
          // },
          headerTintColor: "#fff",
        })}
      />
    </HomeStack.Navigator>
  );
};

const HomeTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = "ios-home";
          } else if (route.name === "Notifications") {
            iconName = "ios-notifications";
          } else if (route.name === "Profile") {
            iconName = "md-person";
          }

          // You can return any component that you like here!
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "#017AFF",
        inactiveTintColor: "gray",
      }}>
      <Tab.Screen name="Home" component={HomeStackNavigator} />
      <Tab.Screen name="Notifications" component={Notifiactions} />
      <Tab.Screen name="Profile" component={Profiles} />
    </Tab.Navigator>
  );
};

export default HomeTabNavigator;
