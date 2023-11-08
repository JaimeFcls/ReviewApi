import { useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { getUser } from "./getUser"
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
      {/* Verifica se o usuário está logado e exibe o nome do usuário se estiver logado */}
      {user ? (
        <div className="user-info">
          <p>Olá, {user.nome}</p>
          {/* Adicione o link de logout */}
          <a href="#" onClick={handleLogout}>
            Sair
          </a>
          <a href="/Profile">
            Minha conta
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
