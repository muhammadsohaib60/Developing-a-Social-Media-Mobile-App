import { StyleSheet, View } from "react-native";
import React from "react";

interface ProgressProps {
  activeCircles: number;
}

const Progress = ({ activeCircles }: ProgressProps) => {
  const circles = [1, 2, 3, 4];

  return (
    <View style={styles.container}>
      {circles.map((circle, index) => (
        <View
          key={index}
          style={[
            styles.circle,
            index < activeCircles ? styles.activeCircle : styles.inactiveCircle,
          ]}
        />
      ))}
    </View>
  );
};

export default Progress;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 20,
    right: 20,
    flexDirection: "row",
    gap: 10,
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: "white",
  },
  activeCircle: {
    backgroundColor: "yellow",
  },
  inactiveCircle: {
    backgroundColor: "white",
  },
});
