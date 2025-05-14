import { Stack } from "expo-router";
import React, { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import {
  Caveat_400Regular,
  Caveat_600SemiBold,
  useFonts,
} from "@expo-google-fonts/caveat";
import GlobalProvider from '../context/GlobalProvider';

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [loaded, error] = useFonts({
    Caveat_400Regular,
    Caveat_600SemiBold,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) return null;

  return (
    <GlobalProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="greeting/page1" options={{ headerShown: false }} />
        <Stack.Screen name="greeting/page2" options={{ headerShown: false }} />
        <Stack.Screen name="greeting/page3" options={{ headerShown: false }} />
        <Stack.Screen name="greeting/page4" options={{ headerShown: false }} />
        <Stack.Screen name="greeting/page5" options={{ headerShown: false }} />
        <Stack.Screen name="views/program" options={{ headerShown: false }} />
        <Stack.Screen name="views/deficit" options={{ headerShown: false }} />
        <Stack.Screen name="views/dynamics" options={{ headerShown: false }} />
        <Stack.Screen name="views/meal_detail/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </GlobalProvider>
  );
};

export default RootLayout;
