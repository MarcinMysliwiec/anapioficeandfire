import { Box, Grid, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import HouseService from "../services/HouseService";
import IHouseData from "../types/House";
// import HouseItem from "./HouseItem";

const style = {
  paper: {
    maxWidth: "768px",
    margin: "0 auto",
    padding: "1rem",
  },
};

const initialHouseState: IHouseData = {
  id: "",
  url: "",
  name: "",
  region: "",
  coatOfArms: "",
  words: "",
  titles: [],
  seats: [],
  currentLord: "",
  heir: "",
  overlord: "",
  founded: "",
  founder: "",
  diedOut: "",
  ancestralWeapons: [],
  cadetBranches: [],
  swornMembers: [],
};

// const displayedData = [
//   {
//     key: "name",
//     title: "Name of the House",
//   },
//   {
//     key: "region",
//     title: "Region",
//   },
//   {
//     key: "coatOfArms",
//     title: "Coat of Arms",
//   },
//   {
//     key: "words",
//     title: "Words",
//   },
//   {
//     key: "titles",
//     title: "Titles",
//   },
//   {
//     key: "seats",
//     title: "Seats",
//   },
//   {
//     key: "diedOut",
//     title: "Has died out",
//   },
//   {
//     key: "overlord",
//     title: "Has overlord",
//   },
//   {
//     key: "cadetBranches",
//     title: "Number of Cadet Branches",
//     getter: (param: string[]) => {
//       return param.length + 1;
//     },
//   },
// ];

type Params = {
  id: string;
};

function House() {
  const { id } = useParams<Params>();

  const [currentHouse, setCurrentHouse] =
    useState<IHouseData>(initialHouseState);

  const getHouse = (paramId: string) => {
    HouseService.get(paramId)
      .then((data: IHouseData) => {
        setCurrentHouse(data);
      })
      .catch((e: Error) => {
        console.error(e);
      });
  };

  useEffect(() => {
    if (id) getHouse(id);
  }, [id]);

  return (
    <Paper sx={style.paper}>
      <Grid container spacing={2}>
        {/* {displayedData.map((el) => {
          if (el.getter) {
            return (
              <HouseItem key={el.key} title={el.title} getter={el.getter}>
                asd
              </HouseItem>
            );
          }
          return (
            <HouseItem key={el.key} title={el.title}>
              asd
            </HouseItem>
          );
        })} */}

        <Grid item xs={4}>
          <Box>Name of the House</Box>
        </Grid>
        <Grid item xs={8}>
          <Box>{currentHouse.name}</Box>
        </Grid>

        <Grid item xs={4}>
          <Box>Region</Box>
        </Grid>
        <Grid item xs={8}>
          <Box>{currentHouse.region !== "" ? currentHouse.region : "-"}</Box>
        </Grid>

        <Grid item xs={4}>
          <Box>Coat of Arms</Box>
        </Grid>
        <Grid item xs={8}>
          <Box>{currentHouse.coatOfArms}</Box>
        </Grid>

        <Grid item xs={4}>
          <Box>Words</Box>
        </Grid>
        <Grid item xs={8}>
          <Box>{currentHouse.words !== "" ? currentHouse.words : "-"}</Box>
        </Grid>

        <Grid item xs={4}>
          <Box>Titles</Box>
        </Grid>
        <Grid item xs={8}>
          <Box>
            {currentHouse.titles.length > 0
              ? currentHouse.titles.join(", ")
              : "-"}
          </Box>
        </Grid>

        <Grid item xs={4}>
          <Box>Seats</Box>
        </Grid>
        <Grid item xs={8}>
          <Box>
            {currentHouse.seats.length > 0
              ? currentHouse.seats.join(", ")
              : "-"}
          </Box>
        </Grid>

        <Grid item xs={4}>
          <Box>Has died out</Box>
        </Grid>
        <Grid item xs={8}>
          <Box>{currentHouse.diedOut !== "" ? currentHouse.diedOut : "No"}</Box>
        </Grid>

        <Grid item xs={4}>
          <Box>Has overlord</Box>
        </Grid>
        <Grid item xs={8}>
          <Box>{currentHouse.overlord !== "" ? "Yes" : "No"}</Box>
        </Grid>

        <Grid item xs={4}>
          <Box>Number of Cadet Branches</Box>
        </Grid>
        <Grid item xs={8}>
          <Box>{currentHouse.cadetBranches.length + 1}</Box>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default House;
