import React, { useEffect, useState } from "react";
import { BsFillFileEarmarkTextFill, BsGraphUp, BsHourglassSplit, BsWallet2 } from "react-icons/bs";
import { useParams } from "react-router-dom";

import SeriesCard from "../components/SeriesCard";
import "./Series.css";
const defaultImageURL = './imagempadrao.png'; // Substitua pelo URL da sua imagem padrão

const seriesURL = import.meta.env.VITE_API_2;
const accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OTFjM2JfWTVlOTllMWViMzZlNTc4YjI4NjFjYjI1Zjg5MmQiLCJzdWIiOiI2NGRlYWI3MmI3N2Q0YjExM2ZjNjA1YmQiLCJzY29wZSI6WyJhcGlyX3JlYWQiXSwidmVyc2lvbiI6MX0.mxKXmx5jH0fSMf3mOY_jijsZuzBx_Ef4HgD4AkP36L4';

const SeriesDetails = () => {
    const { id } = useParams();
    const [series, setSeries] = useState(null);

    const getSeries = async () => {
        const url = `${seriesURL}${id}?language=en-US`;
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${accessToken}`
            }
        };
        const res = await fetch(url, options);
        const data = await res.json();

        // Verifica se o cartaz está disponível
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
        getSeries();
    }, []);

    return (
        <div className="series-page">
            {series && (
                <>
                    <SeriesCard series={series} showLink={false} />
                    <p className="tagline">{series.tagline}</p>
                    <div className="info">
                        <h3>
                            <BsWallet2 /> Primeiro Episódio em :
                        </h3>
                        <p>{series.first_air_date}</p>
                    </div>
                    <div className="info">
                        <h3>
                            <BsGraphUp /> Último Episódio em :
                        </h3>
                        <p>{series.last_air_date}</p>
                    </div>
                    <div className="info">
                        <h3>
                            <BsHourglassSplit /> Episódios:
                        </h3>
                        <p>{series.number_of_episodes} Episódios e {series.number_of_seasons} Temporadas </p>
                    </div>
                    <div className="info description">
                        <h3>
                            <BsFillFileEarmarkTextFill /> Descrição:
                        </h3>
                        <p>{series.overview}</p>
                    </div>
                </>
            )}
        </div>
    );
};

export default SeriesDetails;
