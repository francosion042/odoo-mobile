import React from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import styles from "./styles/homeStyles";

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Discuss")}>
          <LinearGradient
            colors={["#017AFF", "#A1CDF2"]}
            style={styles.rect5}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          />
          <Text style={styles.discuss}>Discuss</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button2}
          onPress={() => navigation.navigate("Projects")}>
          <LinearGradient
            colors={["#017AFF", "#A1CDF2"]}
            style={styles.rect5}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          />
          <Text style={styles.projects}>Projects</Text>
        </TouchableOpacity>
      </View>
      {/* <View>
        <Image
          source={{
            uri: "",
          }}
          style={styles.image}
        />
      </View> */}
    </View>
  );
}
