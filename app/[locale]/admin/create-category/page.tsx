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
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import Link from "next/link";
import { useRouter } from "next/navigation";

const CreateCategory = () => {
  const [categories, setCategories] = useState<DocumentData[]>([]);
  const [newCategory, setNewCategory] = useState<string>("");
  const [newCategoryID, setNewCategoryID] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(
        collection(db, "categories")
      );
      setCategories(querySnapshot.docs.map((doc) => doc.data()));
    };
    fetchData();
  }, []);

  const addNewCategory = async () => {
    const idNumber = parseInt(newCategoryID.replace(/[^\d]/g, ""), 10);
    const docRef = doc(db, "categories", `categoryId${newCategoryID}`);
    await setDoc(docRef, {
      id: idNumber,
      name: newCategory,
    });
    router.push("/admin");
  };
  return (
    <div>
      <TextField
        label="New Category ID"
        value={newCategoryID}
        onChange={(e) => setNewCategoryID(e.target.value)}
      />
      <TextField
        label="New Category Name"
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
      />
      <Button variant="contained" color="secondary" onClick={addNewCategory}>
        Add New Category
      </Button>
    </div>
  );
};

export default CreateCategory;
