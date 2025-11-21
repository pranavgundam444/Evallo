import API from "./api";
import { useState } from "react";

export default function Login({ setPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

    async function submit(e) {
    e.preventDefault();

    try {
        const res = await API.post("/login", { email, password });
        localStorage.setItem("token", res.data.token);
        setPage("employees");
    } catch (err) {
        alert("Login failed");
    }
    }


  return (
    <form onSubmit={submit}>
      <h2>Login</h2>

      <input
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="email"
        type="email"
      />

      <input
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="password"
        type="password"
      />

      <button>Login</button>
    </form>
  );
}
