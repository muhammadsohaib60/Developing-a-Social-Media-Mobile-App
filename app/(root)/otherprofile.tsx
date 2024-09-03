import { StyleSheet, Text, View } from "react-native";
import React from "react";
import GradientView from "@/components/GradientView";
import UserProfile from "@/components/OtherProfile";
import Posts from "@/components/Posts";

const OtherProfile = () => {
  return (
    <GradientView>
      <UserProfile />
      <Posts />
    </GradientView>
  );
};

export default OtherProfile;

const styles = StyleSheet.create({});
