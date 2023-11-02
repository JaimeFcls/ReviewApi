import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import "./MovieCard.css";

const imagesURL = import.meta.env.VITE_IMG;

const MovieCard = ({ movie, showLink = true }) => {
  return (
    <div className="movie-card">

      <Link to={`/movie/${movie.id}`}>
        <img src={imagesURL + movie.poster_path} alt={movie.title} />
      </Link>

      <Link to={`/movie/${movie.id}`}>
        <h3>{movie.title}</h3>
      </Link>
      <p>
        <FaStar /> {movie.vote_average }
      </p>
    </div>
  );
};

export default MovieCard;
