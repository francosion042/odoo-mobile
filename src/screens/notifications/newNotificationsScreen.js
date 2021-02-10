import React, { useEffect, useState, useContext } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import {
  View,
  Text,
  ScrollView,
  Image,
  RefreshControl,
  Alert,
} from "react-native";
import { ListItem } from "react-native-elements";
import Ionicons from "react-native-vector-icons/Ionicons";
import he from "he";
import { AuthContext, NotificationsContext } from "../../contexts";
import { LoadingScreen } from "../../commons";
import { OdooConfig } from "../../../constants/configs";
import styles from "./styles/notificationsStyles";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function NewNotifications({ navigation, route }) {
  const { user } = useContext(AuthContext);
  const [newNotifications, setNewNotifications] = useState([]);
  const { addNotifications, notfications } = useContext(NotificationsContext);
  const [isLoading, setIsLoading] = useState(true);

  const [isRefreshing, setIsRefreshing] = useState(false);

  /////////////////////////////
  console.log("notification called", newNotifications);
  useEffect(() => {
    console.log("notification called");
    const Odoo = new OdooConfig(user.email, user.password);
    Odoo.odoo
      .connect()
      .then(async (response) => {
        console.log(response.success);

        if (response.success) {
          //////////////////////////////////////////////
          // get all messages and add them to  the discuss context. this will make it easier to navigate between chats
          const params = {
            domain: [
              ["message_type", "=", "notification"],
              ["author_id", "!=", "OdooBot"],
            ],
            fields: [
              "id",
              "subject",
              "body",
              "author_id",
              // "author_avatar",
              "message_type",
              "channel_ids",
              "date",
            ],
            order: "date DESC",
            // limit: 20,
          };

          await Odoo.odoo
            .search_read("mail.message", params)
            .then((response) => {
              if (response.data) {
                // console.log(response.data);
                const notes = response.data.filter((el) => {
                  return el.subject;
                });
                addNotifications(notes);
                /////////////////////////////////////////////////////////////////
                AsyncStorage.getItem("notifications")
                  .then((oldNotes) => {
                    if (oldNotes !== null) {
                      const parsedNotes = JSON.parse(oldNotes);
                      // filter the data recieved, extract the objects in it that are not in the previously stored notifications data
                      const exclude = (arr1, arr2) =>
                        arr1.filter(
                          (o1) => arr2.map((o2) => o2.id).indexOf(o1.id) === -1
                        );

                      setNewNotifications(exclude(notes, parsedNotes));
                      console.log(
                        exclude(notes, parsedNotes),
                        "excluded notification"
                      );
                      console.log(parsedNotes, "parsed data");
                      // console.log(notes, "notes");
                    }
                  })
                  .catch((e) => {
                    console.log(e);
                  });
                ////////////////////////////////////////////////////////
                setIsLoading(false);
                setIsRefreshing(false);
              }
            })
            .catch((e) => {
              console.log(e);
              setIsRefreshing(false);
              setIsLoading(false);
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
      });
  }, [isRefreshing]);

  if (isLoading) {
    return <LoadingScreen />;
  }
  if (newNotifications.length === 0) {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={() => setIsRefreshing(true)}
          />
        }>
        <View style={styles.main}>
          <Text style={styles.text}>No New Notifications</Text>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={() => setIsRefreshing(true)}
        />
      }>
      {newNotifications.map((n, i) => (
        <TouchableOpacity
          key={i}
          onPress={() =>
            navigation.navigate("NewNotificationDetails", {
              subject: n.subject,
              body: n.body,
            })
          }>
          <ListItem bottomDivider>
            {n.author_avatar ? (
              <Image
                style={styles.avatar}
                source={{ uri: `data:image/png;base64,${n.author_avatar}` }}
              />
            ) : (
              <Ionicons name="ios-notifications" size={30} color="#7c7bad" />
            )}

            <ListItem.Content>
              <ListItem.Title style={styles.author}>
                {n.author_id[1]}
                {" - "}
                <ListItem.Subtitle style={styles.date}>
                  {n.date}
                </ListItem.Subtitle>
              </ListItem.Title>

              <ListItem.Content>
                <ListItem.Subtitle style={styles.subject}>
                  Subject: {n.subject}
                </ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Content></ListItem.Content>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
