import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    height: 20,
    backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontWeight: "bold",
  },
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
  footer: {
    flexDirection: "row",
    backgroundColor: "#eee",
    height: 50,
  },
  footer2: {
    flexDirection: "row",
    backgroundColor: "#eee",
    height: 90,
  },
  input: {
    paddingHorizontal: 20,
    fontSize: 15,
    flex: 1,
  },
  inpView: {
    flexDirection: "column",
    flex: 1,
    borderRightWidth: 2,
    borderRightColor: "#b9bcbe",
    borderLeftWidth: 2,
    borderLeftColor: "#b9bcbe",
  },
  input1: {
    paddingHorizontal: 10,
    fontSize: 15,
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#b9bcbe",
  },
  input2: {
    paddingHorizontal: 10,
    fontSize: 15,
    flex: 2,
  },
  send: {
    alignSelf: "center",
    color: "lightseagreen",
    fontSize: 16,
    fontWeight: "bold",
    padding: 12,
  },
  send2: {
    alignSelf: "center",
    color: "lightseagreen",
    fontSize: 16,
    fontWeight: "bold",
    padding: 12,
    marginVertical: 20,
  },
});

export default styles;
