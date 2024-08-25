import { SafeAreaView, StyleSheet, TextInput, View } from "react-native";
import React from "react";
import CustomButton from "@/components/CustomButton";
import Progress from "@/components/Progress";
import Header2 from "@/components/Header2";
import { router } from "expo-router";

const Traditionalist = () => {
  const handleSubmit = () => {
    router.push("/politics");
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Header2
        heading1="Traditionalist"
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
          placeholder="Enter the name of your tribe"
          style={styles.input}
        />

        <CustomButton size={18} text="Next" handlePress={handleSubmit} />
      </View>

      <Progress activeCircles={1} />
    </SafeAreaView>
  );
};

export default Traditionalist;

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
