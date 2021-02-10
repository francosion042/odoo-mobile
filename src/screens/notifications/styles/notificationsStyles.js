import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 20,
    width: 30,
    height: 30,
  },
  author: {
    fontSize: 12,
  },
  date: {
    fontSize: 8,
  },
  subject: {
    fontWeight: "bold",
  },
  main: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 300,
  },
  text: {
    alignSelf: "center",
    marginTop: 50,
    fontWeight: "bold",
    fontSize: 15,
  },
});

export default styles;
