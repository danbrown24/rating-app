import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { cast, flow, Instance, SnapshotOut, types } from "mobx-state-tree";
import { addRating, AddRatingParams } from "../lib/firestore";
import { withAuthenticationStore } from "./extensions";
import { logger } from "app/lib";

export const UserModel = types.model("UserModel").props({
  accessToken: types.maybeNull(types.string),
  displayName: types.maybeNull(types.string),
  email: types.maybeNull(types.string),
  uid: types.maybeNull(types.string),
});

export const AuthenticationStoreModel = types
  .model("AuthenticationStoreModel")
  .props({
    loggingIn: types.optional(types.boolean, false),
    user: types.optional(UserModel, {}),
  })
  .views((self) => ({
    get userId() {
      return self.user.uid;
    },
  }))
  .views((self) => ({
    get authenticated() {
      return !!self.userId;
    },
  }))
  .actions((self) => ({
    loginByEmail: flow(function* loginByEmail(email: string, password: string) {
      try {
        self.loggingIn = true;
        const user = yield signInWithEmailAndPassword(getAuth(), email, password);
        logger.info(`Signed in with email ${user.user.email}`);
        logger.info(`User is`, user);
        self.user = user.user.toJSON();
        return self.user;
      } catch (error) {
        logger.info(`FAILED to sign in with email ${email} :(`, error);
        throw error; // Rethrow so the action promise rejects
      } finally {
        self.loggingIn = false;
      }
    }),
    logout: flow(function* logout() {
      signOut(getAuth());
    }),
  }));

export const RatingModel = types.model("RatingModel").props({
  category: types.integer,
  name: types.string,
  rating: types.integer,
  comments: types.maybeNull(types.string),
});

export const RatingsStoreModel = types
  .model("RatingsStoreModel")
  .props({
    ratings: types.optional(types.array(RatingModel), []),
  })
  .extend(withAuthenticationStore)
  .actions((self) => ({
    setRatings: (ratings: Instance<typeof RatingModel>[]) => {
      self.ratings = cast(ratings);
    },
    addRating: flow(function* (params: Omit<AddRatingParams, "userId">) {
      try {
        const userId = self.authenticationStore.userId;

        if (!userId) {
          throw new Error("No userId");
        }
        yield addRating({ ...params, userId });
        logger.info("Successfully added rating for " + params.name);
      } catch (e) {
        logger.error("Failed to add rating: ", e);
        throw e;
      }
    }),
  }));

/**
 * A RootStore model.
 */
export const RootStoreModel = types
  .model("RootStore")
  .props({
    darkMode: types.optional(types.boolean, false),
    authenticationStore: types.optional(AuthenticationStoreModel, {}),
    ratingsStore: types.optional(RatingsStoreModel, {}),
  })
  .actions((self) => ({
    setDarkMode: (val: boolean) => {
      self.darkMode = val;
    },
  }));

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}
/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
