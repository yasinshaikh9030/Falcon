import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import DashboardCards from "../DashboardCards/DashboardCards";
import FeedbackSection from "../FeedbackSection/FeedbackSection";
import ChartView from "../ChartView/ChartView";
import UploadPitch from "../UploadPitch/UploadPitch";
import ProfilePage from "../ProfilePage/ProfilePage";
import ScheduledMeetings from "../mentors/mentors";
import { Link } from "react-router-dom";
import "../Dashboard/Dashboard.css";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  const pitches = [
    { id: "12345", title: "Pitch 1" },
    { id: "67890", title: "Pitch 2" },
    { id: "11223", title: "Pitch 3" },
  ];

  const renderSection = () => {
    switch (activeSection) {
      case "header":
        return <Header />;
      case "profile":
        return <ProfilePage />;
      case "dashboard":
        return (
          <div>
            <DashboardCards />
            <h3>Your Pitches</h3>
            {pitches.map((pitch) => (
              <div key={pitch.id}>
                <h4>{pitch.title}</h4>
                <Link to={`/feedback/${pitch.id}`}>View Feedback</Link>
              </div>
            ))}
          </div>
        );
      case "feedback":
        return <FeedbackSection />;
      case "charts":
        return <ChartView />;
      case "upload":
        return <UploadPitch />;
      case "mentors":
        return <ScheduledMeetings />;
      default:
        return <ProfilePage />;
    }
  };

  return (
    <div className="d-flex">
      <Sidebar onSelect={setActiveSection} />
      <div className="main-content w-100">{renderSection()}</div>
    </div>
  );
};

export default Dashboard;