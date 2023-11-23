import { useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { getUser } from "./getUser";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!search) return;

    navigate(`/search?q=${search}`, { replace: true });
    setSearch("");
  };
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };
  const user = getUser();
  return (
    <nav id="navbar">
      <Link to={"/"}>
        <img src="/logorvw2.png" alt="logo" />
      </Link>
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
      
      {user ? (
        
        <div className="user-info">
          <p className="ola" style={{color: "#fff" }}>Olá, </p>
          <a className="usuario" href="/profile" >{user.nome}</a>   
          <a className="sair" onClick={handleLogout}> 
            Sair
          </a>
        </div>
        
      ) : (
        <div>
            <a href="/cadastro" className="cadastrar" >Cadastro</a>
            <a href="/login" className="logar" >Login</a>
        </div>
      )}
    </nav>
  
  );
  
};

export default Navbar;
