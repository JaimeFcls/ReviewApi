import React from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const imagesURL = import.meta.env.VITE_IMG;
const defaultImageURL = '/imagempadrao.png';
const SeriesCard = ({ series }) => {
  const posterURL = series.poster_path ? imagesURL + series.poster_path : defaultImageURL;

  return (
    <div className="series-page">
      <Link to={`/tv/${series.id}`}>
        <img src={posterURL} alt={series.name} />
      </Link>
      <Link to={`/tv/${series.id}`}>
        <h3>{series.name}</h3>
      </Link>
      <p className="estrela">
        <FaStar /> {series.vote_average}
      </p>
    </div>
  );
};

export default SeriesCard;
