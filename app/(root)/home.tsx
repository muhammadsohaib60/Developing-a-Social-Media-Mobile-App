import { StyleSheet, Text, View } from "react-native";
import React from "react";
import GradientView from "@/components/GradientView";
import HomeSearchBar from "@/components/HomeSearchBar";
import StoryComponent from "@/components/StoryComponent";

const Home = () => {
  return (
    <GradientView>
      <HomeSearchBar />
      <StoryComponent />
      <View>
        <Text>Timeline</Text>
      </View>
    </GradientView>
  );
};

export default Home;

const styles = StyleSheet.create({});
