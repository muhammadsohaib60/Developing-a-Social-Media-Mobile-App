import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CustomButton from "@/components/CustomButton";
import Progress from "@/components/Progress";
import Header2 from "@/components/Header2";
import { router } from "expo-router";

const Muslim = () => {
  return (
    <SafeAreaView style={styles.screen}>
      <Header2
        heading1="Muslim"
        heading2="Choose to Start Connecting with your Religious Tribe"
      />
      <View style={styles.container}>
        <View style={styles.grid}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              router.push("/politics");
            }}
          >
            <Text style={styles.buttonText}>Sunni</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              router.push("/politics");
            }}
          >
            <Text style={styles.buttonText}>Shia</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Progress activeCircles={2} />
    </SafeAreaView>
  );
};

export default Muslim;

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
  grid: {
    width: "80%", // Adjust the grid width as necessary
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "white",
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    width: "45%", // Adjust the button width for two columns
    marginBottom: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#969696",
    fontFamily: "ReemRegular",
    textAlign: "center",
  },
});
