import { sendLike, unlikeProfile } from "@/helpers/firestoreLikesActions";
import { calculateAge } from "@/helpers/timeAgo";
import { UserData } from "@/store/slices/userSlice";

// Import your functions
import { Entypo } from "@expo/vector-icons";
import { ImageBackground } from "expo-image";
import { router } from "expo-router";
import { Timestamp } from "firebase/firestore";
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import Toast from "react-native-toast-message";
import { getCardWidth, getResponsiveFontSize, isDesktop, isTablet } from "@/constants/responsive";

const UserCard = ({ user: item, index }: { user: UserData; index: number }) => {
  const { width } = useWindowDimensions();
  const [isLiked, setIsLiked] = React.useState(false); // Track like state locally
  console.log(item);

  if (!item) return null;

  // Responsive sizing
  const cardWidth = isDesktop ? getCardWidth() : isTablet ? width * 0.4 : width * 0.45;
  const cardHeight = cardWidth * 1.4; // Maintain aspect ratio
  const nameFontSize = getResponsiveFontSize(22);
  const iconSize = isDesktop ? 40 : 35;
  
  // Responsive margins
  const marginVertical = isDesktop ? 12 : isTablet ? 8 : 4;

  const handleLike = async () => {
    try {
      await sendLike(item.uid!);
      setIsLiked(true);
      Toast.show({
        type: "success",
        text1: "Like sent!",
        visibilityTime: 2000,
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.message,
        visibilityTime: 2000,
      });
    }
  };

  const handleUnlike = async () => {
    try {
      await unlikeProfile(item.uid);
      setIsLiked(false);
      Toast.show({
        type: "success",
        text1: "Like removed",
        visibilityTime: 2000,
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.message,
        visibilityTime: 2000,
      });
    }
  };

  return (
    <Animated.View
      entering={FadeInDown.delay(150 * index)}
      className="bg-white rounded-[20px] overflow-hidden"
      style={{
        width: cardWidth,
        marginVertical: marginVertical,
        marginHorizontal: isDesktop ? 8 : 4,
      }}
    >
      <TouchableOpacity
        onPress={() =>
          router.navigate({
            pathname: "/Users/PublicProfile",
            params: { userId: item.uid },
          })
        }
      >
        <ImageBackground
          source={{ uri: item?.profilePicUrl }}
          style={{
            height: cardHeight * 0.75, // Responsive height
            margin: 2,
            borderRadius: 18,
            overflow: "hidden",
          }}
          contentFit="cover"
          placeholder={require("@/assets/images/default-user-picture.png")}
        >
          <View
            style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
          />
          <View className="absolute bottom-2 flex-1 w-full">
            <Text 
              className="text-wrap mx-4 text-white font-roboto-condensed-bold"
              style={{ fontSize: nameFontSize }}
            >
              {item?.nom} {item?.prenoms},
              {calculateAge(item?.naissance as Timestamp)}
            </Text>
            <View className="bg-white rounded-[12px] px-2 mt-2 mx-2 flex-row items-center justify-evenly">
              <TouchableOpacity onPress={handleUnlike} className="p-2">
                <Entypo
                  name="cross"
                  size={iconSize}
                  color={isLiked ? "gray" : "red"}
                />
              </TouchableOpacity>
              <View
                style={{ width: 2, height: 24, backgroundColor: "#a24646" }}
              />
              <TouchableOpacity onPress={handleLike} className="p-2">
                <Entypo name="heart" size={iconSize - 5} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default UserCard;
