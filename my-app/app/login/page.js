"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      router.push("/dashboard");
    } else {
      alert("Invalid login");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>

      <div style={{ textAlign: "center", marginBottom: 20 }}>
          <span style={{ fontSize: 40 }}>🦷</span>
          <h1 style={{ color: "black", fontWeight: "bold", fontSize: 22}}>Dental Care Clinique</h1>
      </div>

        <h1 style={{ color: "black", fontWeight: "bold", textAlign: "center" }}>Login</h1>

        <input
          style={{ ...styles.input, color: "black" }}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={{ ...styles.input, color: "black" }}
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={styles.button} onClick={handleLogin}>
          Login
        </button>

        <p
          style={{ cursor: "pointer", color: "blue" }}
          onClick={() => router.push("/register")}
        >
          No account? Register
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#acc2ee",
  },
  card: {
    padding: 30,
    background: "white",
    borderRadius: 10,
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    gap: 10,
    width: 300,
  },
  input: {
    padding: 10,
    border: "1px solid #ccc",
    borderRadius: 5,
  },
  button: {
    padding: 10,
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
  },
};