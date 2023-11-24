import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SeriesCard from "../components/SeriesCard"; 
import "./SeriesGrid.css"; 
import SideBarFilter from "../components/SideBarFilter";
const SeriesCategoryPage = () => {
    const [series, setSeries] = useState([]);
    const [genreName, setGenreName] = useState("");
    const { id: categoryId } = useParams();

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OTFjM2JmZTU5NmZjMmJiMmQ1OWQwZDhiYWZlMTM2NyIsInN1YiI6IjY0ZGVhYjcyYjc3ZDRiMTEzZmM2MDVhZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BwanTcyFlIRs3zxrfDXVXOCt6Cj2bH9AZSyUsNQgAv8'
            }
        };

        fetch(`https://api.themoviedb.org/3/genre/tv/list?language=pt-BR`, options)
            .then(response => response.json())
            .then(response => {
                const genre = response.genres.find(genre => genre.id === Number(categoryId));
                if (genre) {
                    setGenreName(genre.name);
                }
            })
            .catch(err => console.error(err));

        fetch(`https://api.themoviedb.org/3/discover/tv?with_genres=${categoryId}`, options)
            .then(response => response.json())
            .then(response => setSeries(response.results))
            .catch(err => console.error(err));
    }, [categoryId]);

    return (
        <div>
            <br></br>
            <h2 className="CategoriaSerie">Séries de {genreName}</h2>
            <div className="series-container">
                {series.map(serie => (
                    <SeriesCard key={serie.id} series={serie} />
                ))}
            </div>
            <SideBarFilter /> 
        </div>
    );
};

export default SeriesCategoryPage;
