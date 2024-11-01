import { StatusBar, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView>
      <Text className="text-red-500">
        Edit app/index.tsx to edit this screen.
      </Text>
      <StatusBar />
    </SafeAreaView>
  );
}
