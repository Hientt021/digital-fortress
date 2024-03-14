"use client";
import { Button, ToggleButton } from "@mui/material";
import * as React from "react";
import CheckIcon from "@mui/icons-material/Check";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
export interface IModeToggleProps {}

export default function ModeToggle(props: IModeToggleProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const themeQuery = searchParams.get("theme");
  const [selected, setSelected] = React.useState(false);
  const createQueryString = React.useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );
  return (
    <Button
      onClick={() => {
        router.push(
          pathname +
            "?" +
            createQueryString("theme", themeQuery === "dark" ? "light" : "dark")
        );
      }}
    >
      {themeQuery === "dark" ? <DarkModeIcon /> : <LightModeIcon />}
    </Button>
  );
}
