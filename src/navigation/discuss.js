import React, { useEffect, useState, useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LinearGradient from "react-native-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ChannelsMessages, Channels, DirectMessages, Direct } from "../screens";
import { OdooConfig } from "../../constants/configs";
import { AuthContext, DiscussContext } from "../contexts";
import { LoadingScreen } from "../commons";

const ChannelsStack = createStackNavigator();
const DirectStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const DirectStackNavigator = ({ navigation, route }) => {
  if (route.state) {
    navigation.setOptions({
      tabBarVisible: route.state.index > 0 ? false : true,
    });
  }

  return (
    <DirectStack.Navigator>
      <DirectStack.Screen
        name="Chats"
        component={Direct}
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
          headerTintColor: "#fff",
        })}
      />
      <DirectStack.Screen
        name="DirectMessages"
        component={DirectMessages}
        options={({ route }) => ({
          headerShown: false,
          title: "Messages",
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
    </DirectStack.Navigator>
  );
};

const ChannelsStackNavigator = ({ navigation, route }) => {
  if (route.state) {
    navigation.setOptions({
      tabBarVisible: route.state.index > 0 ? false : true,
    });
  }

  return (
    <ChannelsStack.Navigator>
      <ChannelsStack.Screen
        name="Channels"
        component={Channels}
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
          headerTintColor: "#fff",
        })}
      />
      <ChannelsStack.Screen
        name="ChannelsMessages"
        component={ChannelsMessages}
        options={({ route }) => ({
          headerShown: false,
          title: "Messages",
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
    </ChannelsStack.Navigator>
  );
};

const DiscussTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Direct") {
            iconName = "ios-mail";
          } else if (route.name === "Channels") {
            iconName = "ios-people";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "#017AFF",
        inactiveTintColor: "gray",
      }}>
      <Tab.Screen name="Direct" component={DirectStackNavigator} />
      <Tab.Screen name="Channels" component={ChannelsStackNavigator} />
    </Tab.Navigator>
  );
};

export default DiscussTabNavigator;
