import React from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const imagesURL = import.meta.env.VITE_IMG;
const defaultImageURL = '/imagempadrao.png';

const SeriesCard2 = ({ series }) => {
    const posterURL = series.poster_path ? `${imagesURL}${series.poster_path}` : null;
    const onError = (e) => {
        if (e.target.src !== defaultImageURL) {
            e.target.src = defaultImageURL;
        }
    };

    return (
        <div className="series-page">
            <Link to={`/tv/${series.id}`}>
                <img style={{ width: "324px", height: "486px" }} src={posterURL} alt={series.name} onError={onError} />
            </Link>
            <Link to={`/tv/${series.id}`}>
                <h3 style={{ marginBottom: "45px" }}>{series.name}</h3>
            </Link>
            
        </div>
    );
};

export default SeriesCard2;
