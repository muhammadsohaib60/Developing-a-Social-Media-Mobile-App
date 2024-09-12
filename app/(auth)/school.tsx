import React, { useState, useEffect } from "react";
import { signupDataManager } from "./SignupDataManager";
import { Alert, SafeAreaView, StyleSheet, TextInput, View } from "react-native";
import CustomButton from "@/components/CustomButton";
import Progress from "@/components/Progress";
import Header2 from "@/components/Header2";
import { router } from "expo-router";
import { useGlobalContext } from "@/context/GlobalProvider";
import CustomPicker from "@/components/CustomPicker2";
import CustomPicker3 from "@/components/CustomPicker3";

interface Country {
  callingCode: string[];
  cca2: string;
  currency: string[];
  flag: string;
  name: string;
  region: string;
  subregion: string;
}

const School = () => {
  const [school, setSchool] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [otherSchool, setOtherSchool] = useState<string>("");
  const { signUpData, setSignUpData, setCountryData } = useGlobalContext();
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [countrySpecificData, setCountrySpecificData] = useState<any>(null);
  const [schools, setSchools] = useState<any>([
    { label: "Select School", value: "" },
  ]);

  useEffect(() => {
    const loadData = async () => {
      try {
        await signupDataManager.loadSignupData();
        const locationData = signupDataManager.getLocationData();
        if (locationData && locationData.country) {
          setSelectedCountry(locationData.country);
          console.log("Selected country in the school:", locationData.country);

          const specificData = await signupDataManager.fetchCountrySpecificData(
            locationData.country.name
          );
          setCountrySpecificData(specificData);
          setCountryData(specificData);

          const schoolsArr = specificData.schools.map((school: any) => {
            return {
              label: school,
              value: school,
            };
          });

          //sort schools alphabetically
          schoolsArr.sort((a: any, b: any) => {
            if (a.label < b.label) {
              return -1;
            }
            if (a.label > b.label) {
              return 1;
            }
            return 0;
          });

          setSchools([...schools, ...schoolsArr]);

          console.log("Country-specific data:", specificData.universities);
        } else {
          console.log("Country data is:");
          console.log(locationData);
          console.log("No country data found");
        }
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadData();
  }, []);

  const handleSubmit = () => {
    if (!school && !otherSchool) {
      return Alert.alert("Validation Error", "Please select your school.");
    }
    if (!year) {
      return Alert.alert("Validation Error", "Please select your school year.");
    }

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
          <CustomPicker
            items={schools}
            selectedValue={school}
            onValueChange={setSchool}
          />
          <CustomPicker3
            items={[
              {
                label: "Year",
                value: "",
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
          placeholder="Enter Secondary School if not listed"
          style={{ ...styles.input, width: 300, marginBottom: 30 }}
          value={otherSchool}
          onChangeText={(text) => setOtherSchool(text)}
        />

        <CustomButton size={18} text="Next" handlePress={handleSubmit} />
      </View>

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
