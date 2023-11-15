import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import SeriesCard from "../components/SeriesCard";
import axios from "axios";

const VITE_API_KEY = import.meta.env.VITE_API_KEY;
const VITE_SEARCH = import.meta.env.VITE_SEARCH;
const VITE_SEARCH_TV = import.meta.env.VITE_SEARCH_TV;
const VITE_LANGUAGE = import.meta.env.VITE_LANGUAGE;
const defaultImageURL = './imagempadrao.png'; 

import "./MoviesGrid.css";
import "./Search.css";

const Search = () => {
  const [searchParams] = useSearchParams();

  const [results, setResults] = useState([]);
  const query = searchParams.get("q");

  const searchTMDb = async (query) => {
    try {
      const searchURL = `${import.meta.env.VITE_SEARCH_TV_MULTI}?${import.meta.env.VITE_API_KEY}&query=${query}&language=${import.meta.env.VITE_LANGUAGE}`;
      const response = await axios.get(searchURL);

      if (response.data && response.data.results) {
        setResults(response.data.results.map(result => {
          if (!result.poster_path) {
            result.poster_path = defaultImageURL;
          }
          return result;
        }));
      }
    } catch (error) {
      console.error(error);
      
    }
  };

  useEffect(() => {
    if (query) {
      searchTMDb(query);
    }
  }, [query]);

  return (
    <div className="container">
      <h2 className="title">
        Resultados para: <span className="query-text">{query}</span>
      </h2>
      <div className="results-container">
        {results.length > 0 &&
          results.slice(0, 18).map((result) => (
            result.media_type === "movie" ? (
              <MovieCard key={result.id} movie={result} />
            ) : (
              <SeriesCard key={result.id} series={result} />
            )
          ))}
      </div>
    </div>
  );
};

export default Search;
