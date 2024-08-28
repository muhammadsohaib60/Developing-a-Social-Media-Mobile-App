import { SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import CustomButton from "@/components/CustomButton";
import Progress from "@/components/Progress";
import { router } from "expo-router";
import Header2 from "@/components/Header2";
import { useGlobalContext } from "@/context/GlobalProvider";

const Christian = () => {
  const { signUpData, setSignUpData } = useGlobalContext();
  const [church, setChurch] = useState<string>("");
  const [otherChurch, setOtherChurch] = useState<string>("");

  const handleSubmit = () => {
    setSignUpData({
      ...signUpData,
      religion: "Christian",
      religionSpecific: church || otherChurch,
    });

    router.push("/politics");
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Header2
        heading1="Christian"
        heading2="Choose to Start Connecting with your Religious Tribe"
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
          placeholder="Choose a Church"
          style={styles.input}
          value={church}
          onChangeText={(text) => setChurch(text)}
        />
        <TextInput
          placeholder="Enter Church if not listed"
          style={styles.input}
          value={otherChurch}
          onChangeText={(text) => setOtherChurch(text)}
        />

        <CustomButton size={18} text="Next" handlePress={handleSubmit} />
      </View>

      <Progress activeCircles={1} />
    </SafeAreaView>
  );
};

export default Christian;

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
