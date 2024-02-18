import { initializeApp, FirebaseOptions } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export const initFirebasePlatform = (config: FirebaseOptions) => {
  const app = initializeApp(config);
  getAuth(app);
  getFirestore(app);
};
