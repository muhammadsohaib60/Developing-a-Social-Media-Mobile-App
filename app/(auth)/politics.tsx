import { SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import CustomButton from "@/components/CustomButton";
import Progress from "@/components/Progress";
import { router } from "expo-router";
import Header2 from "@/components/Header2";
import { useGlobalContext } from "@/context/GlobalProvider";

const Politics = () => {
  const { signUpData, setSignUpData } = useGlobalContext();

  const [party, setParty] = useState<string>("");
  const [otherParty, setOtherParty] = useState<string>("");

  const handleSubmit = () => {
    setSignUpData({
      ...signUpData,
      politicalParty: party || otherParty,
    });
    router.push("/sports");
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Header2
        heading1="Choose Your Tribe"
        heading2="Choose Your Political Party"
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
<<<<<<< HEAD
        <TextInput
          placeholder="Choose Political Party"
          style={styles.input}
          value={party}
          onChangeText={(text) => setParty(text)}
        />
        <TextInput
          placeholder="Enter Political Party if not listed"
          style={styles.input}
          value={otherParty}
          onChangeText={(text) => setOtherParty(text)}
=======
        <TextInput placeholder="Choose Political Party" style={styles.input} />
        <TextInput
          placeholder="Enter Political Party if not listed"
          style={styles.input}
>>>>>>> 128a8cac9b9bcc6031ded2763586864c38b6290a
        />

        <CustomButton size={18} text="Next" handlePress={handleSubmit} />
      </View>

      <Progress activeCircles={3} />
    </SafeAreaView>
  );
};

export default Politics;

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
