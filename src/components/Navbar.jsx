import { useState } from "react";
import {  BiSearchAlt2 } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";

import "./Navbar.css";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!search) return;

    navigate(`/search?q=${search}`, { replace: true });
    setSearch("");
  };

  return (
    <nav id="navbar">  
      <a href="/">
        <img src="/logorvw2.png" alt="logo"/>
      </a>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Busque um filme ou série"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <button type="submit">
          <BiSearchAlt2 />
        </button>      
        
      </form>
      <a href="/cadastro">Cadastre-se</a>
      <a href="/login">Login</a>
    </nav>
    
  );
};

export default Navbar;
