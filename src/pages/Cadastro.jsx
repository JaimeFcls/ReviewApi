import React, { useState } from "react";
import axios from 'axios';
import { IonIcon } from "@ionic/react";
import "./Cadastro.css"

export default function Cadastro() {
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

  return (
    <section>
      <div className="form-box">
        <div className="form-value">
          <form action="">
            <h4>Cadastro</h4>
            <div className="inputbox">
              <input
                type="text"
                placeholder="Nome"
                required
                onChange={e => setNome(e.target.value)}
              />
              <label>Nome</label>
            </div>
            <div className="inputbox">
              <input
                type="email"
                placeholder="Email"
                required
                onChange={e => setEmail(e.target.value)}
              />
              <label>Email</label>
            </div>
            <div className="inputbox">
              <input
                type="email"
                placeholder="Confirmar Email"
                required
                onChange={e => setConfirmarEmail(e.target.value)} // Atualiza o estado do Confirmar Email
              />
              <label>Confirmar Email</label>
            </div>
            <div className="inputbox">
              <input
                type="password"
                placeholder="Senha"
                required
                onChange={e => {
                  setSenha(e.target.value);
                  setPasswordError(""); // Limpa o erro quando a senha é alterada
                }}
              />
              <label>Senha</label>
            </div>
            {passwordError && <p className="error-message">{passwordError}</p>}
            {formError && <p className="error-message">{formError}</p>}

            <button type="button" onClick={salvar}>Cadastrar</button>
            <div className="register">
              <p>Já tem uma conta? <a href="/login">Login</a></p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
