import React, { FC } from "react";
import {
  Select,
  MenuItem,
  Box,
  FormControl,
  SelectChangeEvent,
} from "@mui/material";
import { useRouter } from "next-intl/client";
import { usePathname } from "next-intl/client";
import styles from "./styles.module.css";
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
          <Box display="flex" alignItems="center">
            <LngIcon />
            <Box component="span" marginLeft="5px">
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

{
  /* <Select
                labelId="language-select-label"
                id="language-select"
                name="language"
                value={locale}
                defaultValue={locale}
                onChange={handleChange}
                className={styles.select}
                sx={{
                  color: "white",
                  font: "inherit",
                  "& .MuiSvgIcon-root": {
                    fill: "white",
                  },
                }}
                renderValue={(value) => (
                  <Box display="flex" alignItems="center">
                    <LngIcon />
                    <Box component="span" marginLeft="5px">
                      {(languageMap as { [key: string]: string })[value]}
                    </Box>
                  </Box>
                )}
              >
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="kz">Qazaq</MenuItem>
              </Select> */
}
