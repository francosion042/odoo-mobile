import React from "react";
import { View, Text, useWindowDimensions, ScrollView } from "react-native";
import HTML from "react-native-render-html";
import styles from "../styles/detailsStyles";

const NotificationDetails = ({ navigation, route }) => {
  const { subject, body } = route.params;

  const contentWidth = useWindowDimensions().width;
  const computeEmbeddedMaxWidth = (availableWidth) => {
    return Math.min(availableWidth, 500);
  };
  return (
    <ScrollView>
      <View style={styles.detailsHeader}>
        <Text style={styles.headerSubject}>{subject}</Text>
      </View>

      <View style={styles.bodyContainer}>
        <HTML
          source={{ html: body }}
          contentWidth={contentWidth}
          computeEmbeddedMaxWidth={computeEmbeddedMaxWidth}
        />
      </View>
    </ScrollView>
  );
};

export default NotificationDetails;
