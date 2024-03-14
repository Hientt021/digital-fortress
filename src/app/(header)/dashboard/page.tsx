"use client";
import DataTable from "@/components/DataTable";
import { Stack, TextField } from "@mui/material";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import * as React from "react";

export interface IDashboardProps {}

export default function Dashboard(props: IDashboardProps) {
  const [list, setList] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [searchList, setSearchList] = React.useState([]);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "last_accessed", headerName: "Last Accessed", flex: 1 },
    { field: "project_domain", headerName: "Project Domain", flex: 1 },
    {
      field: "project_name",
      headerName: "Project Name",
      flex: 1,
    },
    {
      field: "license_use",
      headerName: "License Use",
      flex: 1,
      renderCell: (params: GridRenderCellParams<any>) => (
        <div>
          {params.value.map((el: string) => (
            <p>{el}</p>
          ))}
        </div>
      ),
    },
  ];

  const getData = async () => {
    let headers = new Headers();
    const token = localStorage.getItem("TOKEN");
    headers.append("Authorization", "Bearer " + token);
    headers.append("Content-Type", "application/json");

    const url = "https://frontend-exam.digitalfortress.dev/projects";
    const res = await fetch(url, {
      headers,
    });
    const data = await res.json();
    if (data) {
      console.log(data);
      const formattedData = data.results.map((el: any) => formatData(el));
      console.log(formattedData);
      setList(formattedData);
    }
  };

  const formatData = (data: any) => {
    const arr: string[] = [];
    data.license_use.forEach((el: any) => {
      let license_type = el.license_type + ": ";
      el.libraries.forEach((lib: string, i: number) => {
        if (i) license_type += ", ";
        license_type += lib;
      });
      arr.push(license_type);
    });

    return {
      ...data,
      license_use: arr,
    };
  };

  const onSearch = (e: any) => {
    const value = e.target.value as string;
    const newList = list.filter((el) => {
      let result = false;
      const keys = Object.keys(el);
      keys.forEach((key) => {
        const keyValue = el[key] as any;
        const isArray = Array.isArray(keyValue);
        if (isArray) {
          const array = keyValue as string[];
          const includesStr = array.find((str) => str.includes(value));
          if (includesStr) result = true;
        } else {
          const string = keyValue ? keyValue.toString() : "";
          if (string.includes(value)) result = true;
        }
      });
      return result;
    });
    setSearchList(newList);
    setSearch(value);
  };

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <Stack className="p-10" spacing={2}>
      <TextField label="Search" onChange={onSearch} fullWidth />
      {!!list.length && (
        <DataTable rows={search ? searchList : list} columns={columns} />
      )}
    </Stack>
  );
}
