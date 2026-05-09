"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Profile() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [message, setMessage] = useState("");

  const router = useRouter();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const res = await fetch("/api/profile");

    const data = await res.json();

    setForm(data);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    const res = await fetch("/api/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    setMessage(data.message);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <button onClick={() => router.push("/dashboard")}
            style={styles.backButton}
        >
            Back
        </button>

        <h1 style={{ color: "black" }}>Profile</h1>

        {message && (
          <p style={{ color: "green" }}>
            {message}
          </p>
        )}

        <input
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          placeholder="First name"
          style={styles.input}
        />

        <input
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
          placeholder="Last name"
          style={styles.input}
        />

        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          style={styles.input}
        />

        <button
          onClick={handleSave}
          style={styles.button}
        >
          Save profile
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f3f4f6",
  },

  card: {
    background: "white",
    padding: 30,
    borderRadius: 10,
    width: 350,
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },

  input: {
    padding: 10,
    border: "1px solid #ccc",
    borderRadius: 5,
    color: "black",
  },

  button: {
    padding: 10,
    background: "#29a041",
    color: "white",
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
  },

  backButton: {
    padding: 10,
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
    marginBottom: 10,
  },
};