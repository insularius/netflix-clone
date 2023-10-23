import React from "react";
import { styled } from "@mui/system";
import { useTheme } from "@/app/theme/themeContext";
import SunIcon from "@mui/icons-material/WbSunny";
import MoonIcon from "@mui/icons-material/NightsStay";
import { Button } from "@mui/material";

const ToggleButton = styled(Button)`
  border: 1px solid gray;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 32px;
  padding: 0;
  margin-left: 10px;
  background-color: rgba(0, 0, 0, 0.3);
  &:hover {
    background-color: rgba(0, 0, 0, 0.5);
  }
  @media (max-width: 768px) {
    width: 60px;
  }
`;

const IconContainer = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
`;

const Sun = styled(SunIcon)`
  color: #ffcc00;
  @media (max-width: 768px) {
    width: 20px;
  }
`;

const Moon = styled(MoonIcon)`
  color: white;
  @media (max-width: 768px) {
    width: 20px;
  }
`;

const ToggleThemeButton = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <ToggleButton onClick={toggleTheme}>
      <IconContainer>{isDark ? <Sun /> : <Moon />}</IconContainer>
    </ToggleButton>
  );
};

export default ToggleThemeButton;
