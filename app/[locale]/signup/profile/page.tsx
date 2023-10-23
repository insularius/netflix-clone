import SignupFormProfile from "@/app/components/signupForms/signupFormProfile";
import { store } from "@/app/redux/store/store";
import React from "react";
import { Provider } from "react-redux";

const page = () => {
  return <SignupFormProfile />;
  // return <div>PROFILE</div>;
};

export default page;
