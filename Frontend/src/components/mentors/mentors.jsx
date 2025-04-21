import React, { useState } from "react";
import "./mentors.css";
import {
  Card,
  Container,
  Row,
  Col,
  Modal,
  Button,
  Form,
  Toast,
} from "react-bootstrap";

const Mentors = () => {
  const mentors = [
    { name: "Dr. Anjali Mehra", field: "AI & Machine Learning", available: true, email: "anjali@example.com" },
    { name: "Rajiv Sinha", field: "Startup Growth", available: false, email: "rajiv@example.com" },
    { name: "Sneha Kapoor", field: "Finance & Investment", available: true, email: "sneha@example.com" },
  ];

  const [show, setShow] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    duration: "",
    subject: "",
  });
  const [meetingLink, setMeetingLink] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [copyText, setCopyText] = useState("Copy Link");

  const handleClose = () => {
    setShow(false);
    setFormData({ date: "", time: "", duration: "", subject: "" });
  };

  const handleShow = (mentor) => {
    setSelectedMentor(mentor);
    setShow(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCopy = () => {
    if (meetingLink) {
      navigator.clipboard.writeText(meetingLink);
      setCopyText("Copied!");
      setTimeout(() => setCopyText("Copy Link"), 2000);
    }
  };

  const handleSubmit = async () => {
    if (!selectedMentor) return;

    const { date, time, duration, subject } = formData;

    const startDateTime = new Date(`${date}T${time}`);
    const endDateTime = new Date(startDateTime.getTime() + duration * 60000);

    const meetLink = `https://meet.google.com/lookup/${Math.random().toString(36).substring(7)}`;

    const meetingDetails = {
      mentor: selectedMentor.name,
      subject,
      start: startDateTime.toISOString(),
      end: endDateTime.toISOString(),
      meetLink,
    };

    console.log("📅 Meeting Scheduled:", meetingDetails);

    setMeetingLink(meetLink);
    setShow(false);
    setShowSuccessModal(true);
  };

  return (
    <Container className="mentors-container mt-4">
      <h2 className="mb-4">Mentor Directory</h2>
      <Row className="g-4">
        {mentors.map((mentor, index) => (
          <Col md={4} key={index}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title>{mentor.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {mentor.field}
                </Card.Subtitle>
                <Card.Text>
                  <strong>Status:</strong>{" "}
                  <span className={mentor.available ? "text-success" : "text-danger"}>
                    {mentor.available ? "Available" : "Unavailable"}
                  </span>
                </Card.Text>
                {mentor.available && (
                  <Button variant="primary" onClick={() => handleShow(mentor)}>
                    Schedule Meeting
                  </Button>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Meeting Scheduler Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Schedule Meeting with {selectedMentor?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control type="date" name="date" value={formData.date} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Time</Form.Label>
              <Form.Control type="time" name="time" value={formData.time} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Duration (minutes)</Form.Label>
              <Form.Control type="number" name="duration" value={formData.duration} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Subject</Form.Label>
              <Form.Control type="text" name="subject" placeholder="Subject of the meeting" value={formData.subject} onChange={handleChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleSubmit}>
            Schedule
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Meeting Success Modal */}
      <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Meeting Scheduled Successfully</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Meeting link:</p>
          <div className="d-flex align-items-center">
            <Form.Control type="text" value={meetingLink || ""} readOnly className="me-2" />
            <Button variant="outline-primary" onClick={handleCopy}>
              {copyText}
            </Button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => setShowSuccessModal(false)}>
            Done
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Mentors;
