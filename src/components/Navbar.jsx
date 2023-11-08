import { useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
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
    // Remova os dados do usuário do localStorage
    localStorage.removeItem("user");

    // Redirecione o usuário para a página de login (ou outra página apropriada)
    window.location.href = "/login";
  };
  const user = getUser();
  return (
    <nav id="navbar">
      <a href="/">
        <img src="/logorvw2.png" alt="logo" />
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
      
      {user ? (
        
        <div className="user-info">
         
          {/* Adicione o link de logout */}
         
          <p style={{color: "#fff"}}>Olá, </p>
          <a href="/profile" style={{color: "#022b4d"}} >{user.nome}</a>
          <a style={{color: "#fff"}} onClick={handleLogout}> 
            Sair
          </a>
        </div>
        
      ) : (
        <div>
          <a href="/cadastro">Cadastro</a>
          <a href="/login">Login</a>
        </div>
      )}
    </nav>

  );
};

export default Navbar;
