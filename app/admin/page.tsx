"use client";
import {
  collection,
  setDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import db from "@/app/lib/firebase";
import { QuerySnapshot, DocumentData } from "firebase/firestore";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Link,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Episode, Show } from "../types/firebase";
import styles from "../admin/styles.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store/store";
import { useRouter } from "next/navigation";
const AdminPanel = () => {
  const [categories, setCategories] = useState<DocumentData[]>([]);
  const [newCategory, setNewCategory] = useState<string>("");
  const [newCategoryID, setNewCategoryID] = useState<string>("");
  const [isCategoriesExpanded, setCategoriesExpanded] = useState(false);
  const [isEpisodesExpanded, setEpisodesExpanded] = useState(false);
  const [shows, setShows] = useState<Show[]>([]);
  const [selectedShowId, setSelectedShowId] = useState<string | null>(null);
  const [selectedSeason, setSelectedSeason] = useState<string | null>(null);
  const [episodesData, setEpisodesData] = useState<Episode[]>([]);
  const [videoData, setVideoData] = useState<Show | null>(null);
  const [expandedSeason, setExpandedSeason] = useState<string | null>(null);
  const { role } = useSelector((state: RootState) => state.auth);
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

  useEffect(() => {
    const fetchShows = async () => {
      const showsSnapshot = await getDocs(collection(db, "shows"));
      const fetchedShows: Show[] = [];
      showsSnapshot.forEach((doc) => {
        const showData = doc.data() as Show;
        fetchedShows.push(showData);
      });
      setShows(fetchedShows);
    };
    fetchShows();
  }, []);

  useEffect(() => {
    const fetchVideoData = async () => {
      if (!selectedShowId) return;
      const videoDocRef = doc(db, "shows", `showId${selectedShowId}`);
      const videoSnapshot = await getDoc(videoDocRef);
      if (videoSnapshot.exists()) {
        setVideoData(videoSnapshot.data() as Show);
      }
    };
    fetchVideoData();
  }, [selectedShowId]);

  useEffect(() => {
    const fetchEpisodesData = async () => {
      setEpisodesData([]);

      if (!selectedShowId || !selectedSeason) return;
      const episodesCollectionRef = collection(
        db,
        `shows/showId${selectedShowId}/seasons/${selectedSeason}/episodes`
      );
      const episodesSnapshot = await getDocs(episodesCollectionRef);

      const episodes: Episode[] = [];
      episodesSnapshot.forEach((doc) => {
        const episodeData = doc.data() as Episode;
        episodes.push(episodeData);
      });
      setEpisodesData(episodes.filter((ep) => Object.keys(ep).length > 0));
    };
    fetchEpisodesData();
  }, [selectedShowId, selectedSeason]);

  const addNewCategory = async () => {
    const idNumber = parseInt(newCategoryID.replace(/[^\d]/g, ""), 10);
    const docRef = doc(db, "categories", `categoryId${newCategoryID}`);
    await setDoc(docRef, {
      id: idNumber,
      name: newCategory,
    });
  };

  const updateCategory = async (id: number, updatedName: string) => {
    const docRef = doc(db, "categories", `categoryId${id}`);
    await updateDoc(docRef, { name: updatedName });
  };

  const deleteCategory = async (id: number) => {
    const docRef = doc(db, "categories", `categoryId${id}`);
    await deleteDoc(docRef);
  };

  const handleDelete = (categoryId: number) => {
    if (
      typeof window !== "undefined" &&
      window.confirm("Are you sure you want to delete this category?")
    ) {
      deleteCategory(categoryId)
        .then(() => {
          const updatedCategories = categories.filter(
            (cat) => cat.id !== categoryId
          );
          setCategories(updatedCategories);
        })
        .catch((error) => {
          console.error("Error deleting category: ", error);
        });
    }
  };

  const handleAccordionToggle = (season: string) => {
    if (expandedSeason === season) {
      setExpandedSeason(null);
    } else {
      setExpandedSeason(season);
    }
  };

  const editEpisode = async (
    episodeId: number,
    updatedData: Partial<Episode>
  ) => {
    const paddedEpisodeId = String(episodeId).padStart(2, "0");
    const docRef = doc(
      db,
      `shows/showId${selectedShowId}/seasons/${selectedSeason}/episodes/E${paddedEpisodeId}`
    );
    await updateDoc(docRef, updatedData);
  };

  const deleteEpisode = async (episodeId: number) => {
    const paddedEpisodeId = String(episodeId).padStart(2, "0");
    const docRef = doc(
      db,
      `shows/showId${selectedShowId}/seasons/${selectedSeason}/episodes/E${paddedEpisodeId}`
    );
    await deleteDoc(docRef);
  };

  const handleDeleteEpisode = (episodeId: number) => {
    if (
      typeof window !== "undefined" &&
      window.confirm("Are you sure you want to delete this episode?")
    ) {
      deleteEpisode(episodeId)
        .then(() => {
          const updatedEpisodes = episodesData.filter(
            (ep) => ep.id !== episodeId
          );
          setEpisodesData(updatedEpisodes);
        })
        .catch((error) => {
          console.error("Error deleting episode: ", error);
        });
    }
  };

  useEffect(() => {
    console.log(episodesData);
  }, [episodesData]);

  if (role === "user" && typeof window !== "undefined") {
    router.push("/404");
    return;
  }

  return (
    <div>
      <h1>Admin Panel</h1>

      <Accordion
        expanded={isCategoriesExpanded}
        onChange={() => setCategoriesExpanded(!isCategoriesExpanded)}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Categories</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            <Button
              variant="contained"
              color="primary"
              href="/admin/create-category"
            >
              Create Category
            </Button>

            {categories.map((category, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={`${category.name} (id: ${category.id})`}
                />
                <Link href={`/admin/edit-category/${category.id}`}>
                  <Button variant="contained" color="primary">
                    Edit
                  </Button>
                </Link>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleDelete(category.id)}
                >
                  Delete
                </Button>
              </ListItem>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={isEpisodesExpanded}
        onChange={() => setEpisodesExpanded(!isEpisodesExpanded)}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Shows</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            <Button
              variant="contained"
              color="primary"
              href="/admin/create-show"
            >
              Create Show
            </Button>
            {shows.map((show) => (
              <Accordion key={show.id}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  onClick={() => setSelectedShowId(show.id.toString())}
                >
                  <Typography>{show.title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {[...Array(show.seasons)].map((_, index) => (
                    <Accordion
                      key={index}
                      expanded={expandedSeason === `S${index + 1}`}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        onClick={() => {
                          handleAccordionToggle(`S${index + 1}`);
                          setSelectedSeason(`S${index + 1}`);
                        }}
                      >
                        <Typography>{`Season ${index + 1}`}</Typography>
                      </AccordionSummary>
                      <AccordionDetails
                        className={
                          episodesData.length
                            ? styles.has_content
                            : styles.no_content
                        }
                      >
                        <List>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                              typeof window !== "undefined" &&
                                router.push(
                                  `/admin/create-episode/${selectedShowId}/${selectedSeason}`
                                );
                            }}
                          >
                            Create New Episode
                          </Button>
                          {episodesData.map((episode, index) => (
                            <ListItem
                              key={index}
                              sx={{
                                justifyContent: "space-between",
                              }}
                            >
                              <Typography>
                                {index + 1}) {episode.title}
                              </Typography>
                              <Box sx={{ display: "flex", gap: "10px" }}>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  onClick={() => {
                                    alert(
                                      `Selected Show ID: ${selectedShowId}, Selected Season: ${selectedSeason}`
                                    );
                                    typeof window !== "undefined" &&
                                      router.push(
                                        `/admin/edit-episode/${selectedShowId}/${selectedSeason}/${episode.id}`
                                      );
                                  }}
                                >
                                  Edit
                                </Button>

                                <Button
                                  variant="contained"
                                  color="secondary"
                                  onClick={() =>
                                    handleDeleteEpisode(episode.id)
                                  }
                                >
                                  Delete
                                </Button>
                              </Box>
                            </ListItem>
                          ))}
                        </List>
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </AccordionDetails>
              </Accordion>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default AdminPanel;
