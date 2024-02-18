import { initializeApp, FirebaseOptions } from "firebase/app";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
// @ts-expect-error
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Fix for v10.7.2 of the firebase plugin https://github.com/firebase/firebase-js-sdk/issues/7962#issuecomment-1902290249
(window.navigator as any).userAgent = "ReactNative";

export const initFirebasePlatform = (config: FirebaseOptions) => {
  const app = initializeApp(config);
  initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });
  getFirestore(app);
};
