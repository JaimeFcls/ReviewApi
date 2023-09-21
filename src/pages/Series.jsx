import React, { useEffect, useState } from "react";
import { BsFillFileEarmarkTextFill, BsGraphUp, BsHourglassSplit, BsWallet2 } from "react-icons/bs";
import { useParams } from "react-router-dom";

import SeriesCard from "../components/SeriesCard"; // 
import "./Series.css";

const seriesURL = import.meta.env.VITE_API; // Certifique-se de que a URL da API esteja correta.
const apiKey = import.meta.env.VITE_API_KEY;

const Series = () => {
  const { id } = useParams();
  const [series, setSeries] = useState(null);

  const getSeries = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    setSeries(data);
  };

  const formatCurrency = (number) => {
    return number.toLocaleString("pt-BR", {
      style: "currency",
      currency: "USD",
    });
  };

  useEffect(() => {
    const seriesUrl = `${seriesURL}${id}?${apiKey}`; // Certifique-se de que a URL da série esteja correta.
    getSeries(seriesUrl);
  }, []);

  return (
    <div className="series-page">
      {series && (
        <>
          <SeriesCard series={series} showLink={false} /> {/* Use o componente de cartão de série apropriado. */}
          <p className="tagline">{series.tagline}</p>
          <div className="info">
            <h3>
              <BsWallet2 /> Orçamento:
            </h3>
            <p>{formatCurrency(series.budget)}</p>
          </div>
          <div className="info">
            <h3>
              <BsGraphUp /> Receita:
            </h3>
            <p>{formatCurrency(series.revenue)}</p>
          </div>
          <div className="info">
            <h3>
              <BsHourglassSplit /> Duração:
            </h3>
            <p>{series.runtime} minutos</p>
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

export default Series;
