import React from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const imagesURL = import.meta.env.VITE_IMG;

const SeriesCard = ({ series }) => {
    return (
        <div className="series-card">
            <img src={imagesURL + series.poster_path} alt={series.title} />
            <h2>{series.name}</h2> {/* Deve ser "name" em vez de "title" para séries de TV */}
            <p>
                <FaStar /> {series.vote_average}
            </p>
            <Link to={`/tv/${series.id}`}>Detalhes</Link>
        </div>
    );
};

export default SeriesCard;
