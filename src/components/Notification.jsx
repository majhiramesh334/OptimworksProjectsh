import React from "react";
import useAppState from "../hooks/useAppState.jsx";
import "../styles/Form.css";

const Notification = () => {
  const { notifications } = useAppState();

  return (
    <div className="notification-wrapper">
      {notifications.map((note, index) => (
        <div key={index} className="notification">
          {note}
        </div>
      ))}
    </div>
  );
};

export default Notification;
