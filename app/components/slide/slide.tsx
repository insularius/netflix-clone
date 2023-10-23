"use client";
import React from "react";
import Image from "next/image";
import { Box } from "@mui/material";
import "../slide/style.css";
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
    <Box className="container">
      {slideImages.map((slide, index) => {
        return (
          <Box key={index} className="slide">
            <img
              src={slide.image}
              alt=""
              style={{ width: "100vw", height: "100vh", objectFit: "cover" }}
            />
          </Box>
        );
      })}
    </Box>
  );
}
