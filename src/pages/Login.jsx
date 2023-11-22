import React, { useState } from "react";
import axios from "axios";
import "./Login.css";

export default function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [error, setError] = useState("");

    const login = async () => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            };

            const data = new URLSearchParams();
            data.append("email", email);
            data.append("senha", senha);

            const response = await axios.post("http://localhost:8082/api/usuario/login", data, config);

            if (response.status === 200) {
                console.log("Autenticação bem-sucedida:", response.data);

                localStorage.setItem("user", JSON.stringify(response.data));

                window.location.href = "/"; 

            } else {
                setError("Erro ao fazer login. Tente novamente.");
            }
        } catch (error) {
            alert("Email ou Senha inválida");
            console.error("Erro ao fazer login:", error);
        }
    };

    return (
        <section>
            <div className="form-box">
                <div className="form-value">
                    <form action="">
                        <h4>Login</h4>
                        <div className="inputbox">
                            <ion-icon name="mail-outline"></ion-icon>
                            <input
                                type="email"
                                placeholder="Email"
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <label>Email</label>
                        </div>
                        <div className="inputbox">
                            <ion-icon name="lock-closed-outline"></ion-icon>
                            <input
                                type="password"
                                placeholder="Senha"
                                required
                                onChange={(e) => setSenha(e.target.value)}
                            />
                            <label>Senha</label>
                        </div>

                        <button type="button" onClick={login}>
                            Login
                        </button>
                        {error && <p className="error-message">{error}</p>}
                        <div className="register">
                            <p>
                                Não tem uma conta? <a href="/cadastro">Cadastre-se</a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
