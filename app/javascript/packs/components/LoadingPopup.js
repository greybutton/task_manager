import React from "react";
import { Modal, Button } from "react-bootstrap";

const LoadingPopup = ({ show, onClose }) => (
  <Modal show={show} onHide={onClose}>
    <Modal.Header closeButton>
      <Modal.Title>Info</Modal.Title>
    </Modal.Header>
    <Modal.Body>Your task is loading. Please be patient.</Modal.Body>
    <Modal.Footer>
      <Button onClick={onClose}>Close</Button>
    </Modal.Footer>
  </Modal>
);

export default LoadingPopup;
