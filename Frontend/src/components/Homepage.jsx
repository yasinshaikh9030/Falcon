import React, { useState, useEffect } from "react";
import "./homepage.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Homepage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [pitches, setPitches] = useState([]);
  const [filteredPitches, setFilteredPitches] = useState([]);
  const [allFeedback, setAllFeedback] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    fetchPitches();
  }, []);

  const fetchPitches = async () => {
    try {
      const res = await axios.get("https://falcon-backend-ochre.vercel.app/");
      setPitches(res.data);
      setFilteredPitches(res.data);
      fetchAllFeedback(res.data);
    } catch (error) {
      console.error("Error fetching pitches:", error);
      alert("⚠️ Failed to load startup pitches. Please check the backend.");
    }
  };

  const fetchAllFeedback = async (pitchesData) => {
    const feedbackMap = {};
    for (const pitch of pitchesData) {
      try {
        const res = await axios.get(`https://falcon-backend-ochre.vercel.app/`);
        feedbackMap[pitch._id] = res.data;
      } catch (error) {
        console.error(`Error fetching feedback for ${pitch._id}:`, error);
        feedbackMap[pitch._id] = [];
      }
    }
    setAllFeedback(feedbackMap);
  };

  const handleSearch = async () => {
    const trimmed = searchTerm.trim().toLowerCase();
    if (!trimmed) {
      setFilteredPitches(pitches);
      return;
    }

    try {
      const res = await axios.get(`https://falcon-backend-ochre.vercel.app/`);
      if (Array.isArray(res.data) && res.data.length > 0) {
        setFilteredPitches(res.data);
        fetchAllFeedback(res.data);
      } else {
        alert("No startup found.");
        setFilteredPitches([]);
      }
    } catch (error) {
      console.error("Error searching for pitch:", error);
      alert("Search failed. Try again.");
    }
  };

  const handleLike = async (pitchId) => {
    try {
      await axios.post(`https://falcon-backend-ochre.vercel.app/`);
      alert("✅ Liked!");
    } catch (error) {
      console.error("Error liking the pitch:", error);
      alert("Failed to like. Try again.");
    }
  };

  const handleFeedback = async (pitchId) => {
    const feedback = prompt("Enter your feedback:");
    if (!feedback) return;

    try {
      await axios.post(`https://falcon-backend-ochre.vercel.app/api/feedback/${pitchId}`, { text: feedback });
      alert("✅ Feedback submitted!");
      const updated = await axios.get(`https://falcon-backend-ochre.vercel.app/api/feedback/${pitchId}`);
      setAllFeedback((prev) => ({ ...prev, [pitchId]: updated.data }));
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Failed to submit feedback.");
    }
  };

  return (
    <div className="homepage-container">
      <nav className="navbar">
        <h1 className="logo">LaunchPad</h1>
        <div className="nav-item">Home</div>
        <Link to="/mentors" className="nav-item">Mentors</Link>
        <Link to="/chatbot" className="nav-item">Chat with AI</Link>
        <div className="nav-item" onClick={() => navigate("/dashboard")}>Profile</div>
      </nav>

      {/* Search Bar */}
      <div className="search-header">
        <img
          src="src/assets/images/startup.jpeg"
          alt="Header Visual"
          className="search-header-image"
        />
        <div className="tag-header">
          <h2 className="tagline">Pitch. Connect. Launch.</h2>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search by Startup Name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
            />
            <button onClick={handleSearch}>🔍</button>
          </div>
        </div>
      </div>

      {/* Results */}
      {filteredPitches.length > 0 ? (
        filteredPitches.map((pitch) => (
          <div className="profile-cards-container" key={pitch._id}>
            <div className="profile-card">
              <div className="profile-header">
                <div className="profile-icon"></div>
                <div className="profile-info"></div>
              </div>

              <div className="startup-details">
                <p><strong>Name of Startup:</strong> {pitch.startupName}</p>
                <p><strong>Type of Startup:</strong> {pitch.startupType}</p>
                <p><strong>Pitch:</strong> {pitch.pitch}</p>
                <p>
                  <strong>Video URL:</strong>{" "}
                  <a href={pitch.videoUrl} target="_blank" rel="noreferrer">
                    Watch Demo
                  </a>
                </p>
                <p><strong>Ask:</strong> ₹{pitch.cost}</p>
                <p><strong>Startup Location:</strong> {pitch.location}</p>
                <p><strong>Mode:</strong> {pitch.mode}</p>
              </div>

              <div className="buttons">
                <button className="like-button" onClick={() => handleLike(pitch._id)}>👍 Like</button>
                <button className="feedback-button" onClick={() => handleFeedback(pitch._id)}>💬 Add Feedback</button>
              </div>

              {/* Feedback Section */}
              <div className="feedback-section">
                {allFeedback[pitch._id]?.length > 0 ? (
                  allFeedback[pitch._id].map((fb, i) => (
                    <div key={i} className="feedback-box">
                      <p>🗣 {fb.text}</p>
                      <p style={{ fontSize: "0.8em", color: "#777" }}>
                        {new Date(fb.createdAt).toLocaleString()}
                      </p>
                    </div>
                  ))
                ) : (
                  <p style={{ fontStyle: "italic", color: "gray" }}>No feedback yet.</p>
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="no-results">No pitches found.</div>
      )}
    </div>
  );
};

export default Homepage;
