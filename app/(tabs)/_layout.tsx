import { Redirect, Slot } from "expo-router";
import React from "react";

export default function TabsLayout() {
  const isAuthenticated = true;

  if (!isAuthenticated) {
    return <Redirect href="/signIn" />;
  }

  return <Slot />;
}
