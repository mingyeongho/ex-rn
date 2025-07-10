import { images } from "@/constants";
import { useAuthStore } from "@/store/auth.store";
import { TabBarIconProps } from "@/type";
import cn from "clsx";
import { Redirect, Tabs } from "expo-router";
import React from "react";
import { Image, Text, View } from "react-native";

const TabBarIcon = ({ focused, icon, title }: TabBarIconProps) => {
  return (
    <View className="tab-icon">
      <Image
        source={icon}
        className="size-7"
        resizeMode="contain"
        tintColor={focused ? "#FE8C00" : "#5D5F6D"}
      />
      <Text
        className={cn(
          "text-sm font-bold",
          focused ? "text-primary" : "text-gray-200"
        )}
      >
        {title}
      </Text>
    </View>
  );
};

export default function TabsLayout() {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Redirect href="/signIn" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          borderBottomLeftRadius: 50,
          borderBottomRightRadius: 50,
          backgroundColor: "white",
          height: 80,
          marginHorizontal: 20,
          position: "absolute",
          bottom: 40,
          shadowColor: "#1A1A1A",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 5,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ ...props }) => (
            <TabBarIcon {...props} icon={images.home} title="Home" />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarIcon: ({ ...props }) => (
            <TabBarIcon {...props} icon={images.bag} title="Cart" />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ ...props }) => (
            <TabBarIcon {...props} icon={images.search} title="Search" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ ...props }) => (
            <TabBarIcon {...props} icon={images.person} title="Person" />
          ),
        }}
      />
    </Tabs>
  );
}
