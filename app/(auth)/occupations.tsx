import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import CustomButton from "@/components/CustomButton";
import Progress from "@/components/Progress";
import { router } from "expo-router";
import Header2 from "@/components/Header2";
import { useGlobalContext } from "@/context/GlobalProvider";
import CustomPicker from "@/components/CustomPicker";

const Occupation = () => {
  const { signUpData, setSignUpData } = useGlobalContext();
  const [occupation, setOccupation] = useState<string>("");
  const [otherOccupation, setOtherOccupation] = useState<string>("");

  // Dummy occupation data
  const occupations = [
    { label: "Select Occupation", value: "" },
    { label: "Software Engineer", value: "software_engineer" },
    { label: "Doctor", value: "doctor" },
    { label: "Teacher", value: "teacher" },
    { label: "Designer", value: "designer" },
    { label: "Accountant", value: "accountant" },
    { label: "Other", value: "other" },
  ];

  const handleSubmit = () => {
    if (!occupation && !otherOccupation) {
      return Alert.alert("Validation Error", "Please select an occupation");
    }

    setSignUpData({
      ...signUpData,
      occupation: occupation || otherOccupation,
    });

    router.push("/religion"); // Change to your next screen route
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Header2 heading1="Occupation" heading2="Select Your Occupation" />
      <View
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CustomPicker
          items={occupations}
          selectedValue={occupation}
          onValueChange={setOccupation}
        />
        <TextInput
          placeholder="Enter occupation if not listed"
          style={styles.input}
          value={otherOccupation}
          onChangeText={(text) => setOtherOccupation(text)}
        />

        <CustomButton size={18} text="Next" handlePress={handleSubmit} />
      </View>
      <Progress activeCircles={2} />
      {/* Adjust active circles based on navigation */}
    </SafeAreaView>
  );
};

export default Occupation;

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
