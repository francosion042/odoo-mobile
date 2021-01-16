import React, { useState, useContext, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Agenda } from "react-native-calendars";
import { Card } from "react-native-paper";
import styles from "./styles/style";
import { AuthContext } from "../../contexts";
import { LoadingScreen } from "../../commons";
import { OdooConfig } from "../../../constants/configs";

const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split("T")[0];
};

const Calendar = () => {
  const { user } = useContext(AuthContext);
  const [items, setItems] = useState({});
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const Odoo = new OdooConfig(user.email, user.password);
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
            // order: "date DESC",
          };

          await Odoo.odoo
            .search_read("calendar.event", params)
            .then((response) => {
              if (response.data) {
                setEvents(data);
                setIsLoading(false);
              }
            })
            .catch((e) => {
              console.log(e);
            });
        } else {
          setIsLoading(false);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const loadItems = (day) => {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);
        if (!items[strTime]) {
          items[strTime] = [];
          // const numItems = Math.floor(Math.random() * 3 + 1);
          // for (let j = 0; j < numItems; j++) {
          //   items[strTime].push({
          //     name: "Item for " + strTime + " #" + j,
          //     height: Math.max(50, Math.floor(Math.random() * 150)),
          //   });
          // }
        }
      }
      const newItems = {};
      Object.keys(items).forEach((key) => {
        newItems[key] = items[key];
      });
      setItems(newItems);
    }, 1000);
  };

  const renderItem = (item) => {
    return (
      <TouchableOpacity style={[styles.item, { height: item.height }]}>
        <Card>
          <Card.Content>
            <View>
              <Text>{item.name}</Text>
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  const renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty date!</Text>
      </View>
    );
  };

  console.log(items);

  const getToday = () => {
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();

    return (today = `${yyyy}-${mm}-${dd}`);
  };

  return (
    <View style={{ flex: 1 }}>
      <Agenda
        items={items}
        loadItemsForMonth={loadItems}
        selected={getToday}
        renderItem={renderItem}
        // renderEmptyDate={renderEmptyDate}
        // markingType={'period'}
        // markedDates={{
        //    '2017-05-08': {textColor: '#43515c'},
        //    '2017-05-09': {textColor: '#43515c'},
        //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
        //    '2017-05-21': {startingDay: true, color: 'blue'},
        //    '2017-05-22': {endingDay: true, color: 'gray'},
        //    '2017-05-24': {startingDay: true, color: 'gray'},
        //    '2017-05-25': {color: 'gray'},
        //    '2017-05-26': {endingDay: true, color: 'gray'}}}
        // monthFormat={'yyyy'}
        // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
        //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
        // hideExtraDays={false}
      />
    </View>
  );
};

export default Calendar;
