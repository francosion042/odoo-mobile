import React, { useContext, useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import he from "he";
import { AuthContext, DiscussContext } from "../../contexts";
import { LoadingScreen } from "../../commons";
import styles from "./styles/messagesStyle";
import { OdooConfig } from "../../../constants/configs";
import MessageBubble from "./components/messageBubble";

export default function DirectMessages({ route, navigation }) {
  const scrollViewRef = useRef();
  const [isLoading, setIsLoading] = useState(true);
  const [msgs, setMsgs] = useState([]);
  const [typing, setTyping] = useState("");

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
    console.log(ms);
    setMsgs(ms);
    setIsLoading(false);
  }, [messages]);
  ///////////////////////////////////////////////////////////////////////
  if (isLoading) {
    return <LoadingScreen />;
  }
  ////////////////////////////
  // the body of each message is a string of HTML element, so it needs to be etracted and decoded
  const extractHTML = (html) => {
    const decodedStripedHtml = he.decode(html.replace(/<[^>]+>/g, ""));
    return decodedStripedHtml;
  };
  /////////////////////////////

  const createMessage = async () => {
    setTyping("");
    const Odoo = new OdooConfig(user.email, user.password);

    await Odoo.odoo
      .connect()
      .then((response) => {
        console.log(response.success);
        if (response.success) {
          setIsLoading(false);
          //////////////////////////////////////////////
          // get all messages and add them to  the discuss context. this will make it easier to navigate between chats
          const params = {
            model: "mail.channel",
            res_id: channel_id,
            body: typing,
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
                  subject: "",
                  message_type: "comment",
                  channel_ids: [channel_id],
                  body: typing,
                  date: "now",
                },
              ]);
            })
            .catch((e) => {
              console.log(e);
            });
          ///////////////////////////////////////////////////
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
        setIsLoading(false);
      });
  };

  console.log(route);

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
        {msgs.map((msg, i) =>
          // console.log(
          //   "Author ID " + msg.author_id + " User ID " + user.partner_id
          // )

          msg.author_id[0] === user.partner_id ? (
            <MessageBubble
              key={i}
              mine
              text={
                extractHTML(msg.body)
                  ? extractHTML(msg.body)
                  : "(images are not supported)"
              }
              date={msg.date}></MessageBubble>
          ) : (
            <MessageBubble
              key={i}
              avatar={msg.author_avatar}
              text={
                extractHTML(msg.body)
                  ? extractHTML(msg.body)
                  : "(images are not supported)"
              }
              date={msg.date}></MessageBubble>
          )
        )}
      </ScrollView>

      <View style={styles.footer}>
        <TextInput
          value={typing}
          style={styles.input}
          multiline={true}
          underlineColorAndroid="transparent"
          placeholder="Type something here"
          onChangeText={(text) => setTyping(text)}
        />
        <TouchableOpacity onPress={() => createMessage()}>
          <Text style={styles.send}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
