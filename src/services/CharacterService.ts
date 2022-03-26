import http from "../helpers/http-common-anapioficeandfire";
import ICharacterData from "../types/Character";
import { PaginateProps } from "../types/Props";

const getAll = () => {
  return http.get<Array<ICharacterData>>("/characters");
};

const paginate = ({ page, pageSize = 10 }: PaginateProps) => {
  return http
    .get<Array<ICharacterData>>("/characters/", {
      params: { page, pageSize },
    })
    .then((response) => {
      const result = response.data.map((obj) => {
        const { pathname } = new URL(obj.url);
        const id = parseInt(pathname.replace("/api/characters/", ""), 10);
        return { ...obj, id };
      });

      return result;
    });
};

const get = (id: number) => {
  return http.get<ICharacterData>(`/characters/${id}`);
};

const CharacterService = {
  getAll,
  paginate,
  get,
};

export default CharacterService;
