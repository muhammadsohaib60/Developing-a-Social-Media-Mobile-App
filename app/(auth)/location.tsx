import React, { useState } from "react";
import { SafeAreaView, StyleSheet, TextInput, View, Text } from "react-native";
import CountryPicker, {
  Country,
  CountryCode,
} from "react-native-country-picker-modal";
import CustomButton from "@/components/CustomButton";
import Progress from "@/components/Progress";
import Header2 from "@/components/Header2";
import { router } from "expo-router";
import { signupDataManager } from "./SignupDataManager";
import CustomPicker from "@/components/CustomPicker2";
import { useGlobalContext } from "@/context/GlobalProvider";

// Predefined list of countries
const COUNTRIES: Country[] = [
  {
    cca2: "NG" as CountryCode,
    name: "Nigeria",
    callingCode: ["234"],
    currency: ["NGN"],
    flag: "flag-ng",
  },
  {
    cca2: "GH" as CountryCode,
    name: "Ghana",
    callingCode: ["233"],
    currency: ["GHS"],
    flag: "flag-gh",
  },
];

const Location = () => {
  const [country, setCountry] = useState<Country | null>(null);
  const [state, setState] = useState<string>();
  const [states, setStates] = useState<any>([]);
  const [localGovernment, setLocalGovernment] = useState<string>("");
  const [localGovernments, setLocalGovernments] = useState<any>([]);
  const [neighborhood, setNeighborhood] = useState<string>("");
  const [neighborhoods, setNeighborhoods] = useState<any>([]);
  const [otherNeighborhood, setOtherNeighborhood] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const { signUpData, setSignUpData } = useGlobalContext();

  // Fetch states for the selected country
  const fetchStates = async (countryName: string) => {
    try {
      const fetchedStates = await signupDataManager.fetchStates(countryName);
      const statesArr = [
        { label: "Select State", value: "" },
        ...fetchedStates.map((state) => ({
          label: state.state_name,
          value: state.state_id,
        })),
      ];
      setStates(statesArr);
    } catch (err) {
      setError("Failed to fetch states. Please try again.");
    }
  };

  // Fetch local governments based on the selected state
  const fetchLocalGovernments = async (stateName: string) => {
    try {
      const fetchedLocalGovernments =
        await signupDataManager.fetchLocalGovernments(stateName);
      console.log(fetchedLocalGovernments);
      const localGovArr = [
        { label: "Select Local Government", value: "" },
        ...fetchedLocalGovernments.map((lg) => ({
          label: lg.local_gov_name,
          value: lg.local_gov_id,
        })),
      ];
      setLocalGovernments(localGovArr);
    } catch (err) {
      setError("Failed to fetch local governments. Please try again.");
    }
  };

  // Fetch neighborhoods based on the selected local government
  const fetchNeighborhoods = async (localGovernmentName: string) => {
    try {
      const fetchedNeighborhoods = await signupDataManager.fetchNeighborhoods(
        localGovernmentName
      );
      const neighborhoodArr = [
        { label: "Select Neighborhood", value: "" },
        ...fetchedNeighborhoods.map((neighborhood) => ({
          label: neighborhood.neighborhood_name,
          value: neighborhood.neighborhood_name,
        })),
      ];
      setNeighborhoods(neighborhoodArr);
    } catch (err) {
      setError("Failed to fetch neighborhoods. Please try again.");
    }
  };

  const handleCountrySelect = async (selectedCountry: Country) => {
    setCountry(selectedCountry.name);
    try {
      await signupDataManager.setLocationData({
        country: selectedCountry,
        state: "",
        localGovernment: "",
        neighborhood: "",
      });
      console.log("Country data saved:", selectedCountry);
      // Reset other fields when country changes
      setState("");
      setLocalGovernment("");
      setNeighborhood("");
      setOtherNeighborhood("");
      // Fetch states for the new country
      await fetchStates(selectedCountry.name);
    } catch (err) {
      setError("Error saving country data. Please try again.");
      console.error("Error saving country data:", err);
    }
  };

  const handleStateSelect = async (selectedState: string) => {
    setState(selectedState);
    setLocalGovernments([]); // Clear previous local governments
    setNeighborhoods([]); // Clear previous neighborhoods

    try {
      fetchLocalGovernments(selectedState);
    } catch (err) {
      setError("Error fetching local governments.");
    }
  };

  const handleLocalGovernmentSelect = async (
    selectedLocalGovernment: string
  ) => {
    setLocalGovernment(selectedLocalGovernment);
    setNeighborhoods([]); // Clear previous neighborhoods
    try {
      await fetchNeighborhoods(selectedLocalGovernment);
    } catch (err) {
      setError("Error fetching neighborhoods.");
    }
  };

  const handleSubmit = () => {
    console.log({
      country,
      state,
      localGovernment,
      neighborhood: neighborhood || otherNeighborhood,
    });
    setSignUpData({
      ...signUpData,
      country,
      state,
      localGovernment,
      neighborhood: neighborhood || otherNeighborhood,
    });
    router.push("/school");

    // if (country && state && localGovernment && neighborhood) {
    //   router.push("/school");
    // } else {
    //   setError("Please select all location fields before proceeding.");
    // }
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
              countryCodes={COUNTRIES.map((c) => c.cca2)}
            />
          </View>
          <CustomPicker
            items={states}
            selectedValue={state}
            onValueChange={handleStateSelect}
          />
        </View>
        <View style={styles.row}>
          <CustomPicker
            items={localGovernments}
            selectedValue={localGovernment}
            onValueChange={handleLocalGovernmentSelect}
          />
          <CustomPicker
            items={neighborhoods}
            selectedValue={neighborhood}
            onValueChange={setNeighborhood}
          />
        </View>
        <TextInput
          placeholder="Enter Neighborhood if not listed"
          style={styles.input2}
          value={otherNeighborhood}
          onChangeText={setOtherNeighborhood}
        />
        {error && <Text style={styles.errorText}>{error}</Text>}
        <CustomButton size={18} text="Next" handlePress={handleSubmit} />
      </View>
      <Progress activeCircles={2} />
    </SafeAreaView>
  );
};

export default Location;

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
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    width: "100%",
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
