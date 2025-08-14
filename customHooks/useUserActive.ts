import { useState, useEffect } from "react";
import { AppState } from "react-native";

export default function useUserActive() {
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      setIsActive(nextAppState === "active");
    });

    return () => subscription?.remove();
  }, []);

  return isActive;
}
