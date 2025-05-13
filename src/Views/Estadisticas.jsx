import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { db } from '../database/firebaseconfig';
import { collection, getDocs } from 'firebase/firestore';
import GraficoProductos from '../Components/estadisticas/GraficoProductos';

const Estadisticas = () => {
  const [nombres, setNombres] = useState([]);
  const [precios, setPrecios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const productosRef = collection(db, 'productos');
        const snapshot = await getDocs(productosRef);

        const nombresTemp = [];
        const preciosTemp = [];

        snapshot.forEach((doc) => {
          const data = doc.data();
          nombresTemp.push(data.nombre);
          preciosTemp.push(Number(data.precio));
        });

        setNombres(nombresTemp);
        setPrecios(preciosTemp);
        setLoading(false);
      } catch (error) {
        console.error("Error al cargar productos:", error);
        setLoading(false);
      }
    };

    cargarDatos();
  }, []);

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" />
              <p>Cargando datos...</p>
            </div>
          ) : (
            <GraficoProductos nombres={nombres} precios={precios} />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Estadisticas;
