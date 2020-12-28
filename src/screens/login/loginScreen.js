import React, { useState, useEffect, useContext } from "react";
import {
  Keyboard,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import { Button } from "react-native-elements";
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
            <Button
              buttonStyle={styles.loginButton}
              onPress={() => authenticate()}
              title="Login"
            />
            {/* <Button
              buttonStyle={styles.fbLoginButton}
              onPress={() => this.onFbLoginPress()}
              title="Login with Facebook"
              color="#3897f1"
            /> */}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );

  // return (
  //   <View style={styles.container}>
  //     <View style={styles.rect2}>
  //       <Text style={styles.loremIpsum}>Odoo Mobile App</Text>
  //     </View>
  //     <View style={styles.rect}>
  //       <Input
  //         placeholder="Email"
  //         placeholderColor="#c4c3cb"
  //         value={email}
  //         onChangeText={(text) => setEmail(text)}
  //         autoCapitalize="none"
  //         autoCorrect={false}
  //         style={styles.email}
  //       />
  //       <Input
  //         placeholder="Password"
  //         placeholderColor="#c4c3cb"
  //         value={password}
  //         onChangeText={(text) => setPassword(text)}
  //         secureTextEntry={true}
  //         autoCapitalize="none"
  //         autoCorrect={false}
  //         style={styles.password}
  //       />
  //       <Text style={styles.loremIpsum2}></Text>
  //       <TouchableOpacity onPress={() => authenticate()} style={styles.button}>
  //         <Text style={styles.logIn}>Log In</Text>
  //       </TouchableOpacity>
  //     </View>
  //   </View>
  // );
}

// export default (props) => {
//   return (
//     <AuthContextProvider>
//       <Login navigation={props.navigation} />
//     </AuthContextProvider>
//   );
// };

export default Login;
