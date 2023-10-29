import React, { useState, useContext, useEffect } from "react"; // Adicione useEffect aqui
import axios from 'axios';
import { UserContext } from '../components/UserContext';
import "./Login.css"

export default function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const { user, setUser } = useContext(UserContext);

    useEffect(() => {
        if (user) {
            alert(user.nome); 
            console.log(user); 
        }
    }, [user]); 

    const login = () => {
        axios.post("http://localhost:8082/api/usuario/login", { email, senha })
            .then((response) => {
                setUser(response.data); 
            })
            .catch((error) => {
                alert('Erro ao fazer login.');
            });
    };

    // ...
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
                                onChange={e => setEmail(e.target.value)}
                            />
                            <label>Email</label>
                        </div>
                        <div className="inputbox">
                            <ion-icon name="lock-closed-outline"></ion-icon>
                            <input
                                type="password"
                                placeholder="Senha"
                                required
                                onChange={e => setSenha(e.target.value)}
                            />
                            <label>Senha</label>
                        </div>

                        <button onClick={login}>Login</button>
                        <div className="register">
                            <p>Não tem uma conta? <a href="/cadastro">Cadastre-se</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
