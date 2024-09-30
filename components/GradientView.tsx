import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";

const GradientView = ({ children }: any) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[
          "#FFFFFF",
          "rgba(255, 255, 255, 0.5)",
          "rgba(75, 0, 130, 0.1)",
          "rgba(75, 0, 130, 0.1)",
          "rgba(75, 0, 130, 0.2)",
          "rgba(75, 0, 130, 0.2)",
        ]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        locations={[0, 0.2, 0.4, 0.6, 0.8, 1]}
        style={styles.background}
      />
      {children}
    </View>
  );
};

export default GradientView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
});
