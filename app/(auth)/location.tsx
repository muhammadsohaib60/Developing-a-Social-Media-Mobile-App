import React, { useState } from "react";
import { SafeAreaView, StyleSheet, TextInput, View, Alert } from "react-native";
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
    region: "Africa",
    subregion: "Western Africa",
  },
  {
    cca2: "GH" as CountryCode,
    name: "Ghana",
    callingCode: ["233"],
    currency: ["GHS"],
    flag: "flag-gh",
    region: "Africa",
    subregion: "Western Africa",
  },
];

const Location = () => {
  const [country, setCountry] = useState<Country | null>(null);
  const [state, setState] = useState<string>("");
  const [states, setStates] = useState<{ label: string; value: string }[]>([]);
  const [localGovernment, setLocalGovernment] = useState<string>("");
  const [localGovernments, setLocalGovernments] = useState<
    { label: string; value: string }[]
  >([]);
  const [neighborhood, setNeighborhood] = useState<string>("");
  const [neighborhoods, setNeighborhoods] = useState<
    { label: string; value: string }[]
  >([]);
  const [otherNeighborhood, setOtherNeighborhood] = useState<string>("");
  const { signUpData, setSignUpData } = useGlobalContext();

  // Fetch states for the selected country
  const fetchStates = async (countryName: string) => {
    try {
      const fetchedStates = await signupDataManager.fetchStates(countryName);
      const statesArr = [
        { label: "Select State", value: "" },
        ...fetchedStates.map((state: any) => ({
          label: state.state_name,
          value: state.state_id,
        })),
      ];
      setStates(statesArr);
    } catch (err) {
      Alert.alert("Error", "Failed to fetch states. Please try again.");
    }
  };

  // Fetch local governments based on the selected state
  const fetchLocalGovernments = async (stateName: string) => {
    try {
      const fetchedLocalGovernments =
        await signupDataManager.fetchLocalGovernments(stateName);
      const localGovArr = [
        { label: "Select Local Government", value: "" },
        ...fetchedLocalGovernments.map((lg: any) => ({
          label: lg.local_gov_name,
          value: lg.local_gov_id,
        })),
      ];
      setLocalGovernments(localGovArr);
    } catch (err) {
      Alert.alert(
        "Error",
        "Failed to fetch local governments. Please try again."
      );
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
        ...fetchedNeighborhoods.map((neighborhood: any) => ({
          label: neighborhood.neighborhood_name,
          value: neighborhood.neighborhood_name,
        })),
      ];
      setNeighborhoods(neighborhoodArr);
    } catch (err) {
      Alert.alert("Error", "Failed to fetch neighborhoods. Please try again.");
    }
  };

  const handleCountrySelect = async (selectedCountry: Country) => {
    setCountry(selectedCountry);
    try {
      setSignUpData({
        ...signUpData,
        country: selectedCountry.name,
        state: "",
        localGovernment: "",
        neighborhood: "",
      });
      // Reset other fields when country changes
      setState("");
      setLocalGovernment("");
      setNeighborhood("");
      setOtherNeighborhood("");
      // Fetch states for the new country
      await fetchStates(selectedCountry.name as string);
    } catch (err) {
      Alert.alert("Error", "Error saving country data. Please try again.");
    }
  };

  const handleStateSelect = async (selectedState: string) => {
    setState(selectedState);
    setLocalGovernment("");
    setNeighborhood("");
    setLocalGovernments([]); // Clear previous local governments
    setNeighborhoods([]); // Clear previous neighborhoods

    if (selectedState) {
      try {
        await fetchLocalGovernments(selectedState);
      } catch (err) {
        Alert.alert("Error", "Error fetching local governments.");
      }
    }
  };

  const handleLocalGovernmentSelect = async (
    selectedLocalGovernment: string
  ) => {
    setLocalGovernment(selectedLocalGovernment);
    setNeighborhood("");
    setNeighborhoods([]); // Clear previous neighborhoods

    if (selectedLocalGovernment) {
      try {
        await fetchNeighborhoods(selectedLocalGovernment);
      } catch (err) {
        Alert.alert("Error", "Error fetching neighborhoods.");
      }
    }
  };

  const handleSubmit = () => {
    if (!country) {
      Alert.alert("Validation Error", "Please select a country.");
      return;
    }
    if (!state) {
      Alert.alert("Validation Error", "Please select a state.");
      return;
    }
    if (!localGovernment) {
      Alert.alert("Validation Error", "Please select a local government.");
      return;
    }
    if (!neighborhood && !otherNeighborhood) {
      Alert.alert("Validation Error", "Please select or enter a neighborhood.");
      return;
    }

    setSignUpData({
      ...signUpData,
      country: country.name,
      state,
      localGovernment,
      neighborhood: neighborhood || otherNeighborhood,
    });

    router.push("/school");
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
              countryCode={country?.cca2 as CountryCode}
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
});
