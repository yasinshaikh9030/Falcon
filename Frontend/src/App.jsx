import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import Components
import Register from "./components/Register";
import Homepage from './components/Homepage.jsx';

import Dashboard from "./components/Dashboard/Dashboard";
import UploadPitch from "./components/UploadPitch/UploadPitch";
import PitchInput from "./components/PitchInput";
import Mentors from "./components/mentors/mentors";
import Chatbot from "./components/chatbot";
import LoginPage from "./components/LoginPage";
import FeedbackSection from "./components/FeedbackSection/FeedbackSection"; // Import FeedbackSection

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Register />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload-pitch" element={<UploadPitch />} />
        <Route path="/pitch-input" element={<PitchInput />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/mentors" element={<Mentors />} />
        <Route path="/feedback/:pitchId" element={<FeedbackSection />} />
      </Routes>
    </Router>
  );
}

export default App;
