import React, { useState } from "react";
import { SafeAreaView, StyleSheet, TextInput, View, Text } from "react-native";
import CountryPicker, { Country, CountryCode } from "react-native-country-picker-modal";
import CustomButton from "@/components/CustomButton";
import Progress from "@/components/Progress";
import Header2 from "@/components/Header2";
import { router } from "expo-router";
import { signupDataManager } from './SignupDataManager';

// Predefined list of countries
const COUNTRIES: Country[] = [
  { cca2: "NG" as CountryCode, name: "Nigeria", callingCode: ["234"], currency: ["NGN"], flag: "flag-ng" },
  { cca2: "GH" as CountryCode, name: "Ghana", callingCode: ["233"], currency: ["GHS"], flag: "flag-gh" },
];

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
    width: 180,
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    color: "#969696",
    fontFamily: "ReemRegular",
  },
  input2: {
    backgroundColor: "white",
    textAlign: "center",
    width: 313,
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    color: "#969696",
    fontFamily: "ReemRegular",
    marginBottom: 30,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
  },
});

const Location = () => {
  const [country, setCountry] = useState<Country | null>(null);
  const [state, setState] = useState<string>("");
  const [states, setStates] = useState<string[]>([]);
  const [localGovernment, setLocalGovernment] = useState<string>("");
  const [neighborhood, setNeighborhood] = useState<string>("");
  const [otherNeighborhood, setOtherNeighborhood] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  
  //fetched states, you will fetch all other similar
  const fetchStates = async (countryName: string) => {
    try {
      const fetchedStates = await signupDataManager.fetchStates(countryName);
      setStates(fetchedStates);
      console.log("Fetched states:", fetchedStates);
    } catch (err) {
      console.error("Error fetching states:", err);
      setError("Failed to fetch states. Please try again.");
    }
  };

  const handleCountrySelect = async (selectedCountry: Country) => {
    console.log("Selected country:", selectedCountry);
    setCountry(selectedCountry);
    setState(""); // Reset state when country changes
    setStates([]); // Clear previous states

    try {
      await signupDataManager.setLocationData({
        country: selectedCountry,
        state: "",
        localGovernment,
        neighborhood: neighborhood || otherNeighborhood,
      });
      console.log("Location data saved:", await signupDataManager.getLocationData());
      
      // Fetch states for the selected country
      await fetchStates(selectedCountry.name);
    } catch (err) {
      console.error("Error saving location data:", err);
      setError("Failed to save location data. Please try again.");
    }
  };

  const handleSubmit = () => {
    if (country && state) {
      router.push("/school");
    } else {
      setError("Please select a country and state before proceeding.");
    }
  };
  return (
    <SafeAreaView style={styles.screen}>
      <Header2
        heading1="Choose Your Tribe"
        heading2="Enter your location and start connecting with people around you"
      />
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.inputContainer}>
            <CountryPicker
              withFilter
              withFlag
              withCountryNameButton
              countryCode={country?.cca2}
              onSelect={handleCountrySelect}
              containerButtonStyle={styles.pickerButton}
              countryCodes={COUNTRIES.map(c => c.cca2)}
              onOpen={() => console.log("CountryPicker opened")}
              onClose={() => console.log("CountryPicker closed")}
            />
          </View>
          <TextInput
            placeholder="State"
            style={styles.input}
            value={state}
            onChangeText={(text) => setState(text)}
          />
        </View>
        <View style={styles.row}>
          <TextInput
            placeholder="Local Government"
            style={styles.input}
            value={localGovernment}
            onChangeText={(text) => setLocalGovernment(text)}
          />
          <TextInput
            placeholder="Neighbourhood"
            style={styles.input}
            value={neighborhood}
            onChangeText={(text) => setNeighborhood(text)}
          />
        </View>
        <TextInput
          placeholder="Enter Neighbourhood if not listed"
          style={styles.input2}
          value={otherNeighborhood}
          onChangeText={(text) => setOtherNeighborhood(text)}
        />
        {error && <Text style={styles.errorText}>{error}</Text>}
        <CustomButton size={18} text="Next" handlePress={handleSubmit} />
      </View>
      <Progress activeCircles={2} />
    </SafeAreaView>
  );
};

export default Location;