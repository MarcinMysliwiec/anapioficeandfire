import React, { useEffect, useState } from "react";
import CharacterDataService from "../services/CharacterService";
import ICharacterData from "../types/Character";
import { PaginateProps } from "../types/Props";

// const TutorialsList: React.FC = () => {

function CharactersList() {
  const [characters, setCharacters] = useState<Array<ICharacterData>>([]);

  const retrieveCharacters = (props: PaginateProps) => {
    CharacterDataService.paginate(props)
      .then((data: ICharacterData[]) => {
        setCharacters(data);
        console.log(data);
      })
      .catch((e: Error) => {
        console.error(e);
      });
  };

  useEffect(() => {
    retrieveCharacters({ page: 2, pageSize: 20 });
  }, []);

  return (
    <div className="list row">
      <div className="col-md-6">
        <h4>Tutorials List</h4>

        {characters &&
          characters.map((character) => (
            <div key={character.id} role="presentation">
              {character.id} {character.name}
            </div>
          ))}
      </div>
    </div>
  );
}

export default CharactersList;
