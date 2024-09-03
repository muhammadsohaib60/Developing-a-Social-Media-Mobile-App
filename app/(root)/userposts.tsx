import { StyleSheet } from "react-native";
import React from "react";
import GradientView from "@/components/GradientView";
import Posts from "@/components/Posts";
import UserProfile from "@/components/UserProfile2";

const UserPosts = () => {
  return (
    <GradientView>
      <UserProfile />
      <Posts />
    </GradientView>
  );
};

export default UserPosts;

const styles = StyleSheet.create({});
