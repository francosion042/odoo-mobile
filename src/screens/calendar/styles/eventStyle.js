import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    marginTop: 20,
  },
  inputContainer: {
    marginLeft: 15,
    marginRight: 15,
  },
  inputContainerDesc: {
    marginLeft: 15,
    marginRight: 15,
    height: 130,
  },

  FormTextInput: {
    height: 43,
    fontSize: 14,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#eaeaea",
    backgroundColor: "#fafafa",
    paddingLeft: 10,
    // marginLeft: 15,
    // marginRight: 15,
    marginTop: 5,
    marginBottom: 5,
  },
  inputLabel: {
    color: "#017AFF",
  },
  saveButton: {
    borderRadius: 5,
    height: 45,
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
  },
  saveText: {
    color: "#121212",
    textAlign: "center",
    marginTop: 10,
    fontSize: 20,
    fontWeight: "300",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
  },
  modalView: {
    margin: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalOpenText: {
    color: "#121212",
    // textAlign: "center",
    marginTop: 10,
    fontSize: 15,
    fontWeight: "300",
  },
});

export default styles;
