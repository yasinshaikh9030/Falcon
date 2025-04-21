import React from "react";
import { Nav } from "react-bootstrap";
import {
  House,
  UploadCloud,
  Users,
  User,
  MessageCircle,
  BarChart2,
} from "lucide-react";
import "../Sidebar/Sidebar.css";

const Sidebar = ({ onSelect }) => {
  return (
    <div className="sidebar">
      <Nav defaultActiveKey="dashboard" className="flex-column">
        <ul>
          <li onClick={() => onSelect("profile")}>
            <User size={18} className="me-2" />
            Profile
          </li>
          <li onClick={() => onSelect("dashboard")}>
            <House size={18} className="me-2" />
            Dashboard
          </li>
          <li onClick={() => onSelect("feedback")}>
            <MessageCircle size={18} className="me-2" />
            Feedback
          </li>
          <li onClick={() => onSelect("charts")}>
            <BarChart2 size={18} className="me-2" />
            Charts
          </li>
          <li onClick={() => onSelect("upload")}>
            <UploadCloud size={18} className="me-2" />
            Upload Pitch
          </li>
          <li onClick={() => onSelect("mentors")}>
            <Users size={18} className="me-2" />
            Mentors
          </li>
        </ul>
      </Nav>
    </div>
  );
};

export default Sidebar;
