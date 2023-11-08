import axios from 'axios';
import React, { useState } from "react";
import { getUser } from "../components/getUser";
import "./Profile.css";

export default function Profile() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [confirmarEmail, setConfirmarEmail] = useState(""); // Novo estado
  const [senha, setSenha] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formError, setFormError] = useState("");

  function validarSenha(senha) {
    if (senha.length < 6) {
      setPasswordError("A senha deve ter no mínimo 6 caracteres.");
      return false;
    }
    return true;
  }

  function salvar() {
    if (nome && email === confirmarEmail && validarSenha(senha)) {
      let usuarioRequest = {
        nome: nome,
        senha: senha,
        email: email,
      };

      axios.post("http://localhost:8082/api/usuario", usuarioRequest)
        .then((response) => {
          alert('Cadastrado com sucesso.');
          window.location.href = "/login"
        })
        .catch((error) => {
          console.log('Erro ao incluir um cliente.');
        });
    } else {
      if (email !== confirmarEmail) {
        setFormError("Verifique o email digitado.");
      } else {
        setFormError("Por favor, preencha todos os campos corretamente.");
      }
    }
  }
  const user = getUser();

  return (
    <section>
      <div className="form-box-profile">
        <div className="form-value">
          <form action="">
            <h4>Olá, {user.nome}</h4>
            <h6>Aqui você pode editar as informações da sua conta </h6>
          </form>
          <div className="inputbox-profile">
              <input
                type="text"
                
                required
                onChange={e => setNome(e.target.value)}
              />
              <label>Nome</label>
            </div>
            <div className="inputbox-profile">
            <input
                type="email"
                
                required
                onChange={e => setEmail(e.target.value)}
              />
              <label>Email</label>
            </div>
            <div className="inputbox-profile">
              <input
                type="password"
               
                required
                onChange={e => {
                  setSenha(e.target.value);
                  setPasswordError(""); // Limpa o erro quando a senha é alterada
                }}
              />
              <label>Senha</label>
              
            </div>
            <button style={{background: "#fff" , width:"200px", marginLeft:"88px"}} type="button-1" onClick={salvar}>Alterar</button>
        </div>
      </div>
    </section>
  );
}
