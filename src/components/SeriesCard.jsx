import React from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const imagesURL = import.meta.env.VITE_IMG;

const SeriesCard = ({ series, showLink = true }) => {
  return (
    <div className="series-card">
      <Link to={`/tv/${series.id}`}>
      <img src={imagesURL + series.poster_path} alt={series.name} />
      </Link>
      <Link to={`/tv/${series.id}`}>
      <h3>{series.name}</h3>
      </Link>
      <p>
        <FaStar /> {series.vote_average}
      </p>
      
    </div>
  );
};

export default SeriesCard;
