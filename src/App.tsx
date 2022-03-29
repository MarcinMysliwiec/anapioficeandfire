import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

import { Container } from "@mui/material";
import CharactersList from "./components/CharactersList";
import House from "./components/House";

const style = {
  container: {
    padding: "5rem 0",
  },
};

function App() {
  return (
    <Container sx={style.container}>
      <Routes>
        <Route path="/" element={<CharactersList />} />
        <Route path="/:id" element={<House />} />
      </Routes>
    </Container>
  );
}

export default App;
