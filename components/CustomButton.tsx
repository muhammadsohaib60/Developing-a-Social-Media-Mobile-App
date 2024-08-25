import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";

import { router } from "expo-router";

interface props {
  text: string;
  handlePress?: () => void;
  size: number;
}

const CustomButton = ({ text, handlePress, size }: props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Text style={{ ...styles.text, fontSize: size }}>{text}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    width: "70%",
    borderRadius: 50,
    backgroundColor: "#FFD700",
  },
  text: {
    fontFamily: "ReemBold",
    color: "white",
  },
});
