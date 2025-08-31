import {
  checkUserType,
  getCurrentPartnerData,
  getCurrentUserData,
} from "@/helpers/firestore";
import { RootState } from "@/store/rootReducer";
import {
  PartnerData,
  resetPartnerData,
  setPartnerData,
} from "@/store/slices/partnerSlice";
import { resetUserData, setUserData, UserData } from "@/store/slices/userSlice";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";

const ProcessUserData = () => {
  const dispatch = useDispatch();
  const creatingUserData = useSelector(
    (state: RootState) => state.auth.creatingUserData
  );
  const [messageText, setMessageText] = useState("");

  useEffect(() => {
    (async () => {
      console.log("[ProcessUserData] Starting user data processing", {
        creatingUserData,
      });
      if (creatingUserData) {
        console.log(
          "[ProcessUserData] Skipping: User data creation in progress"
        );
        return;
      }

      // Add a small delay to prevent brief redirects
      await new Promise((resolve) => setTimeout(resolve, 500));

      setMessageText("Vérification du type d'utilisateur...");
      console.log("[ProcessUserData] Checking user type...");
      const userType = await checkUserType();

      if (!userType) {
        console.log(
          "[ProcessUserData] No user type found, resetting data and navigating to Onboarding"
        );
        dispatch(resetUserData());
        dispatch(resetPartnerData());
        setTimeout(() => {
          console.log("[ProcessUserData] Navigating to /Auth/Onboarding");
          router.replace("/Auth/Onboarding");
        }, 300);
        return;
      }

      console.log("[ProcessUserData] User type found", { userType });

      if (userType === "binome") {
        setMessageText("Récupération des données utilisateur...");
        console.log("[ProcessUserData] Fetching binome user data...");
        const userData: UserData | null = await getCurrentUserData();

        if (!userData) {
          console.log(
            "[ProcessUserData] No binome user data found, resetting and navigating to /Users/Onboarding"
          );
          dispatch(resetUserData());
          setTimeout(() => {
            console.log("[ProcessUserData] Navigating to /Users/Onboarding");
            router.replace("/Users/Onboarding");
          }, 300);
        } else {
          console.log("[ProcessUserData] Binome user data retrieved", {
            userData,
          });
          dispatch(setUserData(userData));

          setTimeout(() => {
            if (!userData?.acceptCGU) {
              console.log(
                "[ProcessUserData] Binome: CGU not accepted, navigating to /Users/Onboarding"
              );
              router.replace("/Users/Onboarding");
            } else if (!userData?.quizCompleted) {
              console.log(
                "[ProcessUserData] Binome: Quiz not completed, navigating to /Users/SportChoice"
              );
              router.replace("/Users/SportChoice");
            } else {
              console.log(
                "[ProcessUserData] Binome: Fully set up, navigating to /(root)/Home"
              );
              router.replace("/(root)/Home");
            }
          }, 300);
        }
      } else if (userType === "partner") {
        setMessageText("Récupération des données partenaire...");
        console.log("[ProcessUserData] Fetching partner data...");
        const partnerData: PartnerData | null = await getCurrentPartnerData();

        if (!partnerData) {
          console.log(
            "[ProcessUserData] No partner data found, resetting and navigating to /Partner/Onboarding"
          );
          dispatch(resetPartnerData());
          setTimeout(() => {
            console.log("[ProcessUserData] Navigating to /Partner/Onboarding");
            router.replace("/Partner/Onboarding");
          }, 300);
        } else {
          console.log("[ProcessUserData] Partner data retrieved", {
            partnerData,
          });
          dispatch(setPartnerData(partnerData));

          setTimeout(() => {
            if (!partnerData?.acceptCGU) {
              console.log(
                "[ProcessUserData] Partner: CGU not accepted, navigating to /Partner/Onboarding"
              );
              router.replace("/Partner/Onboarding");
            } else {
              console.log(
                "[ProcessUserData] Partner: Fully set up, navigating to /Partner/ProfilPartenaire"
              );
              router.replace("/Partner/ProfilPartenaire");
            }
          }, 300);
        }
      }
    })();
  }, [dispatch, creatingUserData]);

  return (
    <View className="flex-1 bg-black items-center justify-center gap-4">
      {creatingUserData && (
        <Animated.Text
          entering={FadeInDown.duration(500)}
          className="text-center text-white font-roboto-bold text-[22px]"
        >
          {messageText}
        </Animated.Text>
      )}
      <Image
        source={require("@/assets/images/logo.png")}
        className="w-40 h-24"
        resizeMode="contain"
      />
      <ActivityIndicator
        className="absolute bottom-28 self-center"
        color={"white"}
        size={"large"}
      />
    </View>
  );
};

export default ProcessUserData;
