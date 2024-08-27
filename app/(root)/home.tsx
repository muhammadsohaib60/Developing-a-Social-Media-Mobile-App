import { StyleSheet, Text, View } from "react-native";
import React from "react";
import GradientView from "@/components/GradientView";

const Home = () => {
  return (
    <GradientView>
      <View>
        <Text>SearchBar</Text>
      </View>
      <View>
        <Text>Stories</Text>
      </View>
      <View>
        <Text>Timeline</Text>
      </View>
    </GradientView>
  );
};

export default Home;

const styles = StyleSheet.create({});
