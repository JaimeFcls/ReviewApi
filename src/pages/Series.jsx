import React, { useEffect, useState } from "react";
import { BsFillFileEarmarkTextFill, BsGraphUp, BsHourglassSplit, BsWallet2 } from "react-icons/bs";
import { useParams } from "react-router-dom";

import SeriesCard from "../components/SeriesCard";
import "./Series.css";
const defaultImageURL = './imagempadrao.png'; // Substitua pelo URL da sua imagem padrão

const seriesURL = import.meta.env.VITE_API_2;
const accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OTFjM2JfWTVlOTllMWViMzZlNTc4YjI4NjFjYjI1Zjg5MmQiLCJzdWIiOiI2NGRlYWI3MmI3N2Q0YjExM2ZjNjA1YmQiLCJzY29wZSI6WyJhcGlyX3JlYWQiXSwidmVyc2lvbiI6MX0.mxKXmx5jH0fSMf3mOY_jijsZuzBx_Ef4HgD4AkP36L4';

const Series = () => {
    const { id } = useParams();
    const [series, setSeries] = useState(null);

    const getSeries = async (url) => {
        const res = await fetch(url, {
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OTFjM2JmZTU5NmZjMmJiMmQ1OWQwZDhiYWZlMTM2NyIsInN1YiI6IjY0ZGVhYjcyYjc3ZDRiMTEzZmM2MDVhZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BwanTcyFlIRs3zxrfDXVXOCt6Cj2bH9AZSyUsNQgAv8',
            },
        });
        const data = await res.json();

       
        if (!data.poster_path) {
            data.poster_path = defaultImageURL;
        }

        setSeries(data);
    };

    const formatCurrency = (number) => {
        return number ? number.toLocaleString("pt-BR", {
            style: "currency",
            currency: "USD",
        }) : '';
    };

    useEffect(() => {
        const seriesURL = `https://api.themoviedb.org/3/tv/${id}?language=pt-br`;
        getSeries(seriesURL);
    }, []);

    return (
        <div className="series-back">
            <img src={`https://image.tmdb.org/t/p/w500${series?.backdrop_path}`} alt="series backdrop" style={{ width: '1920px', height: '400px', opacity: "25%" }} />
            {series && (
                <>
                    <img className="series-poster" src={`https://image.tmdb.org/t/p/w500${series?.poster_path}`} alt="series poster" />
                    <p className="series-title">{series.name}</p>
                    <p className="tagline">{series.tagline}</p>
                    <div className="sinopse">
                        <h3>
                            Sinopse
                        </h3>
                        <p>{series.overview}</p>

                        &nbsp;
                        <p>Lançado em : {new Date(series.first_air_date).toLocaleDateString('pt-BR')}</p>
                    </div>

                </>
            )}
        </div>
    );
};

export default Series;

