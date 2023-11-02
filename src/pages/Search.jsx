import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import SeriesCard from "../components/SeriesCard";

const VITE_API_KEY = import.meta.env.VITE_API_KEY;
const VITE_SEARCH = import.meta.env.VITE_SEARCH;
const VITE_SEARCH_TV = import.meta.env.VITE_SEARCH_TV;
const VITE_LANGUAGE = import.meta.env.VITE_LANGUAGE;

import "./MoviesGrid.css";
import "./Search.css";

const Search = () => {
  const [searchParams] = useSearchParams();

  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const query = searchParams.get("q");

  const getSearchedMoviesAndSeries = async (urlMovies, urlSeries) => {
    const resMovies = await fetch(urlMovies);
    const dataMovies = await resMovies.json();
    setMovies(dataMovies.results);

    const resSeries = await fetch(urlSeries);
    const dataSeries = await resSeries.json();
    setSeries(dataSeries.results);
  };

  useEffect(() => {
    const searchWithQueryURLMovies = `${VITE_SEARCH}?${VITE_API_KEY}&query=${query}&language=${VITE_LANGUAGE}`;
    const searchWithQueryURLSeries = `${VITE_SEARCH_TV}?${VITE_API_KEY}&query=${query}&language=${VITE_LANGUAGE}`;
    getSearchedMoviesAndSeries(searchWithQueryURLMovies, searchWithQueryURLSeries);
  }, [query]);

  return (
    <div className="container">
      <h2 className="title">
        Resultados para: <span className="query-text">{query}</span>
      </h2>
      <div className="results-container">
        {movies.length > 0 &&
          movies.slice(0, 18).map((movie) =>
            <MovieCard key={movie.id} movie={movie} />
          )}
        {series.length > 0 &&
          series.slice(0, 18).map((serie) =>
            <SeriesCard key={serie.id} series={serie} />
          )}
      </div>
    </div>
  );
};

export default Search;
