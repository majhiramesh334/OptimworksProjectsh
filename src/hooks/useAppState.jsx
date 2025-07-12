import React, { createContext, useContext, useState } from "react";

const AppStateContext = createContext();

export const AppStateProvider = ({ children }) => {
  const [hospitals, setHospitals] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const addHospital = (hospital) => {
    setHospitals((prev) => [...prev, { ...hospital, id: Date.now(), departments: ["Cardiology", "Orthopedics", "Pediatrics"] }]);
  };

  const addDoctor = (doctor) => {
    setDoctors((prev) => [...prev, { ...doctor, id: Date.now(), associations: [], availability: [] }]);
  };

  const addPatient = (patient) => {
    setPatients((prev) => [...prev, { ...patient, id: Date.now() }]);
  };

  const addAppointment = (appointment) => {
    setAppointments((prev) => [...prev, { ...appointment, id: Date.now() }]);
  };

  const addNotification = (message) => {
    setNotifications((prev) => [...prev, message]);
    setTimeout(() => {
      setNotifications((prev) => prev.slice(1));
    }, 4000);
  };

  return (
    <AppStateContext.Provider
      value={{
        hospitals,
        doctors,
        patients,
        appointments,
        notifications,
        addHospital,
        addDoctor,
        addPatient,
        addAppointment,
        addNotification,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

const useAppState = () => useContext(AppStateContext);

export default useAppState;
