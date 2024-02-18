import { addDoc, collection, DocumentData, getFirestore, onSnapshot, query, where } from "firebase/firestore";
import { RatingCategory } from "./constants";

export enum Tables {
  RATINGS = "ratings",
}

export const setupUserRatingsListener = (userId: string, cb: (docs: DocumentData[]) => void) => {
  const q = query(collection(getFirestore(), Tables.RATINGS), where("userId", "==", userId));

  return onSnapshot(q, (querySnapshot) => {
    const docs: DocumentData[] = [];
    querySnapshot.forEach((doc) => {
      const d = doc.data();
      docs.push(d);
    });
    cb(docs);
  });
};

export interface AddRatingParams {
  userId: string;
  name: string;
  category: RatingCategory;
  rating: number;
  comments: string;
}

export const addRating = async (params: AddRatingParams) => {
  return await addDoc(collection(getFirestore(), Tables.RATINGS), {
    userId: params.userId,
    name: params.name,
    category: params.category,
    rating: params.rating,
    comments: params.comments,
  });
};
