import { TableCell } from "@mui/material";
import React from "react";
import ICharacterData from "../types/Character";
import {
  containStringInsensitive,
  findNumber,
  removeSubstring,
} from "../helpers/string";

type Props = {
  children: ICharacterData;
};
function AliveCell({ children }: Props) {
  const aliveGetter = (character: ICharacterData) => {
    const { born, died } = character;
    if (!born && !died) return "Unknown";
    if (!born) return "No";
    if (born && !died) return "Yes";

    const bornFirstDate = findNumber(born);
    let bornSecondDate = null;
    if (bornFirstDate) {
      // If in between
      if (containStringInsensitive(born, "ac or")) {
        bornSecondDate = findNumber(
          removeSubstring(born, String(bornFirstDate)),
        );
      }
    }

    // Find first number
    const diedFirstDate = findNumber(died);
    let diedSecondDate = null;
    if (diedFirstDate) {
      // If in between
      if (containStringInsensitive(died, "between")) {
        diedSecondDate = findNumber(
          removeSubstring(died, String(diedFirstDate)),
        );
      }
    }

    if (bornFirstDate) {
      if (bornSecondDate) {
        if (diedFirstDate) {
          if (diedSecondDate) {
            return `No, died between age of ${
              diedFirstDate - bornSecondDate
            } - ${diedSecondDate - bornFirstDate} years old`;
          }
          return `No, died between age of ${diedFirstDate - bornFirstDate} - ${
            diedFirstDate - bornSecondDate
          } years old`;
        }
      }

      if (diedFirstDate) {
        if (diedSecondDate) {
          return `No, died between age of ${diedFirstDate - bornFirstDate} - ${
            diedSecondDate - bornFirstDate
          } years old`;
        }
        return `No, died at ${diedFirstDate - bornFirstDate} years old`;
      }
    }

    return "Unknown";
  };

  return <TableCell>{aliveGetter(children)}</TableCell>;
}

export default AliveCell;
