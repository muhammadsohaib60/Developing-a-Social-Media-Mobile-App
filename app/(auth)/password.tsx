import { Alert, SafeAreaView, StyleSheet, TextInput, View } from "react-native";
import React, { useState } from "react";
import CustomButton from "@/components/CustomButton";
import Progress from "@/components/Progress";
import { router } from "expo-router";
import Header from "@/components/Header";
import { useGlobalContext } from "@/context/GlobalProvider";

const Password = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { signUpData, setSignUpData } = useGlobalContext();

  const handleSubmit = () => {
    if (password !== confirmPassword) {
      return Alert.alert("Passwords do not match");
    }

    setSignUpData({ ...signUpData, password });

    router.push("/getStarted");
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Header heading1="Password" heading2="Enter your Password" />
      <View
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TextInput
          placeholder="Password"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          placeholder="Confirm Password"
          style={styles.input}
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <CustomButton size={18} text="Next" handlePress={handleSubmit} />
      </View>

      <Progress activeCircles={1} />
    </SafeAreaView>
  );
};

export default Password;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4B008290",
    gap: 40,
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
});
