"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Profile() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    profileImage: "",
  });

  const [message, setMessage] = useState("");

  const router = useRouter();

  useEffect(() => {
    fetchProfile();
  }, []);

  const uploadImage = async (e) => {
    const file = e.target.files[0];

    const formData = new FormData();

    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    setForm({
      ...form,
      profileImage: data.url,
    });
  };

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

        <h1 
          style={{ 
            color: "black",
            textAlign: "center",
            fontSize: "28px",
            fontWeight: "bold",
            marginBottom: "20px",
           }}>
            Profile
        </h1>

        {form.profileImage && (
           <img
           src={form.profileImage}
           alt="Profile"
           width={120}
           style={{
             borderRadius: "50%",
             marginTop: 10,
             display: "block",
             margin: "0 auto",
           }}
           />
        )}

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

        <input
          type="file"
          onChange={uploadImage}
          style={{
            color: "black",
            marginTop: 10,
          }}
        />


        <button
          onClick={handleSave}
          style={styles.button}
        >
          Save profile
        </button>

                <button onClick={() => router.push("/dashboard")}
            style={styles.backButton}
        >
            Back
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
    background: "#acc2ee",
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
    border: "1px solid #e90792",
    borderRadius: 5,
    color: "black",
  },

  button: {
    padding: 10,
    background: "#92129d",
    color: "white",
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
  },

  backButton: {
    padding: 10,
    background: "#0c41b2",
    color: "white",
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
    marginBottom: 10,
  },
};