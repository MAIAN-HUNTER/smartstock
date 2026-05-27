import { useState } from "react";
import axios from "axios";

function Login({ onLogin }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {

    e.preventDefault();

    try {

      const response = await axios.post(
  `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          email,
          password,
        }
      );

      const token = response.data.token;

      console.log(response.data);

      localStorage.setItem("token", token);

      alert("Login realizado!");

      if (onLogin) {

        console.log("TOKEN SALVO:", token);
        console.log("LOGIN FINALIZADO");

        onLogin();
      }

    } catch (error) {

      console.log("ERRO COMPLETO:", error);

      if (error.response) {
        console.log("STATUS:", error.response.status);
        console.log("DATA:", error.response.data);
      }

      console.log("MESSAGE:", error.message);

      alert(error.message);
    }
  }

  return (
    <div className="card">

      <h2>Login</h2>

      <form
        onSubmit={handleLogin}
        autoComplete="off"
      >

        <input
          type="email"
          placeholder="E-mail"
          autoComplete="off"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          autoComplete="new-password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">
          Entrar
        </button>

      </form>

    </div>
  );
}

export default Login;