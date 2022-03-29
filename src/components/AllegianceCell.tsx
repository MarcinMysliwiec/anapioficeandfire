import { TableCell } from "@mui/material";
import React, { ReactElement } from "react";
import ICharacterData from "../types/Character";
import { getIndexFromURL } from "../helpers/string";

type Props = {
  children: ICharacterData;
};

function AllegianceCell({ children }: Props) {
  const allegiancesGetter = (character: ICharacterData): ReactElement => {
    const { allegiances } = character;
    if (allegiances.length === 0) return <div>No allegiances</div>;
    return (
      <div>
        {allegiances.map((url) => {
          const allegianceId = getIndexFromURL(url);
          return (
            <a
              href={url}
              key={`${character.id || 0}-${allegianceId.toString()}`}
            >
              {allegianceId.toString()}
            </a>
          );
        })}
      </div>
    );
  };

  return <TableCell>{allegiancesGetter(children)}</TableCell>;
}

export default AllegianceCell;
