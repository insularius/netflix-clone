"use client";
import { TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { doc, DocumentData, getDoc, updateDoc } from "firebase/firestore";
import db from "@/app/lib/firebase";

export default function EditEpisode({
  params: { slug },
}: {
  params: { slug: string[] };
}) {
  const [showId, season, id] = slug;

  const [currentEpisode, setCurrentEpisode] = useState<DocumentData | null>(
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const paddedEpisodeId = String(id).padStart(2, "0");
        const docRef = doc(
          db,
          `shows/showId${showId}/seasons/${season}/episodes/E${paddedEpisodeId}`
        );
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setCurrentEpisode(docSnap.data());
        } else {
          console.log("No such document!");
        }
      }
    };
    fetchData();
  }, [id, season, showId]);

  const updateEpisode = async () => {
    if (id && currentEpisode) {
      const paddedEpisodeId = String(id).padStart(2, "0");
      const docRef = doc(
        db,
        `shows/showId${showId}/seasons/${season}/episodes/E${paddedEpisodeId}`
      );
      await updateDoc(docRef, {
        ...currentEpisode,
      });
    }
  };

  return (
    <div>
      <h1>Edit Episode: {id}</h1>
      <TextField
        label="Episode Title"
        value={currentEpisode?.title || ""}
        onChange={(e) =>
          setCurrentEpisode({ ...currentEpisode, title: e.target.value })
        }
      />
      <TextField
        label="Episode Duration"
        value={currentEpisode?.duration || ""}
        onChange={(e) =>
          setCurrentEpisode({ ...currentEpisode, duration: e.target.value })
        }
      />
      <TextField
        label="Episode Description"
        value={currentEpisode?.description || ""}
        onChange={(e) =>
          setCurrentEpisode({ ...currentEpisode, description: e.target.value })
        }
      />
      <TextField
        label="Episode Thumbnail"
        value={currentEpisode?.thumbnail || ""}
        onChange={(e) =>
          setCurrentEpisode({ ...currentEpisode, thumbnail: e.target.value })
        }
      />

      <Button variant="contained" color="primary" onClick={updateEpisode}>
        Update
      </Button>
    </div>
  );
}
