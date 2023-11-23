import React from "react";
import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import SeriesCard from "../components/SeriesCard";
import "./Home.css";
import "./MoviesGrid.css";
import "./SeriesGrid.css";
import { getUser } from "../components/getUser";
import SideBarFilter from "../components/SideBarFilter"; // Importe o novo componente de barra lateral de filtro

const apiKey = "791c3bfe596fc2bb2d59d0d8bafe1367"; // Sua chave de API TMDb

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularSeries, setPopularSeries] = useState([]);

  const getPopularMovies = async () => {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=pt-BR`; // Adicione o parâmetro language=pt-BR
    try {
      const res = await fetch(url);
      const data = await res.json();
      setPopularMovies(data.results);
    } catch (error) {
      console.error("Erro ao obter filmes populares:", error);
    }
  };

  const getPopularSeries = async () => {
    const url = `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=pt-BR`; // Adicione o parâmetro language=pt-BR
    try {
      const res = await fetch(url);
      const data = await res.json();
      setPopularSeries(data.results);
    } catch (error) {
      console.error("Erro ao obter séries populares:", error);
    }
  };

  useEffect(() => {
    getPopularMovies();
    getPopularSeries();
  }, []);

  const user = getUser();

  return (
    <div className="home-container">

      <div className="content-container">
        <h2 className="title">Filmes Populares</h2>
        <hr />
        <div className="movies-container">
          {popularMovies.length > 0 &&
            popularMovies.slice(0, 18).map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>

        <h2 className="title">Séries Populares</h2>
        <hr />

        <div className="series-container">
          {popularSeries.length > 0 &&
            popularSeries.slice(0, 18).map((series) => (
              <SeriesCard key={series.id} series={series} />
            ))}
        </div>
      </div>
      <SideBarFilter /> {/* Renderize o componente SideBarFilter à esquerda da lista de filmes e séries */}
    </div>
  );
};

export default Home;
