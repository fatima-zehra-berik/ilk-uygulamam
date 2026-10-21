import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="about" />
      <Stack.Screen name="profil" />
      <Stack.Screen name="destek" />
      <Stack.Screen name="liste" />
    </Stack>
  );
}
