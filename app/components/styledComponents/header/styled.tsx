import { styled } from "@mui/system";
import { Button, FormControl } from "@mui/material";

export const StartButton = styled(Button)`
  width: 210px;
  height: 56px;
  border: 0;
  outline: 0;
  background: #db0001;
  color: #fff;
  font-weight: 600;
  padding: 12px 24px;
  font-size: 18px;
  border-radius: 4px;
  margin-left: 8px;
  cursor: pointer;
`;
export const SignInButton = styled(Button)`
  width: 76px;
  height: 32px;
  border: 0;
  outline: 0;
  background: #db0001;
  color: #fff;
  font-size: 12px;
  border-radius: 4px;
  cursor: pointer;
  &:hover: {
    backgroundcolor: currentTheme.palette.primary.dark;
  }
  ,
  backgroundColor: currentTheme.palette.primary.main,
  @media (max-width: 768px) {
    background: red;
    width: 20px;
  }
`;
export const Form = styled(FormControl)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  // margin: auto;
  margin-top: 20px;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;
