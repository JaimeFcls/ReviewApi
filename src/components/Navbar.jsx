import { useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import { Link, useLocation } from "react-router-dom";
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
         
          {/* Adicione o link de logout */}
         
          <p style={{color: "#fff"}}>Olá, </p>
          <Link to={"/profile"} style={{color: "#022b4d"}} >{user.nome}</Link>
          <Link style={{color: "#fff"}} onClick={handleLogout}> 
            Sair
          </Link>
        </div>
        
      ) : (
        <div>
            <Link to={"/cadastro"}>Cadastro</Link>
            <Link to={"/login"}>Login</Link>
        </div>
      )}
    </nav>

  );
};

export default Navbar;
