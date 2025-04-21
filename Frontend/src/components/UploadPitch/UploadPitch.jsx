import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./UploadPitch.css";

const UploadPitch = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/pitch-input");
  }, [navigate]);
  return null;
};

export default UploadPitch;
