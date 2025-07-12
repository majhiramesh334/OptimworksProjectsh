import React from "react";
import useAppState from "../hooks/useAppState.jsx";
import "../styles/Form.css";

const DoctorDashboard = () => {
  const { doctors, appointments } = useAppState();

  const getDoctorStats = (doctorId) => {
    const docAppointments = appointments.filter((a) => a.doctorId === doctorId);
    const totalEarnings = docAppointments.reduce((sum, app) => sum + app.fee * 0.6, 0); // 60% share
    const totalAppointments = docAppointments.length;
    const earningsByHospital = {};

    docAppointments.forEach((app) => {
      if (!earningsByHospital[app.hospitalId]) {
        earningsByHospital[app.hospitalId] = 0;
      }
      earningsByHospital[app.hospitalId] += app.fee * 0.6;
    });

    return { totalEarnings, totalAppointments, earningsByHospital };
  };

  return (
    <div className="form-card">
      <h3>🩺 Doctor Dashboard</h3>
      {doctors.length === 0 ? (
        <p>No doctors registered yet.</p>
      ) : (
        doctors.map((doc) => {
          const stats = getDoctorStats(doc.id);
          return (
            <div key={doc.id} style={{ marginBottom: "1rem" }}>
              <h4>{doc.name}</h4>
              <p>Total Consultations: {stats.totalAppointments}</p>
              <p>Total Earnings: ₹{stats.totalEarnings.toFixed(2)}</p>
              <p>Earnings by Hospital:</p>
              <ul>
                {Object.entries(stats.earningsByHospital).map(([hospId, earning]) => (
                  <li key={hospId}>Hospital {hospId}: ₹{earning.toFixed(2)}</li>
                ))}
              </ul>
            </div>
          );
        })
      )}
    </div>
  );
};

export default DoctorDashboard;
