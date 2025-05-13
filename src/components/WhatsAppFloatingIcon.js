// src/components/WhatsAppFloatingIcon.js
import React from "react";

const WhatsAppFloatingIcon = () => {
  const phoneNumber = "9632492563"; // Replace with your number

  return (
    <a
      href={`https://wa.me/${phoneNumber}`}
      className="whatsapp-float"
      target="_blank"
      rel="noopener noreferrer"
    >
      <i className="fab fa-whatsapp whatsapp-icon"></i>
    </a>
  );
};

export default WhatsAppFloatingIcon;
