"use client";
import React from "react";
import {
  collection,
  setDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import db from "@/app/lib/firebase";
import { QuerySnapshot, DocumentData } from "firebase/firestore";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/navigation";
import { Show } from "@/app/types/firebase";

const CreateShow = () => {
  const [newShow, setNewShow] = useState<Partial<Show>>({});
  const router = useRouter();
  const [shows, setShows] = useState<DocumentData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(
        collection(db, "shows")
      );
      setShows(querySnapshot.docs.map((doc) => doc.data()));
    };
    fetchData();
  }, []);

  const addNewShow = async () => {
    const maxId = shows.reduce((max, show) => {
      return Math.max(show.id, max);
    }, 0);
    const newId = maxId + 1;
    const newShowWithId = { ...newShow, id: newId };
    const docRef = doc(db, "shows", `showId${newId}`);
    await setDoc(docRef, newShowWithId);
    const updatedShows = [...shows, newShowWithId];
    setShows(updatedShows);
    router.push("/admin");
  };

  return (
    <div>
      <h1>Создать новое шоу</h1>
      <h2>Информация о новом шоу</h2>
      <TextField
        label="Название шоу"
        onChange={(e) => setNewShow({ ...newShow, title: e.target.value })}
      />
      <TextField
        label="Описание"
        onChange={(e) =>
          setNewShow({ ...newShow, description: e.target.value })
        }
      />
      <TextField
        label="Количество сезонов"
        type="number"
        onChange={(e) =>
          setNewShow({ ...newShow, seasons: parseInt(e.target.value, 10) })
        }
      />
      <TextField
        label="В ролях"
        onChange={(e) => setNewShow({ ...newShow, cast: e.target.value })}
      />
      <TextField
        label="Категории (ID через запятую)"
        onChange={(e) =>
          setNewShow({
            ...newShow,
            categoryIds: e.target.value.split(",").map((str) => str.trim()),
          })
        }
      />
      <TextField
        label="Понравилось"
        type="number"
        onChange={(e) =>
          setNewShow({ ...newShow, likes: parseInt(e.target.value, 10) })
        }
      />
      <TextField
        label="Не понравилось"
        type="number"
        onChange={(e) =>
          setNewShow({ ...newShow, dislikes: parseInt(e.target.value, 10) })
        }
      />
      <TextField
        label="Совпадение"
        onChange={(e) => setNewShow({ ...newShow, match: e.target.value })}
      />
      <TextField
        label="Год выпуска"
        type="number"
        onChange={(e) =>
          setNewShow({ ...newShow, year: parseInt(e.target.value, 10) })
        }
      />
      <TextField
        label="Миниатюра (URL)"
        onChange={(e) => setNewShow({ ...newShow, thumbnail: e.target.value })}
      />
      <TextField
        label="URL шоу"
        onChange={(e) => setNewShow({ ...newShow, url: e.target.value })}
      />
      <Button variant="contained" color="primary" onClick={addNewShow}>
        Создать новое шоу
      </Button>
    </div>
  );
};

export default CreateShow;
