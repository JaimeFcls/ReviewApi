import axios from 'axios';
import React, { useState } from "react";
import "./Cadastro.css";

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [confirmarEmail, setConfirmarEmail] = useState(""); 
  const [senha, setSenha] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formError, setFormError] = useState("");

  function validarSenha(senha) {
    if (senha.length < 6) {
      alert("A senha deve ter no mínimo 6 caracteres.");
      return false;
    }
    return true;
  }

  function salvar() {
    if (nome && nome.length <= 21 && email === confirmarEmail && validarSenha(senha)) {
      let usuarioRequest = {
        nome: nome,
        senha: senha,
        email: email,
      };

      axios.post("https://xt4a713djcwo.share.zrok.io/api/usuario", usuarioRequest)
        .then((response) => {
        
          if (response.data.emailExists) {
            alert('Email já em utilização');
          } else {
            alert('Cadastrado com sucesso..');
            window.location.href = "/login"
          }
        })
        .catch((error) => {
          console.error(error);
          alert('Email já em utilização');
        });
    } else {
      if (nome.length > 21) {
        alert("O nome não pode conter mais de 20 caracteres.");
      } else if (email !== confirmarEmail) {
        alert("Verifique o email digitado.");
      } else {
        alert("Por favor, preencha todos os campos corretamente.");
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
                onChange={e => setConfirmarEmail(e.target.value)} 
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
                  setPasswordError(""); 
                }}
              />
              <label>Senha</label>
            </div>
            

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
