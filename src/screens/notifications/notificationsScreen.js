import React, { useEffect, useState, useContext } from "react";
import { View, Text, ScrollView, Image, RefreshControl } from "react-native";
import { ListItem } from "react-native-elements";
import Ionicons from "react-native-vector-icons/Ionicons";
import he from "he";
import { AuthContext, NotificationsContext } from "../../contexts";
import { LoadingScreen } from "../../commons";
import styles from "./styles/notificationsStyles";

export default function Notifications() {
  const { notifications } = useContext(NotificationsContext);

  ////////////////////////////
  // the body of each message is a string of HTML element, so it needs to be etracted and decoded
  const extractHTML = (html) => {
    const decodedStripedHtml = he.decode(html.replace(/<[^>]+>/g, ""));
    return decodedStripedHtml;
  };
  /////////////////////////////

  if (!notifications) {
    return (
      <View>
        <Text>No Notifications</Text>
      </View>
    );
  }
  return (
    <View>
      <ScrollView>
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
