import React, { useState, useEffect, useContext } from "react";
import {
  Keyboard,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Alert,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import { Button } from "react-native-elements";
import LinearGradient from "react-native-linear-gradient";
import { CommonActions } from "@react-navigation/stack";
import { OdooConfig } from "../../../constants/configs";
import styles from "./styles/style";
import { LoadingScreen } from "../../commons";
import { AuthContext } from "../../contexts";

export function Login({ navigation }) {
  //access the authContext and call the createUser function
  const { createUser, user } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const authenticate = async () => {
    setIsLoading(true);
    const Odoo = new OdooConfig(email, password);

    await Odoo.odoo
      .connect()
      .then((response) => {
        console.log(response.success);
        if (response.success) {
          ////////////////////////////////////////////////////////////////
          const params = {
            domain: [["id", "=", response.data.partner_id]],
            fields: [
              "street",
              "city",
              "country_id",
              "phone",
              "email",
              "image_1920",
            ],
          };

          Odoo.odoo
            .search_read("res.partner", params)
            .then((response2) => {
              createUser({
                ...response.data,
                email,
                password,
                more_info: [...response2.data],
              });
              setIsLoading(false);
            })
            .catch((e) => {
              console.log(e);
            });
          ////////////////////////////////////////////////////////////////
          return navigation.dispatch(
            CommonActions.reset({
              index: 0, //places homeScreen on 0 index and clears login from stack
              routes: [
                {
                  name: "Home",
                },
              ],
            })
          );
        } else if (response.error.data.arguments[0] === "Access denied") {
          setIsLoading(false);
          setError("Incorrect Email or Password");
        } else if (!response.success) {
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      })
      .catch((e) => {
        console.log(e);
        return false;
      });
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <KeyboardAvoidingView style={styles.containerView} behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.loginScreenContainer}>
          <View style={styles.loginFormView}>
            <Text style={styles.logoText}>Odoo Mobile</Text>
            <TextInput
              placeholder="Username"
              placeholderColor="#c4c3cb"
              style={styles.loginFormTextInput}
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <TextInput
              placeholder="Password"
              placeholderColor="#c4c3cb"
              style={styles.loginFormTextInput}
              secureTextEntry={true}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity onPress={() => authenticate()}>
              <LinearGradient
                colors={["#017AFF", "#A1CDF2"]}
                style={styles.loginButton}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}>
                <Text style={styles.logInText}>Log In</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

// export default (props) => {
//   return (
//     <AuthContextProvider>
//       <Login navigation={props.navigation} />
//     </AuthContextProvider>
//   );
// };

export default Login;
