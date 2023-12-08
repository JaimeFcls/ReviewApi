import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Lista.css';

import MovieCard from '../components/MovieCard'; // Importe o componente MovieCard

const FavoritesPage = () => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await axios.get('http://localhost:8082/api/lista');
                if (response.status === 200) {
                    setFavorites(response.data);
                }
            } catch (error) {
                console.error('Erro ao buscar favoritos', error);
            }
        };
        fetchFavorites();
    }, []);

    return (
        <div>
            <h1 className='meusLista'>Meus Favoritos</h1>
            {favorites.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
    );
};

export default FavoritesPage;