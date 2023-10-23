import React, { FC } from "react";
import { Select, MenuItem, Box, FormControl } from "@mui/material";
import { useRouter } from "next-intl/client";
import { usePathname } from "next-intl/client";
// import styles from "./styles.module.css";
import styles from "../header/styles.module.scss";
import LngIcon from "../svg/lngSvg";
type Props = {
  locale: string;
};

const LanguageSelector: FC<Props> = ({ locale }) => {
  const router = useRouter();
  const pathname = usePathname();
  const languageMap = {
    en: "English",
    kz: "Qazaq",
  };

  const handleChange = (e: any) => {
    router.push(pathname, { locale: e.target.value });
  };

  return (
    <FormControl>
      <Select
        labelId="language-select-label"
        id="language-select"
        name="language"
        value={locale}
        className={styles.select}
        onChange={handleChange}
        sx={{
          color: "white",
          font: "inherit",
          "& .MuiSvgIcon-root": {
            fill: "white",
          },
        }}
        renderValue={(value) => (
          <Box
            sx={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
            }}
          >
            <LngIcon />
            <Box
              component="span"
              marginLeft="5px"
              className={styles.languageTextLabel}
            >
              {(languageMap as { [key: string]: string })[value]}
            </Box>
          </Box>
        )}
      >
        <MenuItem value="en">English</MenuItem>
        <MenuItem value="kz">Qazaq</MenuItem>
      </Select>
    </FormControl>
  );
};

export default LanguageSelector;
