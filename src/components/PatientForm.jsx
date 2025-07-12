import React, { useState } from "react";
import useAppState from "../hooks/useAppState.jsx";
import "../styles/Form.css";

const PatientForm = () => {
  const { addPatient, addNotification } = useAppState();
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [uniqueId, setUniqueId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !gender || !dob || !uniqueId) {
      addNotification("Please fill in all patient details.");
      return;
    }
    addPatient({ name, gender, dob, uniqueId });
    addNotification(`Patient '${name}' registered.`);
    setName("");
    setGender("");
    setDob("");
    setUniqueId("");
  };

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <h3>🧍‍♂️ Register Patient</h3>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <select value={gender} onChange={(e) => setGender(e.target.value)}>
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
      <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
      <input type="text" placeholder="Unique ID (Aadhar/Passport)" value={uniqueId} onChange={(e) => setUniqueId(e.target.value)} />
      <button type="submit">Register Patient</button>
    </form>
  );
};

export default PatientForm;