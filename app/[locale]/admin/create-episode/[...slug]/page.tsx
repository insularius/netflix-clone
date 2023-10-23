"use client";
import React from "react";
import { collection, setDoc, doc, getDocs } from "firebase/firestore";
import { useState } from "react";
import db from "@/app/lib/firebase";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/navigation";
import { Episode, Show } from "@/app/types/firebase";

const CreateShow = ({ params: { slug } }: { params: { slug: string[] } }) => {
  const [newEpisode, setNewEpisode] = useState<Partial<Episode>>({});
  const router = useRouter();
  const [showId, season] = slug;

  const addNewEpisode = async () => {
    const episodeCollectionRef = collection(
      db,
      "shows",
      `showId${showId}`,
      "seasons",
      `${season}`,
      "episodes"
    );
    const querySnapshot = await getDocs(episodeCollectionRef);

    let newEpisodeNumber;
    if (querySnapshot.empty) {
      newEpisodeNumber = 1;
    } else {
      const existingEpisodes = querySnapshot.docs.map((doc) =>
        doc.id.replace("E", "")
      );
      const maxEpisodeNumber = Math.max(...existingEpisodes.map(Number));
      newEpisodeNumber = maxEpisodeNumber + 1;
    }

    const newEpisodeId = "E" + String(newEpisodeNumber).padStart(2, "0");
    const newEpisodeWithId = { ...newEpisode, id: newEpisodeNumber };
    const newEpisodeDocRef = doc(
      db,
      "shows",
      `showId${showId}`,
      "seasons",
      `${season}`,
      "episodes",
      newEpisodeId
    );

    await setDoc(newEpisodeDocRef, newEpisodeWithId);
    alert("Эпизод успешно добавлен");
    router.push("/admin");
  };

  return (
    <div style={{ marginTop: "30px" }}>
      <TextField label="Show ID" value={showId} />
      <TextField label="Season" value={season} />
      <h3>Добавить новый эпизод</h3>
      <TextField
        label="Продолжительность"
        onChange={(e) =>
          setNewEpisode({ ...newEpisode, duration: e.target.value })
        }
      />
      <TextField
        label="Описание"
        onChange={(e) =>
          setNewEpisode({ ...newEpisode, description: e.target.value })
        }
      />
      <TextField
        label="Название"
        onChange={(e) =>
          setNewEpisode({ ...newEpisode, title: e.target.value })
        }
      />
      <TextField
        label="Миниатюра (URL)"
        onChange={(e) =>
          setNewEpisode({ ...newEpisode, thumbnail: e.target.value })
        }
      />
      <Button variant="contained" color="primary" onClick={addNewEpisode}>
        Добавить новый эпизод
      </Button>
    </div>
  );
};

export default CreateShow;
