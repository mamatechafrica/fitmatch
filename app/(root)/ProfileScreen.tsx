import { db, firebaseApp } from "@/config/firebase";
import { useEmailAuth } from "@/customHooks/useEmailAuth";
import { useGoogleSignIn } from "@/customHooks/useGoogleSignIn";
import { updateUserData } from "@/helpers/firestore";
import { RootState } from "@/store/rootReducer";
import { setUser } from "@/store/slices/authSlice";
import { resetUserData, setUserData } from "@/store/slices/userSlice";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { deleteUser, getAuth } from "firebase/auth";
import { deleteDoc, doc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import React, { useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";

const ProfileScreen = () => {
  const storage = getStorage(firebaseApp);
  const userData = useSelector((state: RootState) => state.user.data);

  const { signOut: signOutGoogle } = useGoogleSignIn();
  const { signOut: signOutEmail } = useEmailAuth();
  const [confirmVisible, setConfirmVisible] = React.useState(false);
  const [logoutConfirmVisible, setLogoutConfirmVisible] = useState(false);

  const [busy, setBusy] = useState(false);
  const dispatch = useDispatch();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      console.log("uploading image....");
      await uploadImage(result.assets[0].uri);
      console.log("uploaded image!");
    }
  };

  const uploadImage = async (image: string) => {
    try {
      const response = await fetch(image);
      const blob = await response.blob();
      const filename = image.substring(image.lastIndexOf("/") + 1);
      console.log("filename >>> ", filename);
      const imageRef = ref(storage, `profile_photos/${filename}`);
      await uploadBytes(imageRef, blob).then(async () => {
        const downloadURL = await getDownloadURL(imageRef);
        console.log("uploaded >> ", downloadURL);
        await updateUserData({ profilePicUrl: downloadURL });
        dispatch(setUserData({ ...userData, profilePicUrl: downloadURL }));
      });
    } catch (error: any) {
      console.error("Full Firebase error:", error);
      if (error?.serverResponse) {
        console.log("Server response:", error.serverResponse);
      }
      if (error?.customData) {
        console.log("Custom data:", error.customData);
      }
      if (error?.message) {
        console.log("Message:", error.message);
      }
    }
  };

  if (!userData) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.text}>Loading user data...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {busy && (
        <View className="absolute z-10 flex-1 h-screen w-screen bg-white items-center justify-center">
          <Text>
            Deconnexion <ActivityIndicator />
          </Text>
        </View>
      )}
      <ScrollView contentContainerStyle={styles.content}>
        <Image
          source={require("@/assets/images/logo.png")}
          className="w-[66] h-[43] mx-4 mt-4 self-start"
        />
        <TouchableOpacity activeOpacity={0.67} onPress={pickImage}>
          <Image
            source={{ uri: userData.profilePicUrl }}
            placeholder={require("@/assets/images/default-user-picture.png")}
            className="h-24 w-24 rounded-full"
            style={{
              overflow: "hidden",
              width: 120,
              height: 120,
              borderRadius: 60,
              marginBottom: 16,
            }}
          />
        </TouchableOpacity>

        <Text style={styles.name}>
          {userData.prenoms} {userData.nom}
        </Text>
        <Text style={styles.email}>{userData.email}</Text>

        {userData.totalPoints !== undefined && (
          <Text style={styles.points}>🏆 Points: {userData.totalPoints}</Text>
        )}

        {userData.percentage !== undefined && (
          <Text style={styles.percentage}>
            🎯 Completion: {userData.percentage}%
          </Text>
        )}

        {/* Profile Information Section */}
        <View style={styles.infoSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.infoTitle}>Informations personnelles</Text>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => router.push("/Users/Onboarding?editing=true")}
            >
              <Text style={styles.editButtonText}>✏️ Modifier</Text>
            </TouchableOpacity>
          </View>

          {userData.pseudo && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>👤 Pseudo:</Text>
              <Text style={styles.infoValue}>{userData.pseudo}</Text>
            </View>
          )}

          {userData.naissance && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>🎂 Date de naissance:</Text>
              <Text style={styles.infoValue}>
                {new Date(userData.naissance).toLocaleDateString("fr-FR")}
              </Text>
            </View>
          )}

          {userData.ville && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>📍 Ville:</Text>
              <Text style={styles.infoValue}>{userData.ville}</Text>
            </View>
          )}

          {userData.nationalite && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>🌍 Nationalité:</Text>
              <Text style={styles.infoValue}>{userData.nationalite}</Text>
            </View>
          )}

          {userData.sex !== undefined && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>⚧ Sexe:</Text>
              <Text style={styles.infoValue}>
                {userData.sex === 1 ? "Homme" : "Femme"}
              </Text>
            </View>
          )}
        </View>

        {/* Sport Information Section */}
        <View style={styles.infoSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.infoTitle}>Informations sportives</Text>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => router.push("/Users/SportChoice?editing=true")}
            >
              <Text style={styles.editButtonText}>✏️ Modifier</Text>
            </TouchableOpacity>
          </View>

          {userData.sport && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>⚽ Sport principal:</Text>
              <Text style={styles.infoValue}>{userData.sport}</Text>
            </View>
          )}

          {userData.sportExtreme && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>🔥 Sport extrême:</Text>
              <Text style={styles.infoValue}>{userData.sportExtreme}</Text>
            </View>
          )}

          {userData.category && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>🏆 Catégorie:</Text>
              <Text style={styles.infoValue}>{userData.category}</Text>
            </View>
          )}

          {userData.frequence !== undefined && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>📅 Fréquence:</Text>
              <Text style={styles.infoValue}>{userData.frequence}/semaine</Text>
            </View>
          )}
        </View>

        {/* Diet Section */}
        {userData.diet && (
          <View style={styles.infoSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.infoTitle}>Régime alimentaire</Text>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => router.push("/Users/DietChoice?editing=true")}
              >
                <Text style={styles.editButtonText}>✏️ Modifier</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>🍽️ Régime:</Text>
              <Text style={styles.infoValue}>{userData.diet}</Text>
            </View>
          </View>
        )}

        {/* Personality Section */}
        {userData.personality && (
          <View style={styles.infoSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.infoTitle}>Personnalité</Text>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() =>
                  router.push("/Users/PersonalityChoice?editing=true")
                }
              >
                <Text style={styles.editButtonText}>✏️ Modifier</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>🎭 Trait principal:</Text>
              <Text style={styles.infoValue}>
                {typeof userData.personality === "string"
                  ? userData.personality
                  : Array.isArray(userData.personality)
                  ? userData.personality.join(", ")
                  : ""}
              </Text>
            </View>
          </View>
        )}

        {/* Relationship Goals Section */}
        {userData.objectifDuCoeur && (
          <View style={styles.infoSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.infoTitle}>Objectif relationnel</Text>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() =>
                  router.push("/Users/SportsObjectives?editing=true")
                }
              >
                <Text style={styles.editButtonText}>✏️ Modifier</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>💕 Objectif:</Text>
              <Text style={styles.infoValue}>{userData.objectifDuCoeur}</Text>
            </View>
          </View>
        )}

        {/* Weekend Vibes Section */}
        {Array.isArray(userData.weekendVibes) &&
          userData.weekendVibes.length > 0 && (
            <View style={styles.infoSection}>
              <View style={styles.sectionHeader}>
                <Text style={styles.infoTitle}>Ambiances weekend</Text>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() =>
                    router.push("/Users/WeekendVibes?editing=true")
                  }
                >
                  <Text style={styles.editButtonText}>✏️ Modifier</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>🌟 Ambiances:</Text>
                <Text style={styles.infoValue}>
                  {Array.isArray(userData.weekendVibes)
                    ? userData.weekendVibes.join(", ")
                    : ""}
                </Text>
              </View>
            </View>
          )}

        {/* Complete Profile Button - Show if user hasn't completed all sections */}
        {(!userData.sport ||
          !userData.diet ||
          !userData.personality ||
          !Array.isArray(userData.weekendVibes) ||
          userData.weekendVibes.length === 0) && (
          <TouchableOpacity
            className="bg-[#FF6B35] rounded-full py-3 items-center px-20 mt-6 w-full"
            onPress={() => router.push("/Users/Onboarding")}
          >
            <Text className="text-[#FFF] font-roboto text-[1.1rem] font-semibold">
              🚀 Compléter mon profil
            </Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          className=" mx-4 items-center justify-center rounded-[16] bg-[#D32C1C] py-2 w-full mt-6"
          onPress={() => setConfirmVisible(true)}
        >
          <Text className="text-white font-roboto-condensed tracking-[-0.3px] text-[20px]">
            Supprimer mes données!
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-transparent border border-[#FF0000] rounded-full py-3 items-center px-20 mt-4 w-full"
          onPress={() => setLogoutConfirmVisible(true)}
        >
          <Text className="text-[#FFF] font-roboto text-[1.2rem]">
            Déconnexion
          </Text>
        </TouchableOpacity>
        {logoutConfirmVisible && (
          <View className="absolute inset-0 bg-black/80 justify-center items-center px-6 z-50">
            <View className="bg-[#1a1a1a] rounded-2xl p-6 w-full max-w-md mt-48">
              <Text className="text-white text-[18px] font-bold mb-2 text-center">
                Voulez-vous vous déconnecter ?
              </Text>
              <Text className="text-gray-300 text-center text-[14px] leading-5 mb-4">
                Vous serez redirigé vers la page d’accueil et devrez vous
                reconnecter pour accéder à votre compte.
              </Text>

              <View className="flex-row justify-between gap-4">
                <TouchableOpacity
                  onPress={() => setLogoutConfirmVisible(false)}
                  className="flex-1 py-3 bg-gray-600 rounded-xl items-center"
                >
                  <Text className="text-white font-bold text-[16px]">
                    Annuler
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={async () => {
                    setBusy(true);
                    setLogoutConfirmVisible(false);
                    dispatch(setUser(null));
                    dispatch(resetUserData());
                    try {
                      await signOutGoogle();
                      await signOutEmail();
                    } catch (e: any) {
                      console.warn(e);
                    }
                    setBusy(false);
                    router.replace("/Auth/LandingPage");
                  }}
                  className="flex-1 py-3 bg-red-700 rounded-xl items-center"
                >
                  <Text className="text-white font-bold text-[16px]">
                    Se déconnecter
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        {confirmVisible && (
          <View className="absolute inset-0 bg-black/80 justify-center items-center px-6 z-50">
            <View className="bg-[#1a1a1a] rounded-2xl p-6 w-full max-w-md mt-48">
              <Text className="text-white text-[18px] font-bold mb-2 text-center">
                Supprimer définitivement vos données ?
              </Text>
              <Text className="text-gray-300 text-center text-[14px] leading-5 mb-4">
                Cette action est{" "}
                <Text className="text-red-400 font-semibold">irréversible</Text>
                . Toutes vos données personnelles seront supprimées et ne seront{" "}
                <Text className="text-red-400 font-semibold">
                  pas conservées
                </Text>{" "}
                dans notre base de données.
              </Text>

              <View className="flex-row justify-between gap-4">
                <TouchableOpacity
                  onPress={() => setConfirmVisible(false)}
                  className="flex-1 py-3 bg-gray-600 rounded-xl items-center"
                >
                  <Text className="text-white font-bold text-[16px]">
                    Annuler
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={async () => {
                    try {
                      const auth = getAuth();
                      const currentUser = auth.currentUser;

                      if (!currentUser) {
                        Toast.show({
                          type: "error",
                          text1: "Erreur",
                          text2: "Aucun utilisateur connecté.",
                        });
                        return;
                      }

                      await deleteDoc(doc(db, "users", currentUser.uid));
                      await deleteUser(currentUser);

                      Toast.show({
                        type: "success",
                        text1: "Compte supprimé",
                        text2: "Votre compte a été supprimé avec succès.",
                      });

                      setConfirmVisible(false);
                      router.replace("/Auth/LandingPage");
                    } catch (err: any) {
                      console.error("Delete error:", err);
                      let message = "Une erreur est survenue.";

                      if (err.code === "auth/requires-recent-login") {
                        message =
                          "Reconnectez-vous avant de supprimer votre compte.";
                      }

                      Toast.show({
                        type: "error",
                        text1: "Erreur",
                        text2: message,
                      });
                    }
                  }}
                  className="flex-1 py-3 bg-red-700 rounded-xl items-center"
                >
                  <Text className="text-white font-bold text-[16px]">
                    Supprimer
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000", // Black background
  },
  content: {
    alignItems: "center",
    padding: 24,
  },
  name: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  email: {
    color: "#aaa",
    fontSize: 14,
    marginBottom: 12,
  },
  points: {
    color: "#fff",
    fontSize: 16,
    marginTop: 8,
  },
  percentage: {
    color: "#00ffcc",
    fontSize: 16,
    marginTop: 4,
  },
  text: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
  infoSection: {
    backgroundColor: "#1a1a1a",
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
    width: "100%",
  },
  infoTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
    paddingVertical: 4,
  },
  infoLabel: {
    color: "#ccc",
    fontSize: 14,
    fontWeight: "500",
    flex: 1,
  },
  infoValue: {
    color: "#fff",
    fontSize: 14,
    flex: 2,
    textAlign: "right",
    flexWrap: "wrap",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  editButton: {
    backgroundColor: "#FF6B35",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  editButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
});

export default ProfileScreen;
