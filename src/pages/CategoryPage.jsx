import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import "./MoviesGrid.css";
import SideBarFilter from "../components/SideBarFilter";

const CategoryPage = () => {
    const [movies, setMovies] = useState([]);
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

        fetch(`https://api.themoviedb.org/3/genre/movie/list?language=pt-BR`, options)
            .then(response => response.json())
            .then(response => {
                const genre = response.genres.find(genre => genre.id === Number(categoryId));
                if (genre) {
                    setGenreName(genre.name);
                }
            })
            .catch(err => console.error(err));

        fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=${categoryId}`, options)
            .then(response => response.json())
            .then(response => setMovies(response.results))
            .catch(err => console.error(err));
    }, [categoryId]);

    return (
        <div>
            <br></br>

            <h2 className="CategoriaFilme">Filmes de {genreName}</h2>
        <div className="movies-container" >
            
            {movies.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
            <SideBarFilter /> 
        </div>
    );
};

export default CategoryPage;
