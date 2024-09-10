import { StyleSheet, View, Alert } from "react-native";
import React, { useState,useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";
import CustomButton from "@/components/CustomButton";
import Progress from "@/components/Progress";
import PhoneInput from "react-native-phone-number-input";
import { router } from "expo-router";
import { useGlobalContext } from "@/context/GlobalProvider";
import { signupDataManager } from './SignupDataManager';

const PhoneNumber = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const phoneInput = React.createRef<any>();

  const { signUpData, setSignUpData } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchRegionalData();
  }, []);

  const fetchRegionalData = async () => {
    try {
      setIsLoading(true);
      await signupDataManager.fetchRegionalData();

      const regionalData = signupDataManager.getRegionalData();
        
        console.log('Full Regional Data:', JSON.stringify(regionalData, null, 2));
    } catch (error) {
      console.error("Error fetching regional data:", error);
      Alert.alert("Error", "Failed to fetch regional data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = () => {
    const isValid = phoneInput.current?.isValidNumber(phoneNumber);
    router.push("/password");
    if (isValid) {
      setSignUpData({ ...signUpData, phone: phoneNumber });
      router.push("/password");
    } else {
      Alert.alert("Invalid Phone Number", "Please enter a valid phone number.");
    }
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
