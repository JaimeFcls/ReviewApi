import axios from 'axios';
import React, { useState, useEffect } from "react";
import { getUser } from "../components/getUser";
import "./Profile.css";

export default function Profile() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  function validarSenha(senha) {
    if (senha.length < 6) {
      setPasswordError("A senha deve ter no mínimo 6 caracteres.");
      alert("A senha deve ter no mínimo 6 caracteres.");
      return false;
    }
    return true;
  }

  async function salvar() {
    if (nome && email && validarSenha(senha)) {
      try {
        const response = await axios.put(`http://localhost:8082/api/usuario/${user.id}`, {
          nome,
          email,
          senha
        });
        alert("Dados alterados com sucesso, é necessário fazer o login novamente");
        handleLogout();
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("Por favor, preencha todos os campos.");
    }
  }

  const user = getUser();

  return (
    <section>
      <div className="form-box-profile">
        <div className="form-value">
          <form action="">
            <h5>Olá, {user.nome}</h5>
            <h6>Aqui você pode editar as informações da sua conta </h6>
          </form>
          <div className="inputbox-profile">
            <input
              type="text"
              placeholder={user.nome}
              onChange={e => setNome(e.target.value)}
            />
            <label>Nome</label>
          </div>
          <div className="inputbox-profile">
            <input
              type="email"
              placeholder={user.email}
              onChange={e => setEmail(e.target.value)}
            />
            <label>Email</label>
          </div>
          <div className="inputbox-profile">
            <input
              type="password"
              onChange={e => {
                setSenha(e.target.value);
                setPasswordError(""); // Limpa o erro quando a senha é alterada
              }}
            />
            <label>Senha</label>
          </div>
          <h6>Preencha todos os campos para alterar os dados</h6>
          <button style={{ background: "#fff", width: "200px", marginLeft: "800px" }} type="button-1" onClick={salvar}>Alterar</button>
        </div>
      </div>
    </section>
  );
}