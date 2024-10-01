import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import CustomButton from "@/components/CustomButton";
import Progress from "@/components/Progress";
import { router } from "expo-router";
import Header2 from "@/components/Header2";
import { useGlobalContext } from "@/context/GlobalProvider";
import CustomPicker from "@/components/CustomPicker";
import { signupDataManager } from "./SignupDataManager";

const Occupation = () => {
  const { signUpData, setSignUpData } = useGlobalContext();
  const [occupation, setOccupation] = useState<string>("");
  const [otherOccupation, setOtherOccupation] = useState<string>("");
  const [occupations, setOccupations] = useState<any>([]);

  const getOccupations = async () => {
    try {
      const data = await signupDataManager.fetchOccupations();
      console.log(data); // Debugging to see what you're getting

      const arr = data.map((occupation: string) => ({
        label: occupation,
        value: occupation,
      }));

      setOccupations(arr); // Assuming `setOccupations` is a state setter
    } catch (error) {
      console.error("Error fetching occupations:", error);
    }
  };

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

  useEffect(() => {
    getOccupations();
  }, []);

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
