import React from "react";
import { Container } from "react-bootstrap";

const Header = () => {
  return (
    <div className="bg-light py-3 border-bottom shadow-sm">
      <Container>
        <h4 className="mb-0 fw-bold text-primary">🚀 Dashboard Overview</h4>
      </Container>
    </div>
  );
};

export default Header;
