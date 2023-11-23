import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import Home from "./pages/Home";
import Movie from "./pages/Movie";
import Search from "./pages/Search";
import Series from "./pages/Series";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Profile from "./pages/Profile";
import "./index.css";
//import Categorias from "./pages/Categorias";
import CategoryPage from "./pages/CategoryPage";
import SeriesCategoryPage from "./pages/SeriesCategoryPage"; // Importe a nova página de categoria de séries

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route path="/" element={<Home />} />
          <Route path="movie/:id" element={<Movie />} />
          <Route path="tv/:id" element={<Series />} />
          <Route path="search" element={<Search />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/category/movie/:id" element={<CategoryPage />} /> // Adicione 'movie' ao caminho da rota
          <Route path="/category/tv/:id" element={<SeriesCategoryPage />} /> // Adicione uma nova rota para a página de categoria de séries
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
