// src/components/FeedbackSection/FeedbackSection.js
import React, { useState, useEffect } from "react";
import { Card, ListGroup } from "react-bootstrap";
import axios from "axios";
import backendBaseURL from "../utils/apiBase";

const FeedbackSection = () => {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get(`${backendBaseURL}/api/feedback`);
        setFeedback(response.data);
      } catch (error) {
        console.error("Error fetching feedback:", error);
        setFeedback([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  if (loading) return <p>Loading feedback...</p>;

  return (
    <div className="feedback-section">
      <h3>Mentor Feedback</h3>
      {feedback.length === 0 ? (
        <p>No feedback available</p>
      ) : (
        <ListGroup>
          {feedback.map((item, index) => (
            <ListGroup.Item key={index}>
              <Card>
                <Card.Body>
                  <Card.Title>{item.mentorName || "Anonymous Mentor"}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </Card.Subtitle>
                  <Card.Text>{item.text}</Card.Text>
                </Card.Body>
              </Card>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
};

export default FeedbackSection;
