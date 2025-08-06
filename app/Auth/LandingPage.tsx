import { getCurrentUserData } from "@/helpers/firestore";
import { RootState } from "@/store/rootReducer";
import { router } from "expo-router";
import React from "react";
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { getResponsiveFontSize, getMaxContainerWidth, isDesktop, isTablet } from "@/constants/responsive";

const LandingPage = () => {
  const currentUser = useSelector((state: RootState) => state.auth.user);
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  // Responsive values
  const containerWidth = Math.min(width * 0.9, 400); // Responsive container width with max limit
  const logoWidth = Math.min(width * 0.75, 300); // Responsive logo with max limit
  const titleFontSize = getResponsiveFontSize(32);
  const buttonFontSize = getResponsiveFontSize(24);
  
  // Landing image responsive sizing
  const landingImageWidth = isDesktop ? Math.min(width * 0.6, 800) : width * 0.95;

  return (
    <View className="flex-1 bg-[#0F0E0C]">
      <ImageBackground
        source={require("@/assets/images/bg.png")}
        className="h-full"
        resizeMode="cover"
      >
        {/* Center content container */}
        <View className="flex-1 items-center justify-center max-w-container mx-auto px-4">
          {/* Landing image with responsive sizing */}
          <Image
            source={require("@/assets/images/landingImage.png")}
            className="absolute bottom-10"
            style={{ 
              width: landingImageWidth,
              height: undefined,
              aspectRatio: 1 // Maintain aspect ratio
            }}
            resizeMode="contain"
          />
          
          {/* Main content container */}
          <Animated.View
            entering={FadeInDown.duration(1000).delay(150)}
            className="items-center"
            style={{ width: containerWidth }}
          >
            {/* Logo with responsive sizing */}
            <Image
              source={require("@/assets/images/logo.png")}
              className="mb-8 md:mb-12"
              style={{ 
                width: logoWidth,
                height: undefined,
                aspectRatio: 300/200 // Maintain logo aspect ratio
              }}
              resizeMode="contain"
            />
            
            {/* Tagline text with responsive layout */}
            <View className="w-full space-y-4 md:space-y-6">
              <View className="flex-row justify-between items-center">
                <Animated.Text
                  entering={FadeInDown.duration(600).delay(600)}
                  className="text-[#D0A0A0] font-kavivanar flex-1 text-left px-2"
                  style={{ 
                    fontSize: titleFontSize,
                    letterSpacing: -0.3 
                  }}
                >
                  Moins de swipe
                </Animated.Text>
                <View className="flex-1" />
              </View>
              
              <View className="flex-row justify-between items-center">
                <View className="flex-1" />
                <Animated.Text
                  entering={FadeInDown.duration(600).delay(1200)}
                  className="text-[#D0A0A0] font-kavivanar flex-1 text-right px-2"
                  style={{ 
                    fontSize: titleFontSize,
                    letterSpacing: -0.3 
                  }}
                >
                  Plus de sueur
                </Animated.Text>
              </View>
            </View>
          </Animated.View>
        </View>

        {/* Call-to-action button */}
        <Animated.View
          entering={FadeInDown.duration(600).delay(1800)}
          className="absolute bottom-6 left-0 right-0 items-center px-4"
        >
          <TouchableOpacity
            onPress={async () => {
              console.log(currentUser);
              if (currentUser) {
                const userData = await getCurrentUserData();
                if (userData?.userType === "binome") {
                  router.navigate("/Users/Onboarding");
                } else router.navigate("/Partner/ProfilPartenaire");
              }
              router.navigate("/Auth/Login");
            }}
            className="py-3 md:py-4 px-6 md:px-8 rounded-2xl items-center justify-center bg-red max-w-sm w-full"
            style={{ marginBottom: insets.bottom + 28 }}
          >
            <Text 
              className="font-roboto-semicondensed-extrabold text-white text-center"
              style={{ fontSize: buttonFontSize }}
            >
              Je commence l&apos;aventure !
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </ImageBackground>
    </View>
  );
};

export default LandingPage;
