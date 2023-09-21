import React from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const imagesURL = import.meta.env.VITE_IMG;

const SeriesCard = ({ series, showLink = true }) => {
  return (
    <div className="series-card">
      <img src={imagesURL + series.poster_path} alt={series.name} />
      <h2>{series.name}</h2>
      <p>
        <FaStar /> {series.vote_average}
      </p>
      {showLink && <Link to={`/series/${series.id}`}>Detalhes</Link>}
    </div>
  );
};

export default SeriesCard;
