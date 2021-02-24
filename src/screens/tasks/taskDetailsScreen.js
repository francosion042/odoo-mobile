import React from "react";
import { View, Text, ScrollView, useWindowDimensions } from "react-native";
import HTML from "react-native-render-html";
import styles from "./styles/detailsStyles";

const TaskDetails = ({ navigation, route }) => {
  const { name, description, partner_id } = route.params;

  const contentWidth = useWindowDimensions().width;
  const computeEmbeddedMaxWidth = (availableWidth) => {
    return Math.min(availableWidth, 500);
  };

  console.log(description, "Description");

  if (!description || description === "<p><br></p>") {
    return (
      <>
        <View style={styles.detailsHeader}>
          <Text style={styles.headerSubject}>{name}</Text>
        </View>
        <View style={styles.main}>
          <Text style={styles.text}>No Description</Text>
        </View>
      </>
    );
  }
  return (
    <ScrollView>
      <View style={styles.detailsHeader}>
        <Text style={styles.headerSubject}>{name}</Text>
      </View>

      <View style={styles.bodyContainer}>
        <HTML
          source={{ html: description }}
          contentWidth={contentWidth}
          computeEmbeddedMaxWidth={computeEmbeddedMaxWidth}
        />
      </View>
    </ScrollView>
  );
};

export default TaskDetails;
