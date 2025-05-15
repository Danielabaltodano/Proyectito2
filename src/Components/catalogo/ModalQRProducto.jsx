import React from "react";
import QRCode from "react-qr-code";
import { Modal, Button } from "react-bootstrap";

const ModalQRProducto = ({ show, handleClose, producto }) => {
  if (!producto) return null;

  const data = `Producto: ${producto.nombre}\nPrecio: C$${producto.precio}\nCategoría: ${producto.categoria}`;

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>QR del Producto</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <QRCode value={data} size={256} />
        <pre className="mt-3">{data}</pre>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalQRProducto;
