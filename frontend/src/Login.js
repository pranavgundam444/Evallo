import { useState } from "react";

export default function Login({ setPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e) {
    e.preventDefault();

    const res = await fetch("http://localhost:4000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    if (!res.ok) {
      alert("Login failed");
      return;
    }

    const data = await res.json();
    localStorage.setItem("token", data.token);

    setPage("employees");
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
