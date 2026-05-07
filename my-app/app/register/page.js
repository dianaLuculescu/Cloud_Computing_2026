"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push("/login");
    } else {
      alert("Error");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={{ color: "black" }}>Register</h1>

        <input name="firstName" placeholder="First name" style={{ ...styles.input, color: "black" }} onChange={handleChange} />
        <input name="lastName" placeholder="Last name" style={{ ...styles.input, color: "black" }} onChange={handleChange} />
        <input name="email" placeholder="Email" style={{ ...styles.input, color: "black" }} onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" style={{ ...styles.input, color: "black" }} onChange={handleChange} />

        <button style={styles.button} onClick={handleSubmit}>
          Create account
        </button>

        <p
          style={{ cursor: "pointer", color: "blue" }}
          onClick={() => router.push("/login")}
        >
          Already have account? Login
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
    background: "#f3f4f6",
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
    background: "#16a34a",
    color: "white",
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
  },
};