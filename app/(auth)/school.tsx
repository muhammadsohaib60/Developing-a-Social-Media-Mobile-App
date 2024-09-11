import React, { useState, useEffect } from "react";
import { signupDataManager } from "./SignupDataManager";
import { SafeAreaView, StyleSheet, TextInput, View } from "react-native";
import CustomButton from "@/components/CustomButton";
import Progress from "@/components/Progress";
import Header2 from "@/components/Header2";
import { router } from "expo-router";
import { useGlobalContext } from "@/context/GlobalProvider";
import CustomPicker from "@/components/CustomPicker2";

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

          const schools = specificData.schools.map((school: any) => {
            return {
              label: school,
              value: school,
            };
          });
          setSchools(schools);

          console.log("Country-specific data:", specificData);
        } else {
          console.log("No country data found");
        }
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadData();
  }, []);

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
          <CustomPicker
            items={schools}
            selectedValue={school}
            onValueChange={setSchool}
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
