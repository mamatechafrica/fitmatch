// helpers/timeAgo.ts
import dayjs from "dayjs";
import "dayjs/locale/fr"; // Import French locale
import relativeTime from "dayjs/plugin/relativeTime";
import { Timestamp } from "firebase/firestore";

// Extend dayjs with plugins
dayjs.extend(relativeTime);
dayjs.locale("fr"); // Set French as default locale

export const getTimeAgo = (timestamp: Timestamp | string) => {
  let date;

  if (typeof timestamp === "string") {
    // Handle string date format
    date = dayjs(timestamp);
  } else if (timestamp && typeof timestamp.toDate === "function") {
    // Handle Firestore Timestamp
    date = dayjs(timestamp.toDate());
  } else {
    // Fallback for invalid data
    console.warn("Invalid timestamp format:", timestamp);
    return "Invalid date";
  }

  return date.fromNow(); // Will now output in French
};

export const calculateAge = (
  timestamp: Timestamp | string | undefined
): number => {
  if (!timestamp) {
    return 0;
  }

  let birthDate;

  if (typeof timestamp === "string") {
    // Handle string date format
    birthDate = dayjs(timestamp);
  } else if (timestamp && typeof timestamp.toDate === "function") {
    // Handle Firestore Timestamp
    birthDate = dayjs(timestamp.toDate());
  } else {
    // Fallback for invalid data
    console.warn("Invalid timestamp format:", timestamp);
    return 0;
  }

  return dayjs().diff(birthDate, "year");
};
