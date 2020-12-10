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
import { TasksContext, AuthContext } from "../../contexts";
import { LoadingScreen } from "../../commons";

export default function MyTasks({ route, navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [myTasks, setMyTasks] = useState([]);

  const { tasks } = useContext(TasksContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    let mTasks = [];
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].user_id[1] === user.name) {
        mTasks.push(tasks[i]);
      }
    }
    setMyTasks([...mTasks]);
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
        {myTasks.map((t, i) => (
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
