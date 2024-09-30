import CustomButton from "@/components/CustomButton";
import CustomPicker from "@/components/CustomPicker2";
import CustomPicker3 from "@/components/CustomPicker3";
import Header2 from "@/components/Header2";
import Progress from "@/components/Progress";
import { useGlobalContext } from "@/context/GlobalProvider";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, SafeAreaView, StyleSheet, TextInput, View } from "react-native";

const University = () => {
  const [university, setUniversity] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [otherUniversity, setOtherUniversity] = useState<string>("");
  const [department, setDepartment] = useState<string>("");
  const { signUpData, setSignUpData, countryData } = useGlobalContext();
  const [universities, setUniversities] = useState<any>([
    {
      label: "Select University",
      value: "",
    },
    ...countryData.universities
      .map((uni: any) => ({
        label: uni,
        value: uni,
      }))
      .sort((a: any, b: any) => a.label.localeCompare(b.label)),
  ]);
  console.log("Universities:", universities);

  const handleSubmit = () => {

    if (!university && !otherUniversity) {
      return Alert.alert("Validation Error", "Please select a university.");
    }
    if (!year) {
      return Alert.alert("Validation Error", "Please select a year.");
    }

    setSignUpData({
      ...signUpData,
      university: university || otherUniversity,
      universityYear: year,
      department,
    });

    router.push("/religion");
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Header2
        heading1="Choose Your Tribe"
        heading2="Choose Your University/Polyethnic/College of Education/Technical College"
      />
      <View style={styles.container}>
        <View style={styles.row}>
          <CustomPicker
            items={universities}
            selectedValue={university}
            onValueChange={setUniversity}
          />
          <CustomPicker3
            items={[
              {
                label: "Year",
                value: "year",
              },
              ...Array.from({ length: 75 }, (_, index) => ({
                label: (2024 - index).toString(),
                value: (2024 - index).toString(),
              })),
            ]}
            selectedValue={year}
            onValueChange={setYear}
          />
        </View>
        <TextInput
          placeholder="Enter your University/Polytechnic/College (If not listed)."
          style={{ ...styles.input, width: 350, marginBottom: 10 }}
          value={otherUniversity}
          onChangeText={(text) => setOtherUniversity(text)}
        />
        <TextInput
          placeholder="Department"
          style={{
            ...styles.input,
            width: 150,
            marginBottom: 30,
            alignSelf: "flex-end",
            marginEnd: 20,
          }}
          value={department}
          onChangeText={(text) => setDepartment(text)}
        />

        <CustomButton size={18} text="Next" handlePress={handleSubmit} />
      </View>

      <Progress activeCircles={2} />
    </SafeAreaView>
  );
};

export default University;

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
