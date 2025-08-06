import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Image, TouchableOpacity, View, useWindowDimensions } from "react-native";
import GearIcon from "../Icons/GearIcon";
import HandShakeIcon from "../Icons/HandShakeIcon";
import { getResponsivePadding, isDesktop, isTablet } from "@/constants/responsive";

const HeaderBar = () => {
  const { width } = useWindowDimensions();
  
  // Responsive values
  const logoSize = isDesktop ? { width: 80, height: 52 } : { width: 66, height: 43 };
  const iconSize = isDesktop ? 36 : 32;
  const horizontalPadding = getResponsivePadding(16);
  const topMargin = isDesktop ? 12 : 8;

  return (
    <View 
      className="flex-row items-center justify-between absolute z-10 w-full overflow-hidden"
      style={{
        marginTop: topMargin,
        height: 60,
        paddingHorizontal: horizontalPadding,
        maxWidth: isDesktop ? 1200 : undefined,
        alignSelf: "center",
      }}
    >
      {/* Logo */}
      <Image
        source={require("@/assets/images/logo.png")}
        style={logoSize}
        resizeMode="contain"
      />
      
      {/* Action buttons */}
      <View 
        className="flex-row items-center"
        style={{ gap: isDesktop ? 20 : 16 }}
      >
        <TouchableOpacity
          hitSlop={8}
          onPress={() => router.navigate("/(root)/Home/NewPost")}
          className="p-2" // Add padding for better touch target
        >
          <AntDesign name="plus" size={iconSize} color={"white"} />
        </TouchableOpacity>
        
        <TouchableOpacity hitSlop={8} className="p-2">
          <HandShakeIcon />
        </TouchableOpacity>
        
        <TouchableOpacity hitSlop={8} className="p-2">
          <GearIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HeaderBar;
