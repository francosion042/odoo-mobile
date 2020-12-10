import React from "react";
import { ActivityIndicator, View } from "react-native";
import styles from "./styles/loadingStyles";

function LoadingScreen() {
  return (
    <View style={styles.main}>
      <ActivityIndicator size="large" />
    </View>
  );
}

export default LoadingScreen;
