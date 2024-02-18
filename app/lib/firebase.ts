import { getApps } from "firebase/app";
import { initFirebasePlatform } from "./firebase-platform";
import { logger } from ".";

export const initFirebase = () => {
  const config = process.env.EXPO_PUBLIC_FIREBASE_CONFIG;

  if (!config) {
    console.error("No Firebase config found");
    return;
  }

  if (getApps().length > 0) {
    logger.info("Not initialising Firebase (already initialised");
    return;
  }

  try {
    const firebaseConfig = JSON.parse(config);
    logger.info("Initialising Firebase");
    initFirebasePlatform(firebaseConfig);
  } catch (e) {
    console.error("Error loading Firebase config");
  }
};
