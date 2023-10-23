"use client";
import styles from "../slider/slider.module.scss";
import Image from "next/image";
import { Box } from "@mui/material";
export default function Slider() {
  const slideImages = [
    {
      image: "/images/witcher_cover.webp",
    },
    {
      image: "/images/witcher-cover.webp",
    },
    {
      image: "/images/witcher-login.webp",
    },
  ];

  return (
    <Box
      className={styles.slider}
      sx={{
        overflowX: "scroll",
        scrollSnapType: "x mandatory",
        width: "100%",
        display: "flex",
      }}
    >
      <Box className={styles.slides}>
        {slideImages.map((slide, index) => {
          return (
            <Box
              key={index}
              sx={{ height: "100vh", width: "100%", scrollSnapAlign: "start" }}
            >
              <Image
                src={slide.image}
                alt=""
                width={700}
                height={700}
                style={{ width: "100vw", height: "100vh", objectFit: "cover" }}
              />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
