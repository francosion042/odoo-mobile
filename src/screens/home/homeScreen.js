import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import styles from "./styles/homeStyles";

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Discuss")}>
          <View style={styles.rect5}></View>
          <Text style={styles.discuss}>Discuss</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button2}
          onPress={() => navigation.navigate("Projects")}>
          <View style={styles.rect6}></View>
          <Text style={styles.projects}>Projects</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
