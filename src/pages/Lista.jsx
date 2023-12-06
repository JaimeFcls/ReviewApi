import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FavoritesPage = () => {
    const [favorites, setFavorites] = useState([]);

    const addToFavorites = async (movieId) => {
        try {
            const response = await axios.post('/lista', { movieId });
            if (response.status === 200) {
                setFavorites([...favorites, response.data]);
            }
        } catch (error) {
            console.error('Erro ao adicionar aos favoritos', error);
        }
    };

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
            <h1>Meus Favoritos</h1>
            {favorites.map(item => (
                <div key={item.id}>
                    <img className="movie-poster" src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt="movie poster" />
                    <h2>{item.title}</h2>
                    <p>Tipo: {item.type}</p>
                </div>
            ))}
        </div>
    );
};

export default FavoritesPage;
