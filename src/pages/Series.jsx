import React from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const Series = ({ series }) => {
    const { name, poster_path, vote_average, tagline, number_of_seasons, overview } = series;
    const imageURL = `${import.meta.env.VITE_IMG}${poster_path}`;

    return (
        <div className="series-details">
            <img src={imageURL} alt={name} />
            <h2>{name}</h2>
            <p>
                <FaStar /> {vote_average}
            </p>
            <p>{tagline}</p>
            <p>Número de Temporadas: {number_of_seasons}</p>
            <p>Descrição: {overview}</p>
            <Link to="/series">Voltar para a lista de séries</Link>
        </div>
    );
};

export default Series;
