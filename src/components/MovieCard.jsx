import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";


const imagesURL = import.meta.env.VITE_IMG;


const MovieCard = ({ movie, showLink = true }) => {
  const posterURL = movie.poster_path ? imagesURL + movie.poster_path : './imagempadrao.png';
  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.id}`}>
        <img src={posterURL} alt={movie.title} />
      </Link>
      <Link to={`/movie/${movie.id}`}>
        <h3>{movie.title}</h3>
      </Link>
      <p>
        <FaStar /> {movie.vote_average}
      </p>
    </div>
  );
};


export default MovieCard;
