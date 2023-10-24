import { styled } from "@mui/system";
import { Button, FormControl, Typography } from "@mui/material";

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
  @media (max-width: 768px) {
    width: 62%;
  }
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
  ,
  @media (max-width: 768px) {
    background: red;
    width: 20px;
  }
`;
export const Form = styled(FormControl)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 10px;
  align-items: center;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const Subtitle = styled(Typography)<{ isDark?: boolean }>`
  variant: h3;
  font-size: 1.5rem;
  font-weight: 400;
  color: white;
  margin-top: 16px;
  color: ${(props) => (props.isDark ? "#0080ff" : "#fff")};
  ${(props) => props.theme.breakpoints.down("sm")} {
    font-size: 1.1rem;
  }
`;
export const HeaderTitle = styled(Typography)<{ isDark?: boolean }>`
  margin: 0;
  font-size: 3rem;
  font-weight: 700;
  max-width: 100%;
  color: white;
  ${(props) => props.theme.breakpoints.down("sm")} {
    font-size: 2rem;
  }
`;
