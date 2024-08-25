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
      </Stack>
    </>
  );
};

export default AuthLayout;
