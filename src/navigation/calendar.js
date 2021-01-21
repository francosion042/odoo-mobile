import React, { useState, useContext, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native-gesture-handler";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/FontAwesome";
import { Calendar, CreateEvent } from "../screens";

const CalendarStack = createStackNavigator();

const CalendarStackNavigator = ({ navigation, route }) => {
  return (
    <CalendarStack.Navigator>
      <CalendarStack.Screen
        name="Calendar"
        component={Calendar}
        options={({ route }) => ({
          title: "Calendar",
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
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate("Event")}>
              <Icon
                name="plus"
                size={30}
                color="#fff"
                style={{ marginRight: 20 }}
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
      <CalendarStack.Screen
        name="Event"
        component={CreateEvent}
        options={({ route }) => ({
          title: "New Event",
          headerShown: true,
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
    </CalendarStack.Navigator>
  );
};

export default CalendarStackNavigator;
