import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./SideBarFilter.css";

const categoriaFilmesUrl = import.meta.env.VITE_CATEGORIA;

const SideBarFilter = () => {
    
  
    const getCategoriaFilmes = async (url) => {
    const res = await fetch(url, {
        headers : {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OTFjM2JmZTU5NmZjMmJiMmQ1OWQwZDhiYWZlMTM2NyIsInN1YiI6IjY0ZGVhYjcyYjc3ZDRiMTEzZmM2MDVhZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BwanTcyFlIRs3zxrfDXVXOCt6Cj2bH9AZSyUsNQgAv8',
        },
    })
    useEffect(() => {
        const categoriaFilmeUrl = `${categoriaFilmesUrl}`
        getCategoriaFilmes(categoriaFilmeUrl);
        
    }
        ,console.log(getCategoriaFilmes)
)

    };
    
    return (
        <div className="sidebar-filter">
            <h3>Categorias Filmes:</h3>
            {categories.map(category => (
                <div key={category.id}>
                    <Link to={`/category/${category.id}`}>{category.name}</Link>
                </div>
            ))}
        </div>
        
    );
};

export default SideBarFilter;
