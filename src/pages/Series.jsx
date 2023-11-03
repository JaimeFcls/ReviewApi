import React, { useEffect, useState } from "react";
import { BsFillFileEarmarkTextFill, BsGraphUp, BsHourglassSplit, BsWallet2 } from "react-icons/bs";
import { useParams } from "react-router-dom";

import SeriesCard from "../components/SeriesCard"; // 
import "./Series.css";

const seriesURL = import.meta.env.VITE_API_2;
const accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OTFjM2JmZTU5NmZjMmJiMmQ1OWQwZDhiYWZlMTM2NyIsInN1YiI6IjY0ZGVhYjcyYjc3ZDRiMTEzZmM2MDVhZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BwanTcyFlIRs3zxrfDXVXOCt6Cj2bH9AZSyUsNQgAv8';

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
        console.log(data);
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
                    <SeriesCard series={series} showLink={false} /> {/* Use o componente de cartão de série apropriado. */}
                    <p className="tagline">{series.tagline}</p>
                    <div className="info">
                        <h3>
                            <BsWallet2 /> Primeiro Episodio em :
                        </h3>
                        <p>{series.first_air_date}</p>
                    </div>
                    <div className="info">
                        <h3>
                            <BsGraphUp /> Ultimo Episodio em :
                        </h3>
                        <p>{series.last_air_date}</p>
                    </div>
                    <div className="info">
                        <h3>
                            <BsHourglassSplit /> Episodios:
                        </h3>
                        <p>{series.number_of_episodes} Episodios e {series.number_of_seasons} Temporadas </p>
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
