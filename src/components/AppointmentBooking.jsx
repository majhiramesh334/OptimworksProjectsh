import React, { useState } from "react";
import useAppState from "../hooks/useAppState.jsx";
import "../styles/Form.css";

const AppointmentBooking = () => {
  const { hospitals, doctors, patients, addAppointment, addNotification } = useAppState();
  const [patientId, setPatientId] = useState("");
  const [hospitalId, setHospitalId] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [date, setDate] = useState("");
  const [fee, setFee] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!patientId || !doctorId || !hospitalId || !specialization || !date || !fee) {
      addNotification("Please fill in all appointment details.");
      return;
    }
    addAppointment({ patientId, doctorId, hospitalId, specialization, date, fee: parseFloat(fee) });
    addNotification("Appointment booked successfully.");
    setPatientId("");
    setDoctorId("");
    setHospitalId("");
    setSpecialization("");
    setDate("");
    setFee("");
  };

  const filteredDoctors = doctors.filter(
    (doc) =>
      doc.specializations.includes(specialization) &&
      doc.associations?.some((a) => parseInt(a.hospitalId) === parseInt(hospitalId))
  );

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <h3>📅 Book Appointment</h3>
      <select value={patientId} onChange={(e) => setPatientId(e.target.value)}>
        <option value="">Select Patient</option>
        {patients.map((pat) => (
          <option key={pat.id} value={pat.id}>
            {pat.name} ({pat.uniqueId})
          </option>
        ))}
      </select>
      <select value={hospitalId} onChange={(e) => setHospitalId(e.target.value)}>
        <option value="">Select Hospital</option>
        {hospitals.map((hosp) => (
          <option key={hosp.id} value={hosp.id}>
            {hosp.name}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Specialization"
        value={specialization}
        onChange={(e) => setSpecialization(e.target.value)}
      />
      <select value={doctorId} onChange={(e) => setDoctorId(e.target.value)}>
        <option value="">Select Doctor</option>
        {filteredDoctors.map((doc) => (
          <option key={doc.id} value={doc.id}>
            {doc.name}
          </option>
        ))}
      </select>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <input
        type="number"
        placeholder="Consultation Fee"
        value={fee}
        onChange={(e) => setFee(e.target.value)}
      />
      <button type="submit">Book Appointment</button>
    </form>
  );
};

export default AppointmentBooking;
