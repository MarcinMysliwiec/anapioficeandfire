import { TableCell } from "@mui/material";
import React from "react";
import ICharacterData from "../types/Character";

type Props = {
  children: ICharacterData;
};

function CultureCell({ children }: Props) {
  const cultureGetter = (culture: string) => {
    return culture || "Unknown";
  };
  return <TableCell>{cultureGetter(children.culture)}</TableCell>;
}

export default CultureCell;
