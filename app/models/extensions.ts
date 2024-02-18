import { getRoot, Instance, IStateTreeNode } from "mobx-state-tree";
import { AuthenticationStoreModel, RatingsStoreModel } from "./RootStore";

export const withAuthenticationStore = (self: IStateTreeNode) => ({
  views: {
    get authenticationStore() {
      return (getRoot(self) as any).authenticationStore as Instance<typeof AuthenticationStoreModel>;
    },
  },
});

export const withRatingsStore = (self: IStateTreeNode) => ({
  views: {
    get ratingsStore() {
      return (getRoot(self) as any).ratingsStore as Instance<typeof RatingsStoreModel>;
    },
  },
});
