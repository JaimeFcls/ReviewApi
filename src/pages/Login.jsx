import React, { useState } from "react";
import axios from 'axios';
import "./Login.css"
export default function Login() {
    const [nome, setNome] = useState();
    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();

    function salvar() {
        let usuarioRequest = {
            nome: nome,
            senha: senha,
            email: email,
        };

        axios.post("http://localhost:8082/api/usuario", usuarioRequest)
            .then((response) => {
                console.log('Cliente cadastrado com sucesso.');
            })
            .catch((error) => {
                console.log('Erro ao incluir o um cliente.');
            });
    }

    return (
        <div>
            <div>
                <a href="/">
                    <img src="/reviewlogoteste.png" alt="Logo" />
                </a>
                <h1>Login</h1>
                <div>
                    <input
                        type="text"
                        placeholder="Email"
                        required
                    />
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Senha"
                        required
                    />
                </div>
                <button onClick={salvar}>Login</button>

                <div>
                    <a href="#">Não tem uma Conta ? Cadastre-se</a>
                </div>
            </div>
        </div>

    );
}
