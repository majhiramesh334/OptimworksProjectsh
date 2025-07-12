import React, { useState } from "react";
import useAppState from "../hooks/useAppState.jsx";
import "../styles/Form.css";

const HospitalForm = () => {
  const { addHospital, addNotification } = useAppState();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !location) {
      addNotification("Please fill in all hospital details.");
      return;
    }
    addHospital({ name, location });
    addNotification(`Hospital '${name}' added successfully.`);
    setName("");
    setLocation("");
  };

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <h3>🏥 Register Hospital</h3>
      <input
        type="text"
        placeholder="Hospital Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button type="submit">Add Hospital</button>
    </form>
  );
};

export default HospitalForm;
