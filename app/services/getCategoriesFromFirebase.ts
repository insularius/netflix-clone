import { doc, getDoc } from "firebase/firestore";
import db from "../lib/firebase";
import { Category } from "../types/firebase";

export const getCategoriesFromFirebase = async (
  categoryIds: string[]
): Promise<Category[]> => {
  const categoriesData: Category[] = [];

  for (let categoryId of categoryIds) {
    // console.log("Processing categoryId:", categoryId);
    if (!categoryId) {
      console.warn("Пропущен неверный categoryId:", categoryId);
      continue;
    }
    const categoriesDocRef = doc(db, "categories", categoryId);
    const categoriesSnapshot = await getDoc(categoriesDocRef);

    if (categoriesSnapshot.exists()) {
      categoriesData.push(categoriesSnapshot.data() as Category);
    }
  }
  return categoriesData;
};
