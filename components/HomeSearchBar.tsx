import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";

const HomeSearchBar = () => {
  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        router.push("/search");
      }}
    >
      <View style={styles.searchBar}>
        <AntDesign name="search1" size={24} color="black" />
        <Text style={styles.text}>Search...</Text>
      </View>
    </Pressable>
  );
};

export default HomeSearchBar;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginHorizontal: 20,
    borderRadius: 50,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "rgba(150, 150, 150, 1)",
    gap: 10,
    paddingHorizontal: 20,
  },
  text: {
    fontFamily: "ReemRegular",
    color: "rgba(113, 113, 113, 1)",
    fontSize: 17,
  },
});
