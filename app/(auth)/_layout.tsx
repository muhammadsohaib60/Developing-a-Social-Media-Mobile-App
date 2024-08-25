import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const AuthLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        <Stack.Screen name="sign-in" options={{ headerShown: false }} />
        <Stack.Screen name="phonenumber" options={{ headerShown: false }} />
        <Stack.Screen name="password" options={{ headerShown: false }} />
        <Stack.Screen name="getStarted" options={{ headerShown: false }} />
        <Stack.Screen name="location" options={{ headerShown: false }} />
        <Stack.Screen name="school" options={{ headerShown: false }} />
        <Stack.Screen name="university" options={{ headerShown: false }} />
        <Stack.Screen name="religion" options={{ headerShown: false }} />
        <Stack.Screen name="politics" options={{ headerShown: false }} />
        <Stack.Screen name="sports" options={{ headerShown: false }} />
        <Stack.Screen name="ethnic" options={{ headerShown: false }} />
        <Stack.Screen name="pictures" options={{ headerShown: false }} />
        <Stack.Screen name="confirmation" options={{ headerShown: false }} />
        <Stack.Screen name="muslim" options={{ headerShown: false }} />
        <Stack.Screen name="christian" options={{ headerShown: false }} />
        <Stack.Screen name="traditionalist" options={{ headerShown: false }} />
      </Stack>
    </>
  );
};

export default AuthLayout;
