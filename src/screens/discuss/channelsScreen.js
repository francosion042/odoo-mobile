import React, { useState, useEffect, useContext } from "react";
import {
  TouchableOpacity,
  View,
  ScrollView,
  RefreshControl,
} from "react-native";
import { ListItem } from "react-native-elements";
import Ionicons from "react-native-vector-icons/Ionicons";
import { OdooConfig } from "../../../constants/configs";
import { AuthContext, DiscussContext } from "../../contexts";
import { LoadingScreen, ErrorScreen } from "../../commons";

export default function Channels({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { user } = useContext(AuthContext);
  const { channels, addChannels } = useContext(DiscussContext);

  useEffect(() => {
    const Odoo = new OdooConfig(user.email, user.password);

    Odoo.odoo
      .connect()
      .then((response) => {
        console.log(response.data);
        if (response.success) {
          const params = {
            domain: [["channel_type", "=", "channel"]],
            fields: ["name", "channel_type", "channel_message_ids"],
          };

          Odoo.odoo
            .search_read("mail.channel", params)
            .then((response) => {
              addChannels(response.data);
              setIsLoading(false);
              setIsRefreshing(false);
            })
            .catch((e) => {
              console.log(e);
            });
          ///////////////////////////////////////////////////
        } else {
          setIsLoading(false);
          setIsRefreshing(false);
        }
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
      });
  }, [isRefreshing]);

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
        {channels.map((c, i) => (
          <TouchableOpacity
            key={i}
            onPress={() =>
              navigation.navigate("ChannelsMessages", {
                channel_id: c.id,
                channel_name: c.name,
              })
            }>
            <ListItem bottomDivider>
              <Ionicons name="ios-people" size={40} color="#7c7bad" />
              <ListItem.Content>
                <ListItem.Title>{c.name}</ListItem.Title>
                <ListItem.Subtitle>
                  Num of Messages: {c.channel_message_ids.length}
                </ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
