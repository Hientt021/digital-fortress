"use client";
import Link from "next/link";
import * as React from "react";
import LanguageToggle from "./LanguageToggle";
import ModeToggle from "./ModeToggle";
import { Fab } from "@mui/material";

export interface INavigationBarProps {}

export default function NavigationBar(props: INavigationBarProps) {
  const renderNav = (href: string) => {
    return (
      <Fab variant="extended" sx={{ textTransform: "capitalize" }}>
        <Link href={"/" + href}>{href}</Link>
      </Fab>
    );
  };
  const nav = [
    {
      id: "left",
      items: [
        {
          id: "dashboard",
          render: renderNav("dashboard"),
        },
      ],
    },
    {
      id: "right",
      items: [
        // {
        //   id: "language",
        //   render: <LanguageToggle />,
        // },
        {
          id: "mode",
          render: <ModeToggle />,
        },
      ],
    },
  ];
  return (
    <div className="flex justify-between items-center px-10 py-5">
      {nav.map((el) => (
        <div key={el.id}>{el.items.map((item) => item.render)}</div>
      ))}
    </div>
  );
}
