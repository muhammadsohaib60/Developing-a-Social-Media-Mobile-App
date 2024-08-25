import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import Header2 from "@/components/Header2";
import CustomButton from "@/components/CustomButton";
import Progress from "@/components/Progress";
import { router } from "expo-router";

const Confirmation = () => {
  const handleSubmit = () => {
    router.push("/home");
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Header2
        heading1="You're All Set!"
        heading2="Your profile has been successfully set up. You're ready to explore your tribe."
      />
      <View style={styles.container}>
        <CustomButton size={18} text="Next" handlePress={handleSubmit} />
      </View>

      <Progress activeCircles={4} />
    </SafeAreaView>
  );
};

export default Confirmation;

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
    padding: 20,
  },
});
