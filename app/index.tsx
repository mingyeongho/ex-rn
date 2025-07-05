import CardButton from "@/components/CardButton";
import { images, offers } from "@/constants";
import cn from "clsx";
import { Fragment } from "react";
import {
  FlatList,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList
        data={offers}
        renderItem={({ item, index }) => {
          const { id, title, image, color } = item;
          const isEven = index % 2 === 0;

          return (
            <View key={id}>
              <Pressable
                className={cn(
                  "offer-card",
                  isEven ? "flex-row-reverse" : "flex-row"
                )}
                style={{ backgroundColor: color }}
                android_ripple={{ color: "#FFFF22" }}
              >
                {({ pressed }) => {
                  return (
                    <Fragment>
                      <View className="h-full w-1/2">
                        <Image
                          source={image}
                          className="size-full"
                          resizeMode="contain"
                        />
                      </View>
                      <View
                        className={cn(
                          "offer-card__info",
                          isEven ? "pl-10" : "pr-10"
                        )}
                      >
                        <Text className="h1-bold text-white leading-tight">
                          {title}
                        </Text>
                        <Image
                          source={images.arrowRight}
                          className="size-10"
                          resizeMode="contain"
                          tintColor="#FFFFFF"
                        />
                      </View>
                    </Fragment>
                  );
                }}
              </Pressable>
            </View>
          );
        }}
        keyExtractor={(item) => item.id.toString()}
        contentContainerClassName="pb-28 px-5"
        ListHeaderComponent={() => {
          return (
            <View className="flex-between flex-row my-5">
              <View className="flex-start">
                <Text className="font-semibold text-primary">DELIVER TO</Text>
                <TouchableOpacity className="flex-center flex-row gap-x-1 mt-0.5">
                  <Text className="paragraph-bold text-dark-100">Ilsan</Text>
                  <Image
                    source={images.arrowDown}
                    className="size-3"
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>

              <CardButton />
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}
