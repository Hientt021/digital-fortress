import { ToggleButton } from "@mui/material";
import * as React from "react";
import CheckIcon from "@mui/icons-material/Check";
export interface ILanguageToggleProps {}

export default function LanguageToggle(props: ILanguageToggleProps) {
  const [selected, setSelected] = React.useState(false);
  return (
    <ToggleButton
      value="check"
      selected={selected}
      onChange={() => {
        setSelected(!selected);
      }}
    >
      <CheckIcon />
    </ToggleButton>
  );
}
