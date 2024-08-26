import { nav } from "@/constants/icons";
import { splash1 } from "@/constants/images";
import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

const TopNavbar = () => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Image
        src={splash1}
        alt="splash1"
        style={{
          width: 30,
          height: 30,
        }}
      />
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <Image
          src={nav}
          style={{
            width: 30,
            height: 30,
          }}
        />
        <Text
          style={{
            fontSize: 20,
            fontFamily: "ReemSemiBold",
            color: "#000000",
            textAlign: "center",
            marginTop: 20,
          }}
        >
          Tribe
        </Text>
      </View>
    </View>
  );
};

export default TopNavbar;

const styles = StyleSheet.create({});
