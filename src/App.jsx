import React, { useState, useEffect } from "react";
import "./styles/App.css";
import HospitalForm from "./components/HospitalForm.jsx";
import DoctorForm from "./components/DoctorForm.jsx";
import PatientForm from "./components/PatientForm.jsx";
import AppointmentBooking from "./components/AppointmentBooking.jsx";
import HospitalDashboard from "./components/HospitalDashboard.jsx";
import DoctorDashboard from "./components/DoctorDashboard.jsx";
import PatientHistory from "./components/PatientHistory.jsx";
import Notification from "./components/Notification.jsx";
import { AppStateProvider } from "./hooks/useAppState.jsx";
import LoginForm from "./components/LoginForm.jsx";
import RegisterForm from "./components/RegisterForm.jsx";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("loggedIn") === "true";
    setLoggedIn(isLoggedIn);
  }, []);

  const handleLogin = () => {
    localStorage.setItem("loggedIn", "true");
    setLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    setLoggedIn(false);
  };

  return (
    <AppStateProvider>
      <div className="app-container">
        {!loggedIn ? (
          showRegister ? (
            <RegisterForm onBack={() => setShowRegister(false)} onRegister={() => setShowRegister(false)} />
          ) : (
            <LoginForm onLogin={handleLogin} onRegisterClick={() => setShowRegister(true)} />
          )
        ) : (
          <>
            <div className="header">
              <h1>🏥 My Hospital Management App</h1>
              <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </div>
            <div className="section">
              <HospitalForm />
              <DoctorForm />
              <PatientForm />
            </div>
            <div className="section">
              <AppointmentBooking />
            </div>
            <div className="section">
              <HospitalDashboard />
              <DoctorDashboard />
              <PatientHistory />
            </div>
            <Notification />
          </>
        )}
      </div>
    </AppStateProvider>
  );
}

export default App;