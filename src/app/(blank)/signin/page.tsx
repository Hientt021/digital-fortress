import * as React from "react";
import SignIn from "./components/SignInForm";
import { Typography } from "@mui/material";

export interface IAppProps {}

export default function App(props: IAppProps) {
  return (
    <div className="flex  flex-col items-center justify-center p-24">
      <SignIn />
    </div>
  );
}
