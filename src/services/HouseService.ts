import http from "../helpers/http-common-anapioficeandfire";
import IHouseData from "../types/House";
import { getIndexFromURL } from "../helpers/string";

const get = (id: string): Promise<IHouseData> => {
  return http.get<IHouseData>(`/houses/${id}`).then((response) => {
    const result: IHouseData = {
      ...response.data,
      id: getIndexFromURL(response.data.url).toString(),
    };
    return result;
  });
};

const HouseService = {
  get,
};

export default HouseService;
