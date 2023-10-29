import React, { useState } from "react";
import axios from 'axios';
import { IonIcon } from "@ionic/react";
import "./Cadastro.css"

export default function Cadastro() {
    const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function salvar() {
    if (nome && email && senha) {
      let usuarioRequest = {
        nome: nome,
        senha: senha,
        email: email,
      };

      axios.post("http://localhost:8082/api/usuario", usuarioRequest)
        .then((response) => {
            alert('Cadastrado com sucesso.');
        })
        .catch((error) => {
            console.log('Erro ao incluir o um cliente.');
        });
    } else {
      alert("Por favor, preencha todos os campos.");
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
                type="password" 
                placeholder="Senha" 
                required 
                onChange={e => setSenha(e.target.value)}
              />
              <label>Senha</label>
            </div>

            <button onClick={salvar}>Cadastrar</button>
            <div className="register">
              <p>Já tem uma conta? <a href="/login">Login</a></p>
            </div>
          </form>
        </div>
      </div>
    </section>
    );
}
