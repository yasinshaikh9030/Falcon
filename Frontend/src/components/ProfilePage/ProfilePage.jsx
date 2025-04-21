import React, { useEffect, useState } from "react";
import "./ProfilePage.css";

const ProfilePage = ({ userId }) => {
  const [profile, setProfile] = useState(null);
  const [pitches, setPitches] = useState([]);

  useEffect(() => {
    // Simulated static data (replace with real API later)
    const dummyProfile = {
      name: "Yasin Shaikh",
      startupName: "LaunchPad",
      location: "Solapur, India",
      role: "Founder",
      profilePicURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwM6spbqnqmJisokXPpJLH8vksywzsSFAl1w&s",
    };

    const dummyPitches = [
      {
        title: "AI-driven Startup Platform",
        description:
          "A web app to help early-stage startups pitch ideas and connect with mentors.",
        fileURL: "https://example.com/pitch1",
      },
      {
        title: "Blockchain for Farmers",
        description:
          "A solution for tracking agricultural produce using blockchain.",
        fileURL: "https://example.com/pitch2",
      },
    ];

    // Set state
    setProfile(dummyProfile);
    setPitches(dummyPitches);
  }, [userId]);

  return (
    <div className="profile-page-container">
      {profile && (
        <div className="profile-header">
          <img
            src={profile.profilePicURL}
            alt="Profile"
            className="profile-pic"
          />
          <div className="profile-info">
            <h2>{profile.name}</h2>
            <p>
              <strong>Startup:</strong> {profile.startupName}
            </p>
            <p>
              <strong>Location:</strong> {profile.location}
            </p>
            <p>
              <strong>Role:</strong> {profile.role}
            </p>
          </div>
        </div>
      )}

      <div className="pitches-section">
        <h3>Uploaded Pitches</h3>
        {pitches.length > 0 ? (
          <div className="pitches-list">
            {pitches.map((pitch, index) => (
              <div key={index} className="pitch-card">
                <h4>{pitch.title}</h4>
                <p>{pitch.description}</p>
                <a
                  href={pitch.fileURL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Pitch
                </a>
              </div>
            ))}
          </div>
        ) : (
          <p>No pitches uploaded yet.</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
