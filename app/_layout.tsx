import { Stack } from "expo-router";
import "@/global.css";
import { verifyInstallation } from "nativewind";

export default function RootLayout() {
  verifyInstallation();

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
