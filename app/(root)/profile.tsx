import { StyleSheet } from "react-native";
import React from "react";
import GradientView from "@/components/GradientView";
import UserProfile from "@/components/UserProfile";
import Communities from "@/components/Communities";

const Profile = () => {
  return (
    <GradientView>
      <UserProfile />
      <Communities />
    </GradientView>
  );
};

export default Profile;

const styles = StyleSheet.create({});
