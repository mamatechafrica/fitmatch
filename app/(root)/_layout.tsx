import BellIcon from "@/components/Icons/TabBar/BellIcon";
import HeartIcon from "@/components/Icons/TabBar/HeartIcon";
import HomeIcon from "@/components/Icons/TabBar/HomeIcon";
import MessageBubbleIcon from "@/components/Icons/TabBar/MessageBubbleIcon";
import ProfileIcon from "@/components/Icons/TabBar/ProfileIcon";
import SearchIcon from "@/components/Icons/TabBar/SearchIcon";
import { Tabs } from "expo-router";
import React from "react";
import { View, useWindowDimensions, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { isDesktop, isTablet, getResponsivePadding } from "@/constants/responsive";

const TabsLayout = () => {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  
  // Responsive values
  const isWeb = Platform.OS === 'web';
  const tabBarHeight = isDesktop ? 70 : 60;
  const horizontalPadding = getResponsivePadding(16);
  const maxTabBarWidth = isDesktop ? 800 : undefined;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#0f0e0c",
          borderTopWidth: 2,
          paddingBottom: isWeb ? 8 : insets.bottom, // Different padding for web
          paddingTop: 5,
          paddingHorizontal: horizontalPadding,
          height: tabBarHeight + (isWeb ? 8 : insets.bottom),
          borderColor: "white",
          overflow: "hidden",
          maxWidth: maxTabBarWidth,
          alignSelf: "center",
          width: isDesktop ? Math.min(width, 800) : "100%",
          // Web-specific styles
          ...(isWeb && {
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            marginHorizontal: isDesktop ? 20 : 0,
          }),
        },
        tabBarShowLabel: false,
        tabBarItemStyle: {
          paddingVertical: isDesktop ? 8 : 4,
          marginHorizontal: isDesktop ? 8 : 0,
        },
        // Better hover effects for web
        ...(isWeb && {
          tabBarActiveTintColor: "#D32C1C",
          tabBarInactiveTintColor: "rgba(255, 255, 255, 0.7)",
        }),
      }}
      initialRouteName="Home"
    >
      <Tabs.Screen
        name="Home"
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View 
                className={`${isDesktop ? 'mt-2' : 'mt-4'} ${focused && isWeb ? 'bg-white/10 rounded-lg p-2' : ''}`}
              >
                <HomeIcon />
              </View>
            );
          },
        }}
      />
      <Tabs.Screen
        name="SearchScreen"
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View className={focused && isWeb ? 'bg-white/10 rounded-lg p-2' : ''}>
                <SearchIcon />
              </View>
            );
          },
        }}
      />

      <Tabs.Screen
        name="NotificationsScreen"
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View className={focused && isWeb ? 'bg-white/10 rounded-lg p-2' : ''}>
                <BellIcon />
              </View>
            );
          },
        }}
      />

      <Tabs.Screen
        name="FavoritesScreen"
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View className={focused && isWeb ? 'bg-white/10 rounded-lg p-2' : ''}>
                <HeartIcon />
              </View>
            );
          },
        }}
      />
      <Tabs.Screen
        name="MessageScreen"
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View className={focused && isWeb ? 'bg-white/10 rounded-lg p-2' : ''}>
                <MessageBubbleIcon />
              </View>
            );
          },
        }}
      />

      <Tabs.Screen
        name="ProfileScreen"
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View className={focused && isWeb ? 'bg-white/10 rounded-lg p-2' : ''}>
                <ProfileIcon />
              </View>
            );
          },
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
