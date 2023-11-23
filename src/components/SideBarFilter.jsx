import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./SideBarFilter.css";

const SideBarFilter = () => {
    const [movieCategories, setMovieCategories] = useState([]);
    const [tvCategories, setTvCategories] = useState([]);

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OTFjM2JmZTU5NmZjMmJiMmQ1OWQwZDhiYWZlMTM2NyIsInN1YiI6IjY0ZGVhYjcyYjc3ZDRiMTEzZmM2MDVhZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BwanTcyFlIRs3zxrfDXVXOCt6Cj2bH9AZSyUsNQgAv8'
        }
    };

    useEffect(() => {
        fetch('https://api.themoviedb.org/3/genre/movie/list?language=pt-BR', options)
            .then(response => response.json())
            .then(response => setMovieCategories(response.genres))
            .catch(err => console.error(err));

        fetch('https://api.themoviedb.org/3/genre/tv/list?language=pt-BR', options)
            .then(response => response.json())
            .then(response => setTvCategories(response.genres))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="sidebar-filter">
            <h3>Categorias Filmes:</h3>
            {movieCategories.map(category => (
                <div className="categories" key={category.id}>
                    <Link to={`/category/movie/${category.id}`} style={{ textDecoration: 'none' }}> {category.name} </Link>
                </div>
            ))}
            <br></br>

            <h3>Categorias Séries:</h3>
            {tvCategories.map(category => (
                <div className="categories" key={category.id}>
                    <Link to={`/category/tv/${category.id}`} style={{ textDecoration: 'none' }}> {category.name} </Link>
                </div>
            ))}
        </div>
    );
};

export default SideBarFilter;
