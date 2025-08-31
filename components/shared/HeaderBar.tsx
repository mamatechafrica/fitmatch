import { AntDesign } from "@expo/vector-icons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { router } from "expo-router";
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";

const HeaderBar = () => {
  return (
    <View className="flex-row items-center justify-between absolute z-10 mt-8 w-full h-[60] overflow-hidden">
      <Image
        source={require("@/assets/images/logo.png")}
        className="w-[66] h-[43] m-4"
        resizeMode="cover"
      />
      <View className="flex-row items-center gap-4 mr-4">
        <TouchableOpacity
          hitSlop={8}
          onPress={() => router.navigate("/(root)/Home/NewPost")}
        >
          <AntDesign name="plus" size={32} color={"white"} />
        </TouchableOpacity>
        <TouchableOpacity
          hitSlop={8}
          onPress={() => router.navigate("/(root)/FavoritesScreen")}
        >
          <FontAwesome5 name="handshake" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          hitSlop={8}
          onPress={() => router.navigate("/(root)/ProfileScreen")}
        >
          <AntDesign name="user" size={28} color={"white"} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HeaderBar;
