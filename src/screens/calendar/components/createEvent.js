import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/FontAwesome";
import DatePicker from "react-native-date-picker";
import moment from "moment";
import { AuthContext, CalendarContext } from "../../../contexts";
import { OdooConfig } from "../../../../constants/configs";
import styles from "../styles/eventStyle";

const CreateEvent = ({ navigation, route }) => {
  const { user } = useContext(AuthContext);
  const { events, addEvents } = useContext(CalendarContext);

  const [modalVisible, setModalVisible] = useState(false);
  ////////////////////////
  const [subject, setSubject] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [stopDate, setStopDate] = useState(new Date());

  const start = moment(startDate).format("YYYY-MM-DD HH:mm:ss");
  const stop = moment(stopDate).format("YYYY-MM-DD HH:mm:ss");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [allday, setAllday] = useState("");
  const [location, setLocation] = useState("");

  const startDateStr = start.toString();

  const stopDateStr = stop.toString();
  console.log(start);

  const createEvent = async () => {
    const Odoo = new OdooConfig(user.email, user.password);

    await Odoo.odoo
      .connect()
      .then((response) => {
        console.log(response.success);
        if (response.success) {
          //////////////////////////////////////////////

          const params = {
            name: subject,
            start: start,
            stop: stop,
            description: description,
            location: location,
          };

          Odoo.odoo
            .create("calendar.event", params)
            .then((response) => {
              console.log(response);
              if (response.success) {
                //when the even is created, make another request to pull all the data
                Odoo.odoo
                  .connect()
                  .then(async (response) => {
                    console.log(response.success);
                    console.log(user.email, "||", user.password);
                    if (response.success) {
                      const params = {
                        // domain: [["message_type", "=", "notification"]],
                        fields: [
                          "id",
                          "name",
                          "start",
                          "stop",
                          "duration",
                          "allday",
                          "location",
                          "description",
                        ],
                      };

                      await Odoo.odoo
                        .search_read("calendar.event", params)
                        .then((response) => {
                          if (response.data) {
                            addEvents(response.data);
                            console.log(response.data);
                            navigation.navigate("Calendar");
                          }
                        })
                        .catch((e) => {
                          console.log(e);
                        });
                    } else {
                      setIsLoading(false);
                      alert("network connection problem");
                    }
                  })
                  .catch((e) => {
                    console.log(e);
                  });
              }
            })
            .catch((e) => {
              console.log(e);
            });
          ///////////////////////////////////////////////////
        } else {
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  ////////////////////////////////////////////////
  return (
    <ScrollView>
      <View style={styles.containerView}>
        <View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Meeting Subject</Text>
            <TextInput
              placeholder="Subject"
              placeholderColor="#c4c3cb"
              value={subject}
              onChangeText={(text) => setSubject(text)}
              style={styles.FormTextInput}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Start Date-Time</Text>
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={styles.FormTextInput}>
              <Text style={styles.modalOpenText}>{startDateStr}</Text>
            </TouchableOpacity>
            <Modal transparent={true} visible={modalVisible}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <DatePicker date={startDate} onDateChange={setStartDate} />
                  <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <Icon name="save" size={30} color="#A1CDF2" />
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Stop Date-Time</Text>
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={styles.FormTextInput}>
              <Text style={styles.modalOpenText}>{stopDateStr}</Text>
            </TouchableOpacity>
            <Modal transparent={true} visible={modalVisible}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <DatePicker date={stopDate} onDateChange={setStopDate} />
                  <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <Icon name="save" size={30} color="#A1CDF2" />
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
          <View style={styles.inputContainerDesc}>
            <Text style={styles.inputLabel}>Meeting Description</Text>
            <TextInput
              placeholder="Description"
              placeholderColor="#c4c3cb"
              value={description}
              multiline={true}
              numberOfLines={10}
              onChangeText={(text) => setDescription(text)}
              style={[
                styles.FormTextInput,
                {
                  height: 100,
                  justifyContent: "flex-start",
                  textAlignVertical: "top",
                },
              ]}
            />
          </View>
          {/* <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Meeting Duration</Text>
            <TextInput
              placeholder="Hours"
              placeholderColor="#c4c3cb"
              value={duration}
              onChangeText={(text) => setDuration(text)}
              style={styles.FormTextInput}
            />
          </View> */}

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Meeting Location</Text>
            <TextInput
              placeholder="Location"
              placeholderColor="#c4c3cb"
              value={location}
              onChangeText={(text) => setLocation(text)}
              style={styles.FormTextInput}
            />
          </View>

          <TouchableOpacity onPress={() => createEvent()}>
            <LinearGradient
              colors={["#017AFF", "#A1CDF2"]}
              style={styles.saveButton}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}>
              <Text style={styles.saveText}>Save</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default CreateEvent;
