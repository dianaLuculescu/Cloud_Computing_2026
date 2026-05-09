"use client";

import { useEffect, useState } from "react";

export default function MyAppointments() {
  const [appointments, setAppointments] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [editForm, setEditForm] = useState({
    service: "",
    date: "",
    time: "",
  });

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    const res = await fetch("/api/allAppointments");
    const data = await res.json();
    setAppointments(data);
  };

  const generateTimes = () => {
    const times = [];

    for (let hour = 9; hour <= 19; hour++) {
      times.push(`${hour.toString().padStart(2, "0")}:00`);
      times.push(`${hour.toString().padStart(2, "0")}:30`);
    }

    return times;
  };

  const times = generateTimes();

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
            Your Appointments
        </h1>

         <button
           onClick={() => (window.location.href = "/dashboard")}
           style={{
             marginTop: 10,
             marginBottom: 20,
             padding: 10,
             background: "#5c14ae",
             color: "white",
             border: "none",
             borderRadius: 5,
             cursor: "pointer",
            }}
         >
           Add appointment
         </button>

        {appointments.map((a) => (
          <div key={a._id} style={styles.appointment}>
            
            <p style={{ color: "black" }}>
              <b>Service:</b> {a.service}
            </p>

            <p style={{ color: "black" }}>
              <b>Date:</b> {a.date}
            </p>

            <p style={{ color: "black" }}>
              <b>Time:</b> {a.time}
            </p>

            <div style={styles.buttons}>
              
              <button
                style={styles.editButton}
                onClick={() => {
                  setEditingId(a._id);
                  setEditForm({
                    service: a.service,
                    date: a.date,
                    time: a.time,
                  });
                }}
              >
                Edit
              </button>

              <button
                style={styles.deleteButton}
                onClick={async () => {
                  await fetch("/api/delete", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ id: a._id }),
                  });

                  setAppointments((prev) =>
                    prev.filter((item) => item._id !== a._id)
                  );
                }}
              >
                Delete
              </button>
            </div>

            {editingId === a._id && (
              <div style={styles.editBox}>
                
                <select
                  name="service"
                  value={editForm.service}
                  onChange={handleEditChange}
                  style={styles.input}
                >
                  <option value="">Select service</option>
                  <option value="control stomatologic">Control stomatologic</option>
                  <option value="detartraj">Detartraj</option>
                  <option value="plomba">Plombă</option>
                  <option value="extractie">Extracție</option>
                  <option value="albire dentara">Albire dentară</option>
                </select>

                <input
                  type="date"
                  name="date"
                  value={editForm.date}
                  onChange={handleEditChange}
                  style={styles.input}
                />

                <select
                  name="time"
                  value={editForm.time}
                  onChange={handleEditChange}
                  style={styles.input}
                >
                  <option value="">Select time</option>
                  {times.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>

                <div style={{ display: "flex", gap: 10 }}>
                  
                  <button
                    style={{ ...styles.editButton, background: "#16a34a" }}
                    onClick={async () => {
                      await fetch("/api/edit", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          id: a._id,
                          ...editForm,
                        }),
                      });

                      setAppointments((prev) =>
                        prev.map((item) =>
                          item._id === a._id
                            ? { ...item, ...editForm }
                            : item
                        )
                      );

                      setEditingId(null);
                    }}
                  >
                    Save
                  </button>

                  <button
                    style={styles.deleteButton}
                    onClick={() => setEditingId(null)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    paddingTop: 50,
    background: "#acc2ee",
  },

  card: {
    background: "white",
    padding: 30,
    borderRadius: 10,
    width: 500,
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },

  appointment: {
    border: "1px solid #ccc",
    padding: 15,
    borderRadius: 10,
  },

  buttons: {
    display: "flex",
    gap: 10,
    marginTop: 10,
  },

  editBox: {
    marginTop: 10,
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

  editButton: {
    padding: 8,
    background: "#0c49cd",
    color: "white",
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
  },

  deleteButton: {
    padding: 8,
    background: "#c71919",
    color: "white",
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
  },
};