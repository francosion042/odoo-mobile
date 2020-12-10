import React, { useContext, useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { ListItem } from "react-native-elements";
import Ionicons from "react-native-vector-icons/Ionicons";
import he from "he";
import { AuthContext, DiscussContext } from "../../contexts";
import { LoadingScreen } from "../../commons";
import styles from "./styles/messagesStyle";
import { OdooConfig } from "../../../constants/configs";

export default function ChannelsMessages({ route, navigation }) {
  const scrollViewRef = useRef();
  const [isLoading, setIsLoading] = useState(true);
  const [msgs, setMsgs] = useState([]);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const { channel_id, channel_name } = route.params;
  const { messages, addMessages } = useContext(DiscussContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    let ms = [];
    for (let i = 0; i < messages.length; i++) {
      if (messages[i].channel_ids.includes(channel_id)) {
        ms.push(messages[i]);
      }
    }
    setMsgs(ms);
    setIsLoading(false);
  }, [messages]);
  ///////////////////////////////////////////////////////////////////////

  ////////////////////////////
  // the body of each message is a string of HTML element, so it needs to be etracted and decoded
  const extractHTML = (html) => {
    const decodedStripedHtml = he.decode(html.replace(/<[^>]+>/g, ""));
    return decodedStripedHtml;
  };
  /////////////////////////////

  const createMessage = async () => {
    setSubject("");
    setBody("");
    const Odoo = new OdooConfig(user.email, user.password);

    await Odoo.odoo
      .connect()
      .then((response) => {
        console.log(response.success);
        if (response.success) {
          setIsLoading(false);
          //////////////////////////////////////////////
          const params = {
            model: "mail.channel",
            res_id: channel_id,
            subject: subject,
            body: body,
            channel_ids: [channel_id],
            author_id: user.partner_id,
            author_avatar: user.more_info[0].image_1920,
          };

          Odoo.odoo
            .create("mail.message", params)
            .then((response) => {
              // immediately add the newly created message to the context data, this will make it appear on the chat box immediately
              addMessages([
                ...messages,
                {
                  author_id: [user.partner_id, user.name],
                  author_avatar: user.more_info[0].image_1920,
                  subject: subject,
                  message_type: "comment",
                  channel_ids: [channel_id],
                  body: body,
                  date: "new",
                },
              ]);
              console.log(response);
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
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{channel_name}</Text>
      </View>
      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef.current.scrollToEnd({ animated: true })
        }>
        {msgs.map((msg, i) => (
          <ListItem key={i} bottomDivider>
            {msg.author_avatar ? (
              <Image
                style={styles.avatar}
                source={{ uri: `data:image/png;base64,${msg.author_avatar}` }}
              />
            ) : (
              <Ionicons name="ios-person" size={40} color="#7c7bad" />
            )}
            <ListItem.Content>
              <ListItem.Title style={styles.author}>
                {msg.author_id[1]}
                {" - "}
                <ListItem.Subtitle style={styles.date}>
                  {msg.date}
                </ListItem.Subtitle>
              </ListItem.Title>

              <ListItem.Content>
                <ListItem.Subtitle style={styles.subject}>
                  Subject: {msg.subject}
                </ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Content>
                <ListItem.Subtitle>
                  Body:{" "}
                  {extractHTML(msg.body)
                    ? extractHTML(msg.body)
                    : "(images are not supported)"}
                </ListItem.Subtitle>
              </ListItem.Content>
            </ListItem.Content>
          </ListItem>
        ))}
      </ScrollView>

      <View style={styles.footer2}>
        <View style={styles.inpView}>
          <TextInput
            value={subject}
            style={styles.input1}
            underlineColorAndroid="transparent"
            placeholder="Type Subject here"
            onChangeText={(text) => setSubject(text)}
          />
          <TextInput
            value={body}
            style={styles.input2}
            multiline={true}
            underlineColorAndroid="transparent"
            placeholder="Type Body here"
            onChangeText={(text) => setBody(text)}
          />
        </View>

        <TouchableOpacity onPress={() => createMessage()}>
          <Text style={styles.send2}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
