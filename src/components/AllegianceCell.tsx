import { TableCell } from "@mui/material";
import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import ICharacterData from "../types/Character";
import { getIndexFromURL } from "../helpers/string";

const style = {
  link: {
    display: "block",
    padding: "0.25rem",
  },
};

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
            <Link
              style={style.link}
              to={{
                pathname: `/house/${allegianceId.toString()}`,
              }}
              key={`character${
                character.id || 0
              }-allegiance${allegianceId.toString()}`}
            >
              {allegianceId.toString()}
            </Link>
          );
        })}
      </div>
    );
  };

  return <TableCell>{allegiancesGetter(children)}</TableCell>;
}

export default AllegianceCell;
