import React, { useState } from "react";
import "./SideBarFilter.css";

const SideBarFilter = () => {
    const [filterText, setFilterText] = useState("");

    const handleFilterTextChange = (e) => {
        setFilterText(e.target.value);
    };

    const handleFilterClick = () => {
        // Coloque sua lógica de filtro aqui
        console.log("Filtrar por: " + filterText);
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
            
        </div>
    );
};

export default SideBarFilter;
