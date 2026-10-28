import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="about" />
      <Stack.Screen name="profil" />
      <Stack.Screen name="destek" />
      <Stack.Screen name="liste" />
      <Stack.Screen name="ariza/[id]" />
      {/* Uygulama 2: Ürün Kataloğu Dinamik Rotası eklendi */}
      <Stack.Screen name="urun/[id]" />
    </Stack>
  );
}
