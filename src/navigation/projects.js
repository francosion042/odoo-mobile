import React, { useEffect, useState, useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Projects, ProjectTasks, MyTasks } from "../screens";
import { OdooConfig } from "../../constants/configs";
import { AuthContext, TasksContext } from "../contexts";
import { LoadingScreen } from "../commons";

const ProjectsStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const ProjectsStackNavigator = ({ navigation, route }) => {
  if (route.state) {
    navigation.setOptions({
      tabBarVisible: route.state.index > 0 ? false : true,
    });
  }

  return (
    <ProjectsStack.Navigator>
      <ProjectsStack.Screen
        name="Projects"
        component={Projects}
        options={({ route }) => ({
          headerStyle: {
            backgroundColor: "#7c7bad",
          },
          headerTintColor: "#fff",
        })}
      />
      <ProjectsStack.Screen
        name="projectTasks"
        component={ProjectTasks}
        options={({ route }) => ({
          title: "Tasks",
          headerStyle: {
            backgroundColor: "#7c7bad",
          },
          headerTintColor: "#fff",
        })}
      />
    </ProjectsStack.Navigator>
  );
};

const ProjectsTabNavigator = () => {
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useContext(AuthContext);
  const { addTasks } = useContext(TasksContext);

  useEffect(() => {
    const Odoo = new OdooConfig(user.email, user.password);

    Odoo.odoo
      .connect()
      .then((response) => {
        console.log(response.success);
        if (response.success) {
          setIsLoading(false);
          //////////////////////////////////////////////
          // get all tasks and add them to  the tasks context. this will make it easier to navigate between projects
          const params = {
            fields: [
              "name",
              "project_id",
              "user_id",
              "stage_id",
              "date_deadline",
            ],
          };

          Odoo.odoo
            .search_read("project.task", params)
            .then((response) => {
              addTasks(response.data);
              console.log(response.data);
            })
            .catch((e) => {
              console.log(e);
            });
          ///////////////////////////////////////////////////
        } else {
          setIsLoading(false);
        }
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
      });
  }, []);

  // if (isLoading) {
  //   return <LoadingScreen />;
  // }

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Projects") {
            iconName = "ios-briefcase";
          } else if (route.name === "Tasks") {
            iconName = focused ? "ios-list-box" : "ios-list";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "#7c7bad",
        inactiveTintColor: "gray",
      }}>
      <Tab.Screen name="Projects" component={ProjectsStackNavigator} />
      <Tab.Screen
        name="Tasks"
        component={MyTasks}
        options={{
          title: "My Tasks",
        }}
      />
    </Tab.Navigator>
  );
};

export default ProjectsTabNavigator;
