import React from "react";
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
            <h3>Filtro</h3>
            <a href="#">Ação</a>
            <a href="#">Aventura</a>
            <a href="#">Animação</a>
            <a href="#">Comédia</a>
            <a href="#">Crime</a>
            <a href="#">Documentário</a>
            <a href="#">Drama</a>
            <a href="#">Família</a>
            <a href="#">Infantil</a>
                

        </div>
        
    );
};

export default SideBarFilter;
