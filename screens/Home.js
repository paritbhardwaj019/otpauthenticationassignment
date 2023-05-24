import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  TextInput,
  Alert,
} from "react-native";
import PhoneInputScreen from "../components/PhoneInputScreen";
import { useRef, useState } from "react";
import { firebaseConfig } from "../config/firebase";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import firebase from "firebase/compat/app";

export default function Home({ route, navigation }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationId, setVerificationId] = useState(null);
  const [code, setCode] = useState("");
  const recaptchaVerifier = useRef(null);

  function confirmCode() {
    if (!code) {
      return Alert.alert("Not valid code");
    }
    const credential = firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      code
    );
    firebase
      .auth()
      .signInWithCredential(credential)
      .then(() => setCode(""))
      .catch((err) => Alert.alert(err));
    Alert.alert("Login Successfull");
  }

  function sendVerification() {
    Keyboard.dismiss();
    if (!phoneNumber) {
      return Alert.alert("Not valid number");
    }
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    phoneProvider
      .verifyPhoneNumber(phoneNumber, recaptchaVerifier.current)
      .then(setVerificationId)
      .catch((err) => Alert.alert(err));
    setPhoneNumber("");
  }

  return (
    <View style={styles.main}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
      />
      <Text
        style={{
          fontFamily: "monospace",
          color: "#fff",
          fontWeight: "600",
          fontSize: 20,
          padding: 20,
          marginBottom: 25,
          textAlign: "center",
        }}
      >
        Stay one step ahead with our lightning-fast OTP Authentication.
      </Text>
      <View style={{ width: "80%" }}>
        <PhoneInputScreen
          setPhoneNumber={setPhoneNumber}
          phoneNumber={phoneNumber}
        />
      </View>
      <TouchableOpacity
        style={{ width: "80%" }}
        onPress={() => {
          sendVerification();
        }}
      >
        <Text
          style={{
            fontFamily: "monospace",
            marginTop: 30,
            backgroundColor: "#f5f6fa",
            width: "100%",
            paddingBottom: 20,
            paddingTop: 20,
            textAlign: "center",
            fontSize: 16,
            borderRadius: 4,
            color: "#192a56",
            marginBottom: 30,
          }}
        >
          Send Verification Code
        </Text>
      </TouchableOpacity>
      <Text
        style={{
          fontFamily: "monospace",
          color: "#fff",
          fontWeight: "600",
          fontSize: 20,
          padding: 20,
          marginBottom: 25,
          textAlign: "center",
        }}
      >
        OTP Screen
      </Text>
      <TextInput
        placeholder="Confirm Code"
        onChangeText={setCode}
        keyboardType="number-pad"
        value={code}
        style={{
          width: "80%",
          fontFamily: "monospace",
          color: "#000",
          fontWeight: "600",
          fontSize: 14,
          padding: 18,
          backgroundColor: "#fff",
        }}
      />
      <TouchableOpacity onPress={confirmCode} style={{ width: "80%" }}>
        <Text
          style={{
            fontFamily: "monospace",
            marginTop: 30,
            backgroundColor: "#f5f6fa",
            width: "100%",
            paddingBottom: 20,
            paddingTop: 20,
            textAlign: "center",
            fontSize: 16,
            borderRadius: 4,
            color: "#192a56",
          }}
        >
          Confirm Code
        </Text>
      </TouchableOpacity>
      <StatusBar hidden={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    width: "100%",
    height: "100%",
    backgroundColor: "#192a56",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
