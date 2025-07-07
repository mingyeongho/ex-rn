import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { signIn } from "@/lib/appwrite";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, View } from "react-native";

export default function SignIn() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onSubmit = async () => {
    setIsSubmitting(true);
    try {
      const { email, password } = form;
      if (!email || !password) {
        Alert.alert("Error", "Please enter valid email address and password.");
        return;
      }
      await signIn({ email, password });

      router.replace("/");
    } catch (e: any) {
      Alert.alert("Error", e.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="gap-10 bg-white rounded-lg p-5 mt-5">
      <CustomInput
        label="Email address"
        placeholder="e.g. alsrudgh0210@gmail.com"
        value={form.email}
        onChangeText={(text) => setForm((prev) => ({ ...prev, email: text }))}
        keyboardType="email-address"
      />
      <CustomInput
        label="Password"
        placeholder="********"
        value={form.password}
        onChangeText={(text) =>
          setForm((prev) => ({ ...prev, password: text }))
        }
        keyboardType="default"
        secureTextEntry={true}
      />
      <CustomButton
        title="Sign In"
        isLoading={isSubmitting}
        onPress={onSubmit}
      />

      <View className="flex flex-row justify-center mt-5 gap-2">
        <Text className="base-regular text-gray-100 pr-0.5">
          Don&apos;t have an account?
        </Text>
        <Link className="base-bold text-primary pr-0.5" href="/signUp">
          Sign Up
        </Link>
      </View>
    </View>
  );
}
