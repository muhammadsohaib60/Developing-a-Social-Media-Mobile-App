import { SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import CustomButton from "@/components/CustomButton";
import Progress from "@/components/Progress";
import { router } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";
import CustomPicker from "@/components/CustomPicker";
import { useGlobalContext } from "@/context/GlobalProvider";

const dummyUsernames = ["john_doe", "jane_doe", "user123"];

const GetStarted = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [gender, setGender] = useState("");
  const genderItems = [
    { label: "Select Gender", value: "" },
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
  ];
  const [username, setUsername] = useState("");
  const [usernameAvailable, setUsernameAvailable] = useState(true);
  const { signUpData, setSignUpData } = useGlobalContext();

  useEffect(() => {
    // Simulate username validation
    const isAvailable = !dummyUsernames.includes(username.toLowerCase());
    setUsernameAvailable(isAvailable);
  }, [username]);

  const handleSubmit = () => {
    if (usernameAvailable) {
      setSignUpData({
        ...signUpData,
        username,
        fullName,
        email,
        dateOfBirth,
        gender
      });

      router.push("/location");
    } else {
      // Handle the case where the username is not available
      alert("Please choose a different username.");
    }
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
        {!usernameAvailable ? (
          <Text style={styles.errorText}>Username not available</Text>
        ) : (
          <Text style={styles.errorText}>Username available</Text>
        )}
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
  pickerContainer: {
    backgroundColor: "white",
    width: "70%",
    borderRadius: 50,
    marginBottom: 10,
    overflow: "hidden", // This ensures the picker is contained within the rounded borders
  },
  picker: {
    width: "100%",
    color: "#969696",
    fontFamily: "ReemRegular",
    paddingHorizontal: 20,
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
    color: "white",
    marginBottom: 10,
    fontFamily: "ReemRegular",
    textAlign: "right",
  },
});
