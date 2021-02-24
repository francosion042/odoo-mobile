import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  detailsHeader: {
    minHeight: 100,
    backgroundColor: "grey",
    paddingBottom: 20,
  },
  headerSubject: {
    textAlign: "center",
    textAlignVertical: "center",
    marginTop: 40,
    fontSize: 25,
    color: "#fff",
  },
  bodyContainer: {
    width: "90%",
    minHeight: 100,
    borderColor: "grey",
    marginLeft: 20,
    marginRight: 20,
    borderStyle: "solid",
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
