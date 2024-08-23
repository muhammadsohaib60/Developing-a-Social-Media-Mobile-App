import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Animated, Easing } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Import your images
import { splash1, splash4 } from "../constants/images"; // Only splash1 and splash4 are needed
import { router } from "expo-router";

const SplashScreen = () => {
  const [backgroundColor, setBackgroundColor] = useState("#fff");
  const opacity = useRef(new Animated.Value(1)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const rotation = useRef(new Animated.Value(0)).current;
  const images = [splash1, splash4]; // We only need the first and last images
  const currentImageIndex = useRef(0);

  useEffect(() => {
    // Function to animate rotation and scaling of splash1
    const animateSplash1 = () => {
      Animated.sequence([
        Animated.parallel([
          Animated.timing(rotation, {
            toValue: 1,
            duration: 500,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
          Animated.timing(scale, {
            toValue: 1.75,
            duration: 500,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(rotation, {
            toValue: 0,
            duration: 500,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
          Animated.timing(scale, {
            toValue: 1,
            duration: 500,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
        ]),
        // Fade out the image
        Animated.timing(opacity, {
          toValue: 0,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // After splash1 animation, show splash4 and change background color
        currentImageIndex.current = 1;
        setBackgroundColor("#4B0082");
        opacity.setValue(1); // Reset opacity for the next image

        setTimeout(() => {
          router.replace("/login");
        }, 1000); // Adjust the delay as needed
      });
    };

    animateSplash1();
  }, [opacity, scale, rotation]);

  const rotateInterpolate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "130deg"],
  });

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <Animated.Image
        source={images[currentImageIndex.current]}
        style={[
          styles.image,
          {
            opacity,
            transform: [{ scale }, { rotate: rotateInterpolate }],
          },
        ]}
        resizeMode="contain"
      />
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 100,
    height: 100,
  },
});
