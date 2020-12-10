import React, { useState, useContext, useEffect } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  RefreshControl,
} from "react-native";
import { ListItem } from "react-native-elements";
import Ionicons from "react-native-vector-icons/Ionicons";
import { TasksContext } from "../../contexts";
import { LoadingScreen } from "../../commons";

export default function ProjectTasks({ route, navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [projectTasks, setProjectTasks] = useState([]);

  const { tasks } = useContext(TasksContext);

  const { project_id } = route.params;

  useEffect(() => {
    let proTasks = [];
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].project_id[0] === project_id) {
        proTasks.push(tasks[i]);
      }
    }
    setProjectTasks([...proTasks]);
    setIsLoading(false);
    setIsRefreshing(false);
  }, [isRefreshing]);

  ///////////////////////////////////////////////////////////////////////
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <View>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={() => setIsRefreshing(true)}
          />
        }>
        {projectTasks.map((t, i) => (
          <ListItem bottomDivider key={i}>
            <Ionicons name="ios-list-box" size={40} color="#7c7bad" />
            <ListItem.Content>
              <ListItem.Title>{t.name}</ListItem.Title>
              <ListItem.Subtitle>
                Project:{" "}
                {t.project_id ? t.project_id[1] : "Unspecified Project"}
              </ListItem.Subtitle>
              <ListItem.Subtitle>
                Assigned To: {t.user_id ? t.user_id[1] : "Not assigned"}
              </ListItem.Subtitle>
              <ListItem.Subtitle>
                Progress Stage: {t.stage_id[1]}
              </ListItem.Subtitle>
              <ListItem.Subtitle>Deadline: {t.date_deadline}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        ))}
      </ScrollView>
    </View>
  );
}
