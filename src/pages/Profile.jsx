import axios from 'axios';
import React, { useState } from "react";
import { getUser } from "../components/getUser";
import "./Profile.css";

export default function Profile() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [confirmarEmail, setConfirmarEmail] = useState("");
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
    let finalEmail = email;
    let finalNome = nome;
    if (!email) {
      finalEmail = user.email;
    }
    if (!nome) {
      finalNome = user.nome;
    }

    if ((finalNome || (finalEmail && finalEmail === confirmarEmail)) && validarSenha(senha)) {
      if (email && email !== confirmarEmail) {
        alert("O email e a confirmação do email não correspondem.");
        return;
      }
      try {
        const response = await axios.put(`http://localhost:8082/api/usuario/${user.id}`, {
          nome: finalNome,
          email: finalEmail,
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
              value={nome}
              placeholder={user.nome}
              onChange={e => setNome(e.target.value)}
            />
            <label>Nome</label>
          </div>
          <div className="inputbox-profile">
            <input
              type="email"
              value={email}
              placeholder={user.email}
              onChange={e => setEmail(e.target.value)}
            />
            <label>Email</label>
          </div>
          <div className="inputbox-profile">
            <input
              type="email"
              value={confirmarEmail}
              placeholder="Confirmar Email"
              onChange={e => setConfirmarEmail(e.target.value)}
            />
            <label>Confirmar Email</label>
          </div>
          <div className="inputbox-profile">
            <input
              type="password"
              placeholder='Senha é Obrigatorio'
              onChange={e => {
                setSenha(e.target.value);
                setPasswordError("");
              }}
            />
            <label>Senha *</label>
          </div>
          <h6 className='campos'>*Campos Obrigatórios</h6>
          <button style={{ background: "#fff", width: "200px", marginLeft: "800px" }} type="button-1" onClick={salvar}>Alterar</button>
        </div>
      </div>
    </section>
  );
}
