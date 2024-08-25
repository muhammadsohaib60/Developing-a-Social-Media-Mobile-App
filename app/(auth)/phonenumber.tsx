import { StyleSheet, View, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";
import CustomButton from "@/components/CustomButton";
import Progress from "@/components/Progress";
import PhoneInput from "react-native-phone-number-input";
import { router } from "expo-router";

const PhoneNumber = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const phoneInput = React.createRef<any>();

  const handleSubmit = () => {
    const isValid = phoneInput.current?.isValidNumber(phoneNumber);
    router.push("/password");
    // if (isValid) {
    //   router.push("/password");
    // } else {
    //   Alert.alert("Invalid Phone Number", "Please enter a valid phone number.");
    // }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Header heading1="Phone Number" heading2="Enter your Phone Number" />

      <PhoneInput
        ref={phoneInput}
        defaultValue={phoneNumber}
        defaultCode="NG"
        layout="first"
        onChangeFormattedText={(text) => {
          setPhoneNumber(text);
        }}
        withShadow
        autoFocus
        containerStyle={{ borderRadius: 50 }}
        textContainerStyle={{
          borderRadius: 50,
          backgroundColor: "white",
        }}
      />

      <CustomButton size={18} text="Next" handlePress={handleSubmit} />
      <Progress activeCircles={1} />
    </SafeAreaView>
  );
};

export default PhoneNumber;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4B008290",
    gap: 40,
  },
});
