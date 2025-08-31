import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const TabsLayout = () => {
  const insets = useSafeAreaInsets();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#0f0e0c",
          borderTopWidth: 2,
          paddingBottom: insets.bottom, // Adjust based on device safe area
          paddingTop: 5,
          height: 60 + insets.bottom, // increase height to account for it
          borderColor: "white",
          overflow: "hidden",
        },
        tabBarActiveTintColor: "#FF0000", // Red color for focused state
        tabBarInactiveTintColor: "#ffffff",

        // tabBarBackground: () => (
        //   <View className="h-[60] w-full overflow-hidden">
        //     <BlurView
        //       blurType="dark"
        //       reducedTransparencyFallbackColor="black"
        //       style={{ position: "absolute", height: 60, width: "100%" }}
        //       blurAmount={10}
        //     />
        //   </View>
        // ),
        tabBarShowLabel: false,
      }}
      initialRouteName="Home"
    >
      <Tabs.Screen
        name="Home"
        options={{
          tabBarIcon: ({ focused, color }) => {
            return <Ionicons name="home" size={24} color={color} />;
          },
        }}
      />
      <Tabs.Screen
        name="SearchScreen"
        options={{
          tabBarIcon: ({ focused, color }) => {
            return <Ionicons name="search-sharp" size={24} color={color} />;
          },
        }}
      />

      <Tabs.Screen
        name="NotificationsScreen"
        options={{
          tabBarIcon: ({ focused, color }) => {
            return <FontAwesome5 name="bell" size={24} color={color} />;
          },
        }}
      />

      <Tabs.Screen
        name="FavoritesScreen"
        options={{
          tabBarIcon: ({ focused, color }) => {
            return <FontAwesome5 name="heart" size={24} color={color} />;
          },
        }}
      />
      <Tabs.Screen
        name="MessageScreen"
        options={{
          tabBarIcon: ({ focused, color }) => {
            return (
              <Ionicons
                name="chatbubble-ellipses-outline"
                size={24}
                color={color}
              />
            );
          },
        }}
      />

      <Tabs.Screen
        name="ProfileScreen"
        options={{
          tabBarIcon: ({ focused, color }) => {
            return <FontAwesome5 name="user" size={24} color={color} />;
          },
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
