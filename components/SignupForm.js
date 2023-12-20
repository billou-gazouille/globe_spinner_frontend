import React, { useState } from "react";
import {
  View,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import GradientFontColor from "./GradientFontColor";
import { CustomText } from "./CustomText";

import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function SignupForm({ submit, closeModal }) {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showFieldsError, setShowFieldsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const EMAIL_REGEX =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const checkHasEmptyField = (fields) => {
    for (let field of fields) {
      if (!field || field === " ") return true;
    }
    return false;
  };

  const handlePressSubmit = async () => {
    if (
      checkHasEmptyField([
        firstname,
        lastname,
        email,
        password,
        confirmPassword,
      ])
    ) {
      setShowFieldsError(true);
      setErrorMsg("Some fields are empty !");
      return;
    }
    if (!EMAIL_REGEX.test(email)) {
      setShowFieldsError(true);
      setErrorMsg("Email is not valid !");
      return;
    }
    if (password !== confirmPassword) {
      setShowFieldsError(true);
      setErrorMsg("passwords do not match !");
      return;
    }
    if (password.length < 5) {
      setShowFieldsError(true);
      setErrorMsg("password must be at least 5 characters long !");
      return;
    }
    const response = await submit(firstname, lastname, email, password);
    //console.log(response);
    if (!response.result) {
      setShowFieldsError(true);
      setErrorMsg(response.error);
      return;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View>
        <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
          <FontAwesome name="close" size={30} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.titleContainer}>
        <GradientFontColor style={styles.title}>Sign</GradientFontColor>
        <Text style={styles.titleUp}>up</Text>
      </View>
      {showFieldsError && (
        <CustomText style={styles.fieldsError}>{errorMsg}</CustomText>
      )}

      <KeyboardAvoidingView
        enabled={true}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.inputsContainerRow}>
          <View style={styles.textAndInput}>
            <CustomText style={{ fontSize: 20, color: "black" }}>
              first name
            </CustomText>
            <TextInput
              placeholder="firstname"
              style={styles.textInput}
              value={firstname}
              onChangeText={(text) => setFirstname(text)}
              autoFocus={true}
            ></TextInput>
          </View>

          <View style={styles.textAndInput}>
            <CustomText style={{ fontSize: 20, color: "black" }}>
              last name
            </CustomText>
            <TextInput
              placeholder="lastname"
              style={styles.textInput}
              value={lastname}
              onChangeText={(text) => setLastname(text)}
            ></TextInput>
          </View>

          <View style={styles.textAndInput}>
            <CustomText style={{ fontSize: 20, color: "black" }}>
              email
            </CustomText>
            <TextInput
              placeholder="email"
              style={styles.textInput}
              value={email}
              onChangeText={(text) => setEmail(text)}
            ></TextInput>
          </View>

          <View style={styles.textAndInput}>
            <CustomText style={{ fontSize: 20, color: "black" }}>
              password
            </CustomText>
            <TextInput
              placeholder="password"
              secureTextEntry={true}
              style={styles.textInput}
              value={password}
              onChangeText={(text) => setPassword(text)}
            ></TextInput>
          </View>

          <View style={styles.textAndInput}>
            <CustomText style={{ fontSize: 20, color: "black" }}>
              confirm password
            </CustomText>
            <TextInput
              placeholder="confirm password"
              secureTextEntry={true}
              style={styles.textInput}
              value={confirmPassword}
              onChangeText={(text) => setConfirmPassword(text)}
            ></TextInput>
          </View>
        </View>
      </KeyboardAvoidingView>

      <TouchableOpacity style={styles.submitButton} onPress={handlePressSubmit}>
        <CustomText style={styles.submitButtonText}>Submit</CustomText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",

    backgroundColor: "white",
    flex: 1,
    width: "100%",
  },
  titleContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },

  title: {
    marginVertical: 45,
    fontSize: 40,
    fontFamily: "KronaOne_400Regular",
  },
  titleUp: {
    marginVertical: 45,
    fontSize: 40,
    fontFamily: "KronaOne_400Regular",
    color: "#515151",
    marginLeft: 10,
  },
  fieldsError: {
    fontSize: 20,
    justifyContent: "center",
    alignItems: "center",
    color: "red",
    fontWeight: "bold",
  },

  inputsContainerRow: {
    width: "100%",
    marginVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItemps: "baseline",
    flexWrap: "wrap",
  },
  textAndInput: {
    width: "80%",

    marginBottom: 10,
  },
  textInput: {
    fontSize: 16,
    borderBottomColor: "#BA99FE",
    borderBottomWidth: 2,
    paddingVertical: 5,
    marginTop: 10,
  },
  closeButton: {
    width: 60,
    height: 30,
    top: 10,
    right: -200,
    marginBottom: 50,
    zIndex: 99,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  submitButton: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: "#3972D9",
    borderRadius: 25,
    width: 200,
    height: 50,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },
});
