import { reaction } from "mobx";
import { setupUserRatingsListener } from "../lib/firestore";
import { RootStore } from "./RootStore";
import logger from "../lib/log";

/**
 * Setup any side effects that should run when certain entries in the root store change
 */
export const setupRootStoreEventSubscriptions = (store: RootStore) => {
  logger.info("Setting up root store subscriptions");

  reaction(
    () => store.authenticationStore.authenticated,
    (authenticated) => {
      if (authenticated) {
        if (store.authenticationStore.userId) {
          setupUserRatingsListener(store.authenticationStore.userId, (docs) => {
            store.ratingsStore.setRatings(docs as any);
          });
        } else {
          logger.error("No auth userId");
        }
      }
    },
  );
};
