import React, { useState, useContext, useEffect } from "react";
import {
  TouchableOpacity,
  View,
  ScrollView,
  RefreshControl,
  Alert,
} from "react-native";
import { ListItem } from "react-native-elements";
import Ionicons from "react-native-vector-icons/Ionicons";
import { OdooConfig } from "../../../constants/configs";
import { AuthContext, ProjectsContext } from "../../contexts";
import { LoadingScreen } from "../../commons";

export default function Projects({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { user } = useContext(AuthContext);
  const { addProjects, projects } = useContext(ProjectsContext);

  useEffect(() => {
    const Odoo = new OdooConfig(user.email, user.password);

    Odoo.odoo
      .connect()
      .then((response) => {
        console.log(response.success);
        if (response.success) {
          const params = {
            fields: ["name", "partner_id", "task_count"],
          };

          Odoo.odoo
            .search_read("project.project", params)
            .then((response) => {
              addProjects(response.data);
              setIsLoading(false);
              setIsRefreshing(false);
            })
            .catch((e) => {
              console.log(e);
            });
        } else {
          setIsLoading(false);
          setIsRefreshing(false);
          Alert.alert(
            "Network Connection failure",
            "Check your internet connection and try again"
          );
        }
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
      });
  }, [isRefreshing]);

  ///////////////////////////////////////////////////////////////////////
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={() => setIsRefreshing(true)}
        />
      }>
      {projects.map((p, i) => (
        <TouchableOpacity
          key={i}
          onPress={() =>
            navigation.navigate("projectTasks", { project_id: p.id })
          }>
          <ListItem bottomDivider>
            <Ionicons name="ios-briefcase" size={40} color="#7c7bad" />
            <ListItem.Content>
              <ListItem.Title>{p.name}</ListItem.Title>
              <ListItem.Subtitle>
                Client: {p.partner_id ? p.partner_id[1] : "Annonymous"}
              </ListItem.Subtitle>
              <ListItem.Subtitle>{p.task_count} Tasks</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
