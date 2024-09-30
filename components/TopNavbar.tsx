import { message, nav } from "@/constants/icons";
import { splash1 } from "@/constants/images";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

const TopNavbar = () => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
      }}
    >
      <View>
        <Image
          source={splash1}
          resizeMode="contain"
          style={{
            width: 40,
            height: 40,
            marginTop: 20,
          }}
        />
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 10,
        }}
      >
        <View>
          <Image
            source={nav}
            resizeMode="contain"
            style={{
              width: 30,
              height: 30,
              tintColor: "black",
              marginTop: 20,
            }}
          />
        </View>
        <Text
          style={{
            fontSize: 20,
            fontFamily: "ReemBold",
            color: "#000000",
            textAlign: "center",
            marginTop: 20,
          }}
        >
          Yoruba
        </Text>
      </View>
      <TouchableOpacity onPress={() => router.push("/chat")}>
        <Image
          source={message}
          resizeMode="contain"
          style={{
            width: 30,
            height: 30,
            tintColor: "black",
            marginTop: 20,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default TopNavbar;

const styles = StyleSheet.create({});
