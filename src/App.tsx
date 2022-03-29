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
        <Route path="/house/:id" element={<House />} />
        <Route path="/*" element={<CharactersList />} />
      </Routes>
    </Container>
  );
}

export default App;
