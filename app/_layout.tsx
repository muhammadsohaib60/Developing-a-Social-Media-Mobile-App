import GlobalProvider from "@/context/GlobalProvider";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    ReemRegular: require("../assets/fonts/ReemKufiFun-Regular.ttf"),
    ReemBold: require("../assets/fonts/ReemKufiFun-Bold.ttf"),
    ReemMedium: require("../assets/fonts/ReemKufiFun-Medium.ttf"),
    ReemSemiBold: require("../assets/fonts/ReemKufiFun-SemiBold.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GlobalProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </GlobalProvider>
  );
}
