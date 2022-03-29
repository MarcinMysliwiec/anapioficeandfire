import http from "../helpers/http-common-anapioficeandfire";
import ICharacterData from "../types/Character";
import { ApiParams } from "../types/Props";
import { getIndexFromURL } from "../helpers/string";

const fetch = (params: ApiParams): Promise<ICharacterData[]> => {
  return (
    http
      .get<Array<ICharacterData>>("/characters/", { params })
      // run http wrapper
      .then((response) => {
        // Retrieve id from ulr attr
        const result = response.data.map((obj) => {
          const id = getIndexFromURL(obj.url);
          return { ...obj, id };
        });
        // return overriten response to the following function
        return result;
      })
  );
};

const CharacterService = {
  fetch,
};

export default CharacterService;
