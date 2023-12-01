import axios from 'axios';
import React, { useState } from "react";
import "./Cadastro.css";

export default function Cadastro() {
 

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
                
              />
              <label>Nome</label>
            </div>
            <div className="inputbox">
              <input
                type="email"
                placeholder="Email"
                required
              
              />
              <label>Email</label>
            </div>
            <div className="inputbox">
              <input
                type="email"
                placeholder="Confirmar Email"
                required
               
              />
              <label>Confirmar Email</label>
            </div>
            <div className="inputbox">
              <input
                type="password"
                placeholder="Senha"
                required
               
              />
              <label>Senha</label>
            </div>
            

            <button type="button">Cadastrar</button>
            <div className="register">
              <p>Já tem uma conta? <a href="/login">Login</a></p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
