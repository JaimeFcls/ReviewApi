import React from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const imagesURL = import.meta.env.VITE_IMG;

const SeriesCard = ({ series, showLink = true }) => {
  return (
    <div className="series-card">
      <img src={imagesURL + series.poster_path} alt={series.name} />
      <h3>{series.name}</h3>
      <p>
        <FaStar /> {series.vote_average}
      </p>
      {showLink && <Link to={`/tv/${series.id}`}>Detalhes</Link>}
    </div>
  );
};

export default SeriesCard;
