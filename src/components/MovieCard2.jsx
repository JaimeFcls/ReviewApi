import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import './moviecard2.css';

const imagesURL = import.meta.env.VITE_IMG;

const MovieCard2 = ({ movie, showLink = true }) => {
    const posterURL = movie.poster_path ? `${imagesURL}${movie.poster_path}` : null;
    const onError = (e) => {
        if (e.target.src !== 'imagempadrao.png') {
            e.target.src = 'imagempadrao.png';
        }
    };
    return (
        <div style={{ width: "324px", height: "585px" }} className="movie-card">
            <Link to={`/movie/${movie.id}`}>
                <img style={{ width: "324px", height: "486px" }} src={posterURL} alt={movie.title} onError={onError} />
            </Link>
            <Link to={`/movie/${movie.id}`}>
                <h3 className="title-lista" style={{marginBottom : "45px"}}>{movie.title}</h3>
            </Link>
            
        </div>
    );
};

export default MovieCard2;
