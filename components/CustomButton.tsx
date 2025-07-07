import { CustomButtonProps } from "@/type";
import cn from "clsx";
import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

export default function CustomButton({
  title = "Click Me",
  isLoading = false,
  leftIcon,
  onPress,
  style,
  textStyle,
}: CustomButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} className={cn("custom-btn", style)}>
      {leftIcon}
      <View className="flex-center flex-row">
        {isLoading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text className={cn("text-white-100 paragraph-semibold", textStyle)}>
            {title}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}
