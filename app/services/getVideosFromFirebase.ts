import { collection, getDocs } from "firebase/firestore";
import db from "../lib/firebase";
import { Show } from "../types/firebase";

export const getVideosFromFirebase = async (): Promise<Show[]> => {
  const showsRef = collection(db, "shows");
  const showSnapshots = await getDocs(showsRef);

  const videos: Show[] = showSnapshots.docs.map((doc) => doc.data() as Show);
  return videos;
};
