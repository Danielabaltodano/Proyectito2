// src/components/qr/ModalQR.jsx
import React from "react";
import QRCode from "react-qr-code";
import { Modal, Button } from "react-bootstrap";

const ModalQR = ({ show, handleClose, url }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>QR del Libro</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <QRCode value={url} />
        <p className="mt-3">{url}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalQR;
