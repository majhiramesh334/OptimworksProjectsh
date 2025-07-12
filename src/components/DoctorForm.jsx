import React, { useState } from "react";
import useAppState from "../hooks/useAppState.jsx";
import "../styles/Form.css";

const DoctorForm = () => {
  const { hospitals, addDoctor, addNotification } = useAppState();
  const [name, setName] = useState("");
  const [qualifications, setQualifications] = useState("");
  const [specializations, setSpecializations] = useState("");
  const [experience, setExperience] = useState("");
  const [hospitalId, setHospitalId] = useState("");
  const [fee, setFee] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !qualifications || !specializations || !experience || !hospitalId || !fee) {
      addNotification("Please fill in all doctor details.");
      return;
    }
    const doctor = {
      name,
      qualifications,
      specializations: specializations.split(",").map((s) => s.trim()),
      experience: parseInt(experience),
      fee: parseFloat(fee),
      associations: [{ hospitalId: parseInt(hospitalId), fee: parseFloat(fee) }],
    };
    addDoctor(doctor);
    addNotification(`Doctor '${name}' added successfully.`);
    setName("");
    setQualifications("");
    setSpecializations("");
    setExperience("");
    setHospitalId("");
    setFee("");
  };

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <h3>👨‍⚕️ Register Doctor</h3>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input
        type="text"
        placeholder="Qualifications"
        value={qualifications}
        onChange={(e) => setQualifications(e.target.value)}
      />
      <input
        type="text"
        placeholder="Specializations (comma-separated)"
        value={specializations}
        onChange={(e) => setSpecializations(e.target.value)}
      />
      <input
        type="number"
        placeholder="Experience (years)"
        value={experience}
        onChange={(e) => setExperience(e.target.value)}
      />
      <select value={hospitalId} onChange={(e) => setHospitalId(e.target.value)}>
        <option value="">Select Hospital</option>
        {hospitals.map((hosp) => (
          <option key={hosp.id} value={hosp.id}>
            {hosp.name}
          </option>
        ))}
      </select>
      <input
        type="number"
        placeholder="Consultation Fee"
        value={fee}
        onChange={(e) => setFee(e.target.value)}
      />
      <button type="submit">Add Doctor</button>
    </form>
  );
};

export default DoctorForm;
