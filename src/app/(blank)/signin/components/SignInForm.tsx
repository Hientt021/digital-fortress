"use client";
import { Button, Stack, TextField, Typography } from "@mui/material";
import Link from "next/link";
import * as React from "react";
import { useRouter } from "next/navigation";
export interface ISignInProps {}

export default function SignIn(props: ISignInProps) {
  const router = useRouter();
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(false);
  const onSubmit = async () => {
    const url = "https://frontend-exam.digitalfortress.dev/auth/login";
    const res = await fetch(url, {
      body: JSON.stringify({
        email: userName,
        password: password,
      }),
      method: "POST",
    });
    const data = await res.json();
    if (data && data.access_token) {
      localStorage.setItem("TOKEN", data.access_token);
      localStorage.setItem("REFRESH_TOKEN", data.refresh_token);

      router.push("/dashboard");
    } else {
      setError(true);
    }
  };

  return (
    <Stack>
      <Typography className="text-center">Welcome</Typography>
      <Typography className="text-center">Sign in to continue</Typography>

      <Stack spacing={2} mt={2}>
        <TextField
          label="User Name"
          onChange={(e) => setUserName(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="outlined" onClick={onSubmit}>
          Submit
        </Button>
        {error && <Typography>Wrong user name or password</Typography>}
      </Stack>
    </Stack>
  );
}
