import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import CustomButton from "@/components/CustomButton";
import Progress from "@/components/Progress";
import Header2 from "@/components/Header2";
import { router } from "expo-router";
import { useGlobalContext } from "@/context/GlobalProvider";

const School = () => {
  const [school, setSchool] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [otherSchool, setOtherSchool] = useState<string>("");
  const { signUpData, setSignUpData } = useGlobalContext();

  const handleSubmit = () => {
    setSignUpData({
      ...signUpData,
      secondarySchool: school || otherSchool,
      schoolYear: year,
    });
    router.push("/university");
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Header2
        heading1="Choose Your Tribe"
        heading2="Choose your Secondary School Tribe & Start Connecting with Your Alumni"
      />
      <View style={styles.container}>
        <View style={styles.row}>
          <TextInput
            placeholder="Enter Secondary School"
            style={{ ...styles.input, width: 200 }}
            value={school}
            onChangeText={(text) => setSchool(text)}
          />
          <TextInput
            placeholder="Year"
            style={{ ...styles.input, width: 100 }}
            value={year}
            onChangeText={(text) => setYear(text)}
            keyboardType="numeric"
          />
        </View>
        <TextInput
          placeholder="Enter Secondary School if not listed"
          style={{ ...styles.input, width: 300, marginBottom: 30 }}
          value={otherSchool}
          onChangeText={(text) => setOtherSchool(text)}
        />

        <CustomButton size={18} text="Next" handlePress={handleSubmit} />
      </View>

      <TouchableOpacity
        onPress={() => router.push("/university")}
        style={{
          position: "absolute",
          bottom: 15,
          left: 20,
        }}
      >
        <Text
          style={{
            color: "white",
            fontFamily: "ReemRegular",
          }}
        >
          Skip
        </Text>
      </TouchableOpacity>
      <Progress activeCircles={2} />
    </SafeAreaView>
  );
};

export default School;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4B008290",
    gap: 40,
  },
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginBottom: 10,
  },
  inputContainer: {
    width: 180,
    borderRadius: 50,
    overflow: "hidden",
  },
  pickerButton: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 50,
    alignItems: "center",
    color: "#969696",
    fontFamily: "ReemRegular",
  },
  input: {
    backgroundColor: "white",
    textAlign: "center",
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    color: "#969696",
    fontFamily: "ReemRegular",
  },
});
