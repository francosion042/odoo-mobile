import React, { useEffect, useState, useContext } from "react";
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

export default function Notifications() {
  const { user } = useContext(AuthContext);
  // const [notifications, addNotifications] = useState("");
  const { addNotifications, notifications } = useContext(NotificationsContext);
  const [isLoading, setIsLoading] = useState(true);

  const [isRefreshing, setIsRefreshing] = useState(false);

  ////////////////////////////
  // the body of each message is a string of HTML element, so it needs to be etracted and decoded
  const extractHTML = (html) => {
    const decodedStripedHtml = he.decode(html.replace(/<[^>]+>/g, ""));
    return decodedStripedHtml;
  };
  /////////////////////////////

  // useEffect(() => {
  //   setTimeout(() => {
  //     Alert.alert(
  //       "Tips",
  //       "Dear user, to refresh the notifications, scroll to the top, then swipe down"
  //     );
  //   }, 5000);
  // }, []);

  useEffect(() => {
    if (notifications) {
      setIsLoading(false);
    }
    const Odoo = new OdooConfig(user.email, user.password);
    Odoo.odoo
      .connect()
      .then(async (response) => {
        console.log(response.success);
        console.log(user.email, "||", user.password);
        if (response.success) {
          //////////////////////////////////////////////
          // get all messages and add them to  the discuss context. this will make it easier to navigate between chats
          const params = {
            domain: [["message_type", "=", "notification"]],
            fields: [
              "id",
              "subject",
              "body",
              "author_id",
              "author_avatar",
              "message_type",
              "channel_ids",
              "date",
            ],
            order: "date DESC",
          };

          await Odoo.odoo
            .search_read("mail.message", params)
            .then((response) => {
              if (response.data) {
                const notes = response.data.filter((el) => {
                  return el.subject;
                });
                addNotifications(notes);
                setIsRefreshing(false);
                setIsLoading(false);
              }
            })
            .catch((e) => {
              console.log(e);
              setIsRefreshing(false);
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

  if (!notifications) {
    return (
      <View>
        <Text>No Notifications</Text>
      </View>
    );
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
        {notifications.map((n, i) => (
          <ListItem key={i} bottomDivider>
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
              <ListItem.Content>
                <ListItem.Subtitle>
                  Body:{" "}
                  {extractHTML(n.body)
                    ? extractHTML(n.body)
                    : "(images are not supported)"}
                </ListItem.Subtitle>
              </ListItem.Content>
            </ListItem.Content>
          </ListItem>
        ))}
      </ScrollView>
    </View>
  );
}
