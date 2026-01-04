// Frontend/src/pages/TelehealthConsultations.jsx
import React, { useState, useEffect } from "react"; // Import useState and useEffect
import { Link } from "react-router-dom";
import Chat from "../Component/Chat.jsx"; // Ensure Chat component is imported
import Header from"../Component/Header.jsx"; // Import Header component
function TelehealthConsultations() {
  const [isChatOpen, setIsChatOpen] = useState(false); // State to control chat visibility

  // Use useEffect to open the chat when the component mounts
  useEffect(() => {
    setIsChatOpen(true); // Automatically open chat when page loads
  }, []); // Empty dependency array means this runs once ogn mount

  return (
    <div>
    
      {/* Chat component, now controlled by isChatOpen state */}
      <Chat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
}

export default TelehealthConsultations;
