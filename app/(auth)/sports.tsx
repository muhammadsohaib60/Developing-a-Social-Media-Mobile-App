import { SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import CustomButton from "@/components/CustomButton";
import Progress from "@/components/Progress";
import { router } from "expo-router";
import Header2 from "@/components/Header2";
import { useGlobalContext } from "@/context/GlobalProvider";

const Sports = () => {
  const { signUpData, setSignUpData } = useGlobalContext();
  const [sportsClub, setSportsClub] = useState<string>("");
  const [otherSportsClub, setOtherSportsClub] = useState<string>("");

  const handleSubmit = () => {
    setSignUpData({
      ...signUpData,
      sportsClub: sportsClub || otherSportsClub,
    });

    router.push("/ethnic");
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Header2
        heading1="Choose Your Tribe"
        heading2="Choose your tribe to start connecting with your favorite Sport Club."
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
        <TextInput
          placeholder="Choose Your Sports Club"
          style={styles.input}
          value={sportsClub}
          onChangeText={(text) => setSportsClub(text)}
        />
        <TextInput
          placeholder="Enter Sports Club if not listed"
          style={styles.input}
          value={otherSportsClub}
          onChangeText={(text) => setOtherSportsClub(text)}
        />

        <CustomButton size={18} text="Next" handlePress={handleSubmit} />
      </View>

      <Progress activeCircles={3} />
    </SafeAreaView>
  );
};

export default Sports;

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
