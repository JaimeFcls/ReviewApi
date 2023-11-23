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
import NotFound from "./pages/NotFound"; // Importe a nova página NotFound
import "./index.css";
import CategoryPage from "./pages/CategoryPage";
import SeriesCategoryPage from "./pages/SeriesCategoryPage";

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
          <Route path="/category/movie/:id" element={<CategoryPage />} />
          <Route path="/category/tv/:id" element={<SeriesCategoryPage />} />
          <Route path="*" element={<NotFound />} /> {/* Rota padrão */}
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
