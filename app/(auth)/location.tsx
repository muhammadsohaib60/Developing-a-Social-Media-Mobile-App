import React, { useState } from "react";
import { SafeAreaView, StyleSheet, TextInput, View } from "react-native";
import CountryPicker from "react-native-country-picker-modal";
import CustomButton from "@/components/CustomButton";
import Progress from "@/components/Progress";
import Header2 from "@/components/Header2";
import { router } from "expo-router";
import { useGlobalContext } from "@/context/GlobalProvider";

const Location = () => {
  // State management for location data
  const [country, setCountry] = useState<any>(null);
  const [state, setState] = useState<string>("");
  const [localGovernment, setLocalGovernment] = useState<string>("");
  const [neighborhood, setNeighborhood] = useState<string>("");
  const [otherNeighborhood, setOtherNeighborhood] = useState<string>("");
  const { signUpData, setSignUpData } = useGlobalContext();

  const handleCountrySelect = (selectedCountry: any) => {
    setCountry(selectedCountry);
  };

  const handleSubmit = () => {
    // Process the location data or navigate to the next screen
    setSignUpData({
      ...signUpData,
      country: country?.name,
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
              countryCode={country?.cca2}
              onSelect={handleCountrySelect}
              containerButtonStyle={styles.pickerButton}
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
});
