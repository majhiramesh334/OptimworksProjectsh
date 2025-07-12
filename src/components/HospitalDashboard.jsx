import React, { useEffect } from "react";
import useAppState from "../hooks/useAppState.jsx";
import "../styles/Form.css";

const HospitalDashboard = () => {
  const { hospitals, doctors, appointments, addNotification } = useAppState();

  useEffect(() => {
    if (hospitals.length > 0) {
      addNotification("✅ Hospital Dashboard loaded successfully.");
    }
  }, [hospitals]);

  const calculateRevenue = (hospitalId) => {
    const hospitalDoctors = doctors.filter((doc) =>
      doc.associations?.some((assoc) => assoc.hospitalId === hospitalId)
    );
    const doctorIds = hospitalDoctors.map((doc) => doc.id);
    const hospitalAppointments = appointments.filter((a) => doctorIds.includes(a.doctorId));
    return hospitalAppointments.reduce((sum, app) => sum + app.fee, 0);
  };

  const getRevenueByDepartment = (hospitalId) => {
    const result = {};
    const hospital = hospitals.find((h) => h.id === hospitalId);
    if (!hospital || !hospital.departments) return result;

    hospital.departments.forEach((dept) => {
      const deptDoctors = doctors.filter(
        (doc) =>
          doc.specializations.includes(dept) &&
          doc.associations?.some((assoc) => assoc.hospitalId === hospitalId)
      );
      const doctorIds = deptDoctors.map((doc) => doc.id);
      const deptAppointments = appointments.filter((a) => doctorIds.includes(a.doctorId));
      const deptRevenue = deptAppointments.reduce((sum, app) => sum + app.fee, 0);
      result[dept] = deptRevenue;
    });

    return result;
  };

  return (
    <div className="form-card">
      <h3>📊 Hospital Dashboard</h3>
      {hospitals.length === 0 ? (
        <p>No hospitals registered yet.</p>
      ) : (
        hospitals.map((hospital) => (
          <div key={hospital.id} style={{ marginBottom: "1rem" }}>
            <h4>{hospital.name} ({hospital.location})</h4>
            <p>Total Revenue: ₹{calculateRevenue(hospital.id)}</p>
            <p>Departments:</p>
            <ul>
              {Object.entries(getRevenueByDepartment(hospital.id)).map(([dept, rev]) => (
                <li key={dept}>{dept}: ₹{rev}</li>
              ))}
            </ul>
            <p>Associated Doctors:</p>
            <ul>
              {doctors
                .filter((doc) =>
                  doc.associations?.some((assoc) => assoc.hospitalId === hospital.id)
                )
                .map((doc) => (
                  <li key={doc.id}>{doc.name}</li>
                ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default HospitalDashboard;
