import { StyleSheet, Text, View } from "react-native";
import React from "react";

interface HeaderProps {
  heading1: string;
  heading2: string;
}

const Header2 = ({ heading1, heading2 }: HeaderProps) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.heading1}>{heading1}</Text>
      <Text style={styles.heading2}>{heading2}</Text>
    </View>
  );
};

export default Header2;

const styles = StyleSheet.create({
  headerContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  heading1: {
    fontFamily: "ReemBold",
    fontSize: 35,
    color: "white",
  },
  heading2: {
    fontFamily: "ReemRegular",
    fontSize: 17,
    color: "white",
    textAlign: "center",
    paddingHorizontal: 30,
  },
});