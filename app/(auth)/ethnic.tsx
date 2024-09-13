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

const Ethnic = () => {
  const { signUpData, setSignUpData } = useGlobalContext();
  const [tribe, setTribe] = useState<string>("");
  const [otherTribe, setOtherTribe] = useState<string>("");
  const { countryData } = useGlobalContext();
  const [tribes, setTribes] = useState<any>([
    {
      label: "Choose your ethnic group",
      value: "",
    },
    ...countryData.ethnicGroups
      .map((tribe: any) => ({
        label: tribe,
        value: tribe,
      }))
      .sort((a: any, b: any) => a.label.localeCompare(b.label)),
  ]);

  const handleSubmit = () => {
    if (!tribe && !otherTribe) {
      return Alert.alert("Validation Error", "Please select a tribe");
    }

    setSignUpData({
      ...signUpData,
      ethnicTribe: tribe || otherTribe,
    });

    router.push("/pictures");
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Header2
        heading1="Choose Your Tribe"
        heading2="Choose Your Ethnic Tribe to Start Connecting"
      />
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
          items={tribes}
          selectedValue={tribe}
          onValueChange={setTribe}
        />
        <TextInput
          placeholder="Enter Ethnic Tribe if not listed"
          style={styles.input}
          value={otherTribe}
          onChangeText={(text) => setOtherTribe(text)}
        />

        <CustomButton size={18} text="Next" handlePress={handleSubmit} />
      </View>

      <Progress activeCircles={3} />
    </SafeAreaView>
  );
};

export default Ethnic;

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
