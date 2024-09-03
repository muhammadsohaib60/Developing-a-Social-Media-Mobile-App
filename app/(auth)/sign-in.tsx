import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState,useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import Checkbox from "expo-checkbox";
import { useRouter } from "expo-router";
import Header from "@/components/Header";
import { signin } from "@/utils/authMethods";
import { signupDataManager } from "./SignupDataManager"; // Import the SignupDataManager

const SignIn = () => {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isRemembered, setIsRemembered] = useState(false);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchRegionalData();
  }, []);

  const fetchRegionalData = async () => {
    try {
      setIsLoading(true);
      await signupDataManager.fetchRegionalData();

      const regionalData = signupDatadManager.getRegionalData();
        
        console.log('Full Regional Data:', JSON.stringify(regionalData, null, 2));
    } catch (error) {
      console.error("Error fetching regional data:", error);
      Alert.alert("Error", "Failed to fetch regional data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async () => {
    try {
      if (!emailOrPhone || !password) {
        Alert.alert("Error", "Please fill in all fields.");
        return;
      }

      await signin(emailOrPhone, password);

      // Navigate to home on successful sign-in
      router.push("/home");
    } catch (error) {
      console.error("Sign-in failed:", error);
      Alert.alert("Error", "Sign-in failed. Please try again.");
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Header heading1="Sign in" heading2="Let's connect to the tribe again" />

      <TextInput
        placeholder="Email / Phone Number"
        style={styles.input}
        value={emailOrPhone}
        onChangeText={setEmailOrPhone}
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <View style={styles.optionsContainer}>
        <View style={styles.rememberMeContainer}>
          <Checkbox
            style={styles.checkbox}
            value={isRemembered}
            onValueChange={setIsRemembered}
            color={isRemembered ? "#4630EB" : undefined}
          />
          <Text style={styles.rememberMeText}>Remember Me</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      <CustomButton handlePress={handleSignIn} text="Sign in" size={18} />
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4B008290",
    gap: 20,
  },

  input: {
    backgroundColor: "white",
    width: "70%",
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    marginBottom: 10,
    color: "#969696",
    fontFamily: "ReemRegular",
  },
  optionsContainer: {
    width: "70%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  rememberMeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    marginRight: 10,
    color: "white",
  },
  rememberMeText: {
    color: "white",
    fontSize: 14,
    fontFamily: "ReemRegular",
  },
  forgotPasswordText: {
    color: "white",
    fontSize: 13,
    fontFamily: "ReemRegular",
  },
});
