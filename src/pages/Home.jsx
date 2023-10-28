import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import SeriesCard from "../components/SeriesCard";

import "./MoviesGrid.css";
import "./SeriesGrid.css";

const apiKey = "791c3bfe596fc2bb2d59d0d8bafe1367"; // Sua chave de API TMDb

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularSeries, setPopularSeries] = useState([]);

  const getPopularMovies = async () => {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      setPopularMovies(data.results);
    } catch (error) {
      console.error("Erro ao obter filmes populares:", error);
    }
  };

  const getPopularSeries = async () => {
    const url = `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}`;
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

  return (
    
    <div className="container">
      <h2 className="title">Filmes Populares:</h2>
      <h3>Login</h3>
      <h2 className="title">Melhores filmes:</h2>
      <div className="movies-container">
        {popularMovies.length > 0 &&
          popularMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
      </div>
      <h2 className="title">Séries Populares:</h2>
      <div className="series-container">
        {popularSeries.length > 0 &&
          popularSeries.map((series) => (
            <SeriesCard key={series.id} series={series} />
          ))}
      </div>
    </div>
  );
};

export default Home;
