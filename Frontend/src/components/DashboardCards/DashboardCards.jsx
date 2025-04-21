import React, { useEffect, useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import "./DashboardCards.css";

const DashboardCards = () => {
  const [stats, setStats] = useState({ views: 0, feedbacks: 0, likes: 0 });

  useEffect(() => {
    const sampleStats = { views: 120, feedbacks: 45, likes: 8.2 };
    setStats(sampleStats);
  }, []);

  return (
    <div className="dashboard-container p-4">
      <Row className="g-4">
        <Col md={4}>
          <Card className="custom-card">
            <Card.Body>
              <Card.Title>Total Views</Card.Title>
              <Card.Text>{stats.views}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="custom-card">
            <Card.Body>
              <Card.Title>Total Feedbacks</Card.Title>
              <Card.Text>{stats.feedbacks}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="custom-card">
            <Card.Body>
              <Card.Title>Total Likes</Card.Title>
              <Card.Text>{stats.likes}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardCards;
