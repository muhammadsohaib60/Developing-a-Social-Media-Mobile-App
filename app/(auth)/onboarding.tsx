import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { onboarding } from "@/constants/images";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";

const LoginSignup = () => {
  return (
    <SafeAreaView style={styles.screen}>
      <Image source={onboarding} />
      <View style={styles.container}>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={styles.heading1}>Let's Create!</Text>
          <Text style={styles.heading2}>Welcome to Tribe</Text>
        </View>
        <CustomButton
          text="I am new here"
          handlePress={() => {
            router.push({ pathname: "/sign-up" });
          }}
          size={26}
        />
        <TouchableOpacity
          onPress={() => {
            router.push({ pathname: "/sign-in" });
          }}
        >
          <Text style={styles.heading2}> Sign in</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginSignup;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "#FFFFFF",
    fontFamily: "ReemRegular",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    width: "100%",
  },
  heading1: {
    fontFamily: "ReemBold",
    fontSize: 45,
  },
  heading2: {
    fontFamily: "ReemRegular",
    fontSize: 17,
    fontWeight: "400",
    color: "#717171",
  },
});
