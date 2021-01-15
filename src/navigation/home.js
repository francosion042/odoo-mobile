import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/FontAwesome";
import { Home, Notifiactions, Profiles } from "../screens";
import ProjectsTabNavigator from "./projects";
import DiscussTabNavigator from "./discuss";
import { TouchableOpacity } from "react-native-gesture-handler";

const MaterialTopTabs = createMaterialTopTabNavigator();
const HomeStack = createStackNavigator();

const HomeStackNavigator = ({ navigation, route }) => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        children={HomeTabNavigator}
        options={({ route }) => ({
          title: "Odoo Mobile",
          headerShown: true,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Icon
                name="bars"
                size={30}
                color="#fff"
                style={{ marginLeft: 10 }}
              />
            </TouchableOpacity>
          ),
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
  return (
    <MaterialTopTabs.Navigator>
      <MaterialTopTabs.Screen name="Discuss" component={DiscussTabNavigator} />
      <MaterialTopTabs.Screen
        name="Projects"
        component={ProjectsTabNavigator}
      />
      <MaterialTopTabs.Screen name="Notifications" component={Notifiactions} />
    </MaterialTopTabs.Navigator>
  );
};

export default HomeStackNavigator;
