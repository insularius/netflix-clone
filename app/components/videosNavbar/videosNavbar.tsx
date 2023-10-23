import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Link,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/NotificationsOutlined";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import React from "react";
import { Category } from "@/app/types/firebase";
import Image from "next/image";

type Props = {
  categories: Category[];
  onCategoryClick: (categoryId: number) => void;
};

const VideosNavbar: React.FC<Props> = ({ categories, onCategoryClick }) => {
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar
        sx={{
          justifyContent: "space-between",
          margin: "10px 16px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Link href="/">
            <Image src="/images/logo.png" alt="logo" width={150} height={40} />
          </Link>
          <Box marginLeft={4} display="flex" alignItems="center">
            {categories.map((category) => (
              <Typography
                variant="h6"
                component="div"
                key={category.id}
                marginLeft={2}
                onClick={() => onCategoryClick(category?.id)}
                sx={{
                  cursor: "pointer",
                  color: "gray",
                  ":hover": { color: "white" },
                }}
              >
                {category.name}
              </Typography>
            ))}
          </Box>
        </Box>
        <Box display="flex" alignItems="center">
          <IconButton sx={{ color: "white" }}>
            <SearchIcon />
          </IconButton>
          <IconButton sx={{ color: "white" }}>
            <NotificationsIcon />
          </IconButton>
          <IconButton sx={{ color: "white" }}>
            <AccountBoxIcon fontSize="large" />
            <ArrowDropDownIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default VideosNavbar;
