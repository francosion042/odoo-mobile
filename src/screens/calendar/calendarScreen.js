import React, { useState, useContext, useEffect } from "react";
import { View, Text, TouchableOpacity, RefreshControl } from "react-native";
import { Agenda } from "react-native-calendars";
import { Card } from "react-native-paper";
import styles from "./styles/style";
import { CalendarContext } from "../../contexts";
import { LoadingScreen } from "../../commons";

const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split("T")[0];
};

const Calendar = ({ route, navigation }) => {
  const [items, setItems] = useState({});
  const { events } = useContext(CalendarContext);
  const [isLoading, setIsLoading] = useState(true);

  const loadItems = (day) => {
    console.log(day);
    for (let i = -15; i < 85; i++) {
      const time = day.timestamp + i * 24 * 60 * 60 * 1000;
      const strTime = timeToString(time);
      if (!items[strTime]) {
        items[strTime] = [];
      }
    }
    //////////////////////////////
    const newItems = {};
    Object.keys(items).forEach((key) => {
      newItems[key] = items[key];
    });
    setItems(newItems);
    /////////////////////////////
    for (let e = 0; e < events.length; e++) {
      //start//////
      const start = events[e].start.split(" ");
      const startDate = start[0];
      const startTime = start[1];
      //////Stop///////
      const stop = events[e].stop.split(" ");
      const stopDate = stop[0];
      const stopTime = stop[1];

      Object.keys(items).forEach((key) => {
        if (startDate === key) {
          //check if item already exists to avoid duplication when rerendering
          if (
            items[key].length !== 0 &&
            items[key].every((event) => event.id !== events[e].id)
          ) {
            console.log(events[e]);
            items[key].push({
              id: events[e].id,
              name: events[e].name,
              time: `${startTime} - ${stopTime}`,
              description: events[e].description,
              location: events[e].location,
            });
          } else if (items[key].length === 0) {
            items[key].push({
              id: events[e].id,
              name: events[e].name,
              time: `${startTime} - ${stopTime}`,
              description: events[e].description,
              location: events[e].location,
            });
          }

          // console.log(items);
        }
      });
    }
  };

  useEffect(() => {
    console.log("params.......", route.params);
    if (route.params) {
      loadItems(route.params);
    }
  }, []);

  const renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Card>
          <Card.Content>
            <View>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text>Time:- {item.time}</Text>
              <Text>Location:- {item.location}</Text>
            </View>
          </Card.Content>
        </Card>
        {item.description ? (
          <Card>
            <Card.Content>
              <Text>{item.description}</Text>
            </Card.Content>
          </Card>
        ) : null}
      </View>
    );
  };

  const getToday = () => {
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();

    return (today = `${yyyy}-${mm}-${dd}`);
  };
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    // <View>
    //   <Text>Hello</Text>
    // </View>
    <Agenda
      items={items}
      loadItemsForMonth={loadItems}
      selected={getToday}
      renderItem={renderItem}
      pastScrollRange={6}
      futureScrollRange={6}
    />
  );
};

export default Calendar;
