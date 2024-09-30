import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { router } from "expo-router";

const AddPostCard = () => {
  return (
    <View
      style={{
        position: "absolute",
        bottom: 120,
        left: "28%",
        zIndex: 1,
        borderWidth: 2,
        borderRadius: 20,
        borderColor: "#FF1E58",
        backgroundColor: "#FFFFFF",
      }}
    >
      <Pressable
        style={{
          borderBottomWidth: 2,
          borderColor: "#FF1E58",
          padding: 10,
          paddingHorizontal: 40,
        }}
        onPress={() => router.push("/addpost")}
      >
        <Text
          style={{
            fontSize: 17,
            fontFamily: "ReemSemiBold",
          }}
        >
          Add a Post
        </Text>
      </Pressable>
      <Pressable
        style={{
          padding: 10,
          paddingHorizontal: 40,
        }}
        onPress={() => router.push("/addstory")}
      >
        <Text
          style={{
            fontSize: 17,
            fontFamily: "ReemSemiBold",
          }}
        >
          Add a Story
        </Text>
      </Pressable>
    </View>
  );
};

export default AddPostCard;

const styles = StyleSheet.create({});
