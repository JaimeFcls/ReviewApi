import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { getUser } from "../components/getUser";
import './Lista.css';

import MovieCard2 from '../components/MovieCard2'; // 
import SeriesCard2 from '../components/SeriesCard2';
const moviesURL = import.meta.env.VITE_API;
const defaultImageURL = './imagempadrao.png';

const FavoritesPage = () => {
    const [favorites, setFavorites] = useState([]);
    const [favorites2, setFavorites2] = useState([]);
    const [movies, setMovies] = useState([]);
    const [series, setSeries] = useState([]);

    const user = getUser(); 

    const getMovie = async (movieId) => {
        const url = `https://api.themoviedb.org/3/movie/${movieId}?language=pt-br`;
        const res = await fetch(url, {
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OTFjM2JmZTU5NmZjMmJiMmQ1OWQwZDhiYWZlMTM2NyIsInN1YiI6IjY0ZGVhYjcyYjc3ZDRiMTEzZmM2MDVhZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BwanTcyFlIRs3zxrfDXVXOCt6Cj2bH9AZSyUsNQgAv8',
            },
        });
        const data = await res.json();
        
        console.log(data);
        return data;
    };
    const getSerie = async (serieId) => {
        const url = `https://api.themoviedb.org/3/tv/${serieId}?language=pt-br`;
        const res = await fetch(url, {
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OTFjM2JmZTU5NmZjMmJiMmQ1OWQwZDhiYWZlMTM2NyIsInN1YiI6IjY0ZGVhYjcyYjc3ZDRiMTEzZmM2MDVhZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BwanTcyFlIRs3zxrfDXVXOCt6Cj2bH9AZSyUsNQgAv8',
            },
        });
        const data = await res.json();
        console.log(data);
        return data;
    };
    
    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await axios.get('http://0.tcp.sa.ngrok.io:16905/api/lista');
                if (response.status === 200) {
                    const userFavorites = response.data.filter(favorite => favorite.usuario && favorite.usuario.id === user.id);
                    setFavorites(userFavorites);
                    const moviesData = await Promise.all(userFavorites.map(async (favorite) => {
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
        const fetchFavorites2 = async () => {
            try {
                const response = await axios.get('http://0.tcp.sa.ngrok.io:16905/api/lista');
                if (response.status === 200) {
                    const userFavorites = response.data.filter(favorite2 => favorite2.usuario && favorite2.usuario.id === user.id);
                    setFavorites2(userFavorites);
                    const seriesData = await Promise.all(userFavorites.map(async (favorite2) => {
                        const serieId = favorite2.serieId;
                        if (serieId) {
                            return await getSerie(serieId);
                        } else {
                            console.log('serieId não encontrado na resposta da API');
                            return null;
                        }
                    }));
                    setSeries(seriesData);
                }
            } catch (error) {
                console.error('Erro ao buscar favoritos', error);
            }
        };
        fetchFavorites();
        fetchFavorites2();
    }, []);

    return (
        <div>
            <h1 className='myFav'>Meus Favoritos</h1>
        <div className='movies-container'>
            {movies.map((movie, index) => (
                movie && <MovieCard2 key={favorites[index].id} movie={movie} />
                
            ))}
                {series.map((series, index) => (
                    series && <SeriesCard2 key={favorites2[index].id} series={series} />
                ))}
                
        </div>
        
           
        </div>
    );
};

export default FavoritesPage;
