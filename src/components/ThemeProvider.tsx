"use client";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { useCallback, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Box } from "@mui/material";

export default function MuiThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const themeQuery = searchParams.get("theme");
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );
  useEffect(() => {
    if (!themeQuery)
      router.push(pathname + "?" + createQueryString("theme", "light"));
  }, [themeQuery]);

  const darkMode = createTheme({
    palette: {
      mode: "dark",
    },
    typography: {
      allVariants: "#fff" as any,
    },
  });

  const lightMode = createTheme({
    palette: {
      mode: "light",
    },
    typography: {
      allVariants: "#000" as any,
    },
  });
  const theme = themeQuery === "dark" ? darkMode : lightMode;

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
