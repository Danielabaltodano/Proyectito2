// src/Components/catalogo/TarjetaProducto.jsx
import React from "react";
import { Card, Col, Button } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

const TarjetaProducto = ({ producto, openEditModal, openQRModal, handleCopy }) => {
  return (
    <Col lg={3} md={4} sm={12} className="mb-4">
      <Card className="h-100">
        {producto.imagen && (
          <Card.Img
            variant="top"
            src={producto.imagen}
            alt={producto.nombre}
            style={{
              objectFit: "cover",
              width: "100%",
              height: "200px",
            }}
          />
        )}
        <Card.Body className="d-flex flex-column">
          <Card.Title>{producto.nombre}</Card.Title>
          <Card.Text>
            Precio: C${producto.precio} <br />
            Categoría: {producto.categoria}
          </Card.Text>

          <div className="d-flex justify-content-between mt-auto">
            <Button
              variant="outline-primary"
              onClick={() => openEditModal(producto)}
            >
              Editar
            </Button>
            <Button
              variant="outline-dark"
              onClick={() => openQRModal(producto)}
            >
              <i className="bi bi-qr-code"></i>
            </Button>
            <Button
              variant="outline-success"
              onClick={() => handleCopy(producto)}
            >
              <i className="bi bi-clipboard"></i>
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default TarjetaProducto;