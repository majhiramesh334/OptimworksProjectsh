import React from "react";
import useAppState from "../hooks/useAppState.jsx";
import "../styles/Form.css";

const PatientHistory = () => {
  const { patients, doctors, hospitals, appointments } = useAppState();

  const getDoctorName = (id) => doctors.find((doc) => doc.id === id)?.name || "Unknown";
  const getHospitalName = (id) => hospitals.find((hosp) => hosp.id === id)?.name || "Unknown";
  const getPatientAppointments = (patientId) => appointments.filter((a) => a.patientId === patientId);

  return (
    <div className="form-card">
      <h3>📝 Patient History</h3>
      {patients.length === 0 ? (
        <p>No patients registered yet.</p>
      ) : (
        patients.map((pat) => {
          const history = getPatientAppointments(pat.id);
          return (
            <div key={pat.id} style={{ marginBottom: "1rem" }}>
              <h4>{pat.name} ({pat.uniqueId})</h4>
              {history.length === 0 ? (
                <p>No appointments yet.</p>
              ) : (
                <ul>
                  {history.map((h, index) => (
                    <li key={index}>
                      {h.date} - {getDoctorName(h.doctorId)} at {getHospitalName(h.hospitalId)} (₹{h.fee})
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default PatientHistory;
