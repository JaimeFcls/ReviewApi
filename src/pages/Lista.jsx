import axios from 'axios';
import React, { useEffect, useState } from 'react';

import MovieCard from '../components/MovieCard'; // Importe o componente MovieCard
const moviesURL = import.meta.env.VITE_API;
const defaultImageURL = './imagempadrao.png';

const FavoritesPage = () => {
    const [favorites, setFavorites] = useState([]);
    const [movies, setMovies] = useState([]);

    const getMovie = async (movieId) => {
        const url = `https://api.themoviedb.org/3/movie/${movieId}`;
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
        console.log(data);
        return data;
    };

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await axios.get('http://localhost:8082/api/lista');
                if (response.status === 200) {
                    setFavorites(response.data);
                    const moviesData = await Promise.all(response.data.map(async (favorite) => {
                        const movieId = favorite.movieId;
                        if (movieId) {
                            return await getMovie(movieId);
                        } else {
                            console.log('movieId não encontrado na resposta da API');
                            return null;
                        }
                    }));
                    setMovies(moviesData);
                }
            } catch (error) {
                console.error('Erro ao buscar favoritos', error);
            }
        };
        fetchFavorites();
    }, []);

    return (
        <div className='movies-container'>
            <h1 className='myFav'>Meus Favoritos</h1>
            {movies.map((movie, index) => (
                movie && <MovieCard key={favorites[index].id} movie={movie} />
            ))}
        </div>
    );
};

export default FavoritesPage;
