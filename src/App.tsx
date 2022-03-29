import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import "./App.css";

import { Container } from "@mui/material";
import Tutorial from "./components/Tutorial";
import TutorialsList from "./components/TutorialsList";
import CharactersList from "./components/CharactersList";

// const App: React.FC = () => {

function App() {
  return (
    <Container>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/tutorials" className="navbar-brand">
          bezKoder
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to="/tutorials" className="nav-link">
              Tutorials
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/add" className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<CharactersList />} />
          <Route path="/:id" element={<CharactersList />} />

          <Route path="/tutorials" element={<TutorialsList />} />
          <Route path="/tutorials/:id" element={<Tutorial />} />
        </Routes>
      </div>
    </Container>
  );
}

export default App;
