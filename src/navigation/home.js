import React, { useEffect, useContext, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Alert } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/FontAwesome";
import ProjectsTabNavigator from "./projects";
import DiscussTabNavigator from "./discuss";
import NotificationsStackNavigator from "./notifications";
import { TouchableOpacity } from "react-native-gesture-handler";
import { OdooConfig } from "../../constants/configs";
import { AuthContext, CalendarContext } from "../contexts";

const MaterialTopTabs = createMaterialTopTabNavigator();
const HomeStack = createStackNavigator();

const HomeStackNavigator = ({ navigation, route }) => {
  const { user } = useContext(AuthContext);
  const { addEvents } = useContext(CalendarContext);

  /////////////////////////////////////////////////Calendar Events Fetch//////////////////////////////////////////////////////////

  useEffect(() => {
    setTimeout(() => {
      const Odoo = new OdooConfig(user.email, user.password);
      Odoo.odoo
        .connect()
        .then(async (response) => {
          console.log(response.success);
          console.log(user.email, "||", user.password);
          if (response.success) {
            const params = {
              // domain: [["message_type", "=", "notification"]],
              fields: [
                "id",
                "name",
                "start",
                "stop",
                "duration",
                "allday",
                "location",
                "description",
              ],
              // order: "date DESC",
            };

            await Odoo.odoo
              .search_read("calendar.event", params)
              .then((response) => {
                if (response.data) {
                  addEvents(response.data);
                  console.log(response.data);
                }
              })
              .catch((e) => {
                console.log(e);
              });
          } else {
            setIsLoading(false);
            Alert.alert(
              "Network Connection failure",
              "Check your internet connection and try again"
            );
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }, 3000);
  }, []);

  //////////////////////////////////////////////////////////////////////////////////////

  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        children={HomeTabNavigator}
        options={({ route }) => ({
          title: "Odoo Mobile",
          headerShown: true,
          headerTintColor: "#fff",
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
      <MaterialTopTabs.Screen
        name="Notifications"
        component={NotificationsStackNavigator}
      />
    </MaterialTopTabs.Navigator>
  );
};

export default HomeStackNavigator;
