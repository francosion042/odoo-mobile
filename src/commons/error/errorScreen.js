import React from "react";
import { View, Text } from "react-native";
import styles from "./styles/errorStyles";

function ErrorScreen() {
  return (
    <View style={styles.main}>
      <Text>Poor Network</Text>
    </View>
  );
}

export default ErrorScreen;
