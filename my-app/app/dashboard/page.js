"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Dashboard() {
  const router = useRouter();

  const [message, setMessage] = useState("");

  const generateTimes = () => {
  const times = [];

  for (let hour = 9; hour <= 19; hour++) {
    times.push(`${hour.toString().padStart(2, "0")}:00`);
    times.push(`${hour.toString().padStart(2, "0")}:30`);
  }

  return times;
 };

  const times = generateTimes();

  const [form, setForm] = useState({
    service: "",
    date: "",
    time: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const res = await fetch("/api/appointments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    let data = {};

    try {
        data = await res.json();
    } catch (e) {
        data = { message: "Server error" };
    }

    if (res.ok) {
      setMessage(data.message);

      setForm({
        service: "",
        date: "",
        time: "",
      })
    } else {
      setMessage(data.message);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 
          style={{ 
            color: "black",
            textAlign: "center",
            fontSize: "20px",
            fontWeight: "bold",
            marginBottom: "20px",
          }}>
            🦷 Book a dentist appointment
        </h1>

     {message && (
       <p style={{ color: "#16a34a", fontWeight: "bold" }}>
         {message}
       </p>
     )}
     <select
       name="service"
       value={form.service}
       onChange={handleChange}
       style={styles.input}
     >
      <option value="">Select a service</option>
      <option value="control stomatologic">Control stomatologic</option>
      <option value="detartraj">Detartraj</option>
      <option value="plomba">Plombă</option>
      <option value="extractie">Extracție</option>
      <option value="albire dentara">Albire dentară</option>
     </select>

        <input
          name="date"
          type="date"
          value={form.date}
          min={new Date().toISOString().split("T")[0]}
          onChange={handleChange}
          style={{ ...styles.input, color: "black" }}
        />

        <select
          name="time"
          value={form.time}
          onChange={handleChange}
          style={{ ...styles.input, color: "black" }}
        >
          <option value="">Select time</option>
         {times.map((t) => (
           <option key={t} value={t}>
            {t}
           </option>
         ))}
        </select>

        <button onClick={handleSubmit} style={styles.button}>
          Book appointment
        </button>

        <button onClick={() => router.push("/allAppointments")}
              style={styles.secondaryButton}
        >
          View your appointments
        </button>

        <button onClick={() => router.push("/profile")}
              style={styles.backButton}
        >
          Profile
        </button>

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
    background: "#1c53cb",
    color: "white",
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
  },
  secondaryButton: {
    padding: 10,
    background: "#a3167b",
    color: "white",
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
  },
  backButton: {
    padding: 10,
    background: "#6b24c1",
    color: "white",
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
  },
};