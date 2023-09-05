"use client";
import { TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { doc, DocumentData, getDoc, updateDoc } from "firebase/firestore";
import db from "@/app/lib/firebase";
import { Router } from "@mui/icons-material";
import { useRouter } from "next/navigation";

export default function EditCategory({ params }: { params: { id: string } }) {
  const id = params.id;
  const [currentCategory, setCurrentCategory] = useState<DocumentData | null>(
    null
  );
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const docRef = doc(db, "categories", `categoryId${id}`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setCurrentCategory(docSnap.data());
        } else {
          console.log("No such document!");
        }
      }
    };
    fetchData();
  }, [id]);

  const updateCategory = async () => {
    if (id && currentCategory) {
      const docRef = doc(db, "categories", `categoryId${id}`);
      await updateDoc(docRef, {
        name: currentCategory.name,
      });
    }
    router.push("/admin");
  };

  return (
    <div>
      <h1>Edit Category: {id}</h1>
      <TextField
        label="Category Name"
        value={currentCategory?.name || ""}
        onChange={(e) =>
          setCurrentCategory({ ...currentCategory, name: e.target.value })
        }
      />
      <Button variant="contained" color="primary" onClick={updateCategory}>
        Update
      </Button>
    </div>
  );
}
