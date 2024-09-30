import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import CustomButton from "@/components/CustomButton";
import Progress from "@/components/Progress";
import { router } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";
import CustomPicker from "@/components/CustomPicker";
import { useGlobalContext } from "@/context/GlobalProvider";

const GetStarted = () => {
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [dateOfBirth, setDateOfBirth] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [gender, setGender] = useState<string>("");
  const genderItems = [
    { label: "Select Gender", value: "" },
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
  ];
  const [username, setUsername] = useState<string>("");
  const { signUpData, setSignUpData } = useGlobalContext();

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidAge = (dob: Date): boolean => {
    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    return (
      age > 18 ||
      (age === 18 && monthDiff >= 0 && today.getDate() >= dob.getDate())
    );
  };

  const handleSubmit = () => {
    if (!username) {
      return Alert.alert("Validation Error", "Please enter a username.");
    }
    if (!fullName) {
      return Alert.alert("Validation Error", "Please enter your full name.");
    }
    if (!isValidEmail(email)) {
      return Alert.alert(
        "Validation Error",
        "Please enter a valid email address."
      );
    }
    if (!isValidAge(dateOfBirth)) {
      return Alert.alert(
        "Validation Error",
        "You must be at least 18 years old."
      );
    }
    if (!gender) {
      return Alert.alert("Validation Error", "Please select your gender.");
    }

    setSignUpData({
      ...signUpData,
      username,
      fullName,
      email,
      dateOfBirth,
      gender,
    });

    router.push("/location");
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Header
        heading1="Let's Get Started"
        heading2="Enter Your Personal Details"
      />
      <View style={styles.formContainer}>
        <TextInput
          placeholder="Username"
          style={styles.input}
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          placeholder="Full Name"
          style={styles.input}
          value={fullName}
          onChangeText={setFullName}
        />
        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          placeholder="Date of Birth"
          style={styles.input}
          value={dateOfBirth.toLocaleDateString()}
          onFocus={() => setShowDatePicker(true)}
        />
        {showDatePicker && (
          <DateTimePicker
            value={dateOfBirth}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) {
                setDateOfBirth(selectedDate);
              }
            }}
          />
        )}
        <CustomPicker
          selectedValue={gender}
          onValueChange={setGender}
          items={genderItems}
        />
        <CustomButton size={18} text="Next" handlePress={handleSubmit} />
      </View>
      <Progress activeCircles={1} />
    </SafeAreaView>
  );
};

export default GetStarted;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4B008290",
    gap: 40,
  },
  formContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
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
  errorText: {
    color: "red",
    marginBottom: 10,
    fontFamily: "ReemRegular",
    textAlign: "right",
  },
  successText: {
    color: "green",
    marginBottom: 10,
    fontFamily: "ReemRegular",
    textAlign: "right",
  },
});
