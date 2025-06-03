import React, { useState, useEffect } from "react";
import { Container, Row, Form, Col } from "react-bootstrap";
import { db } from "../database/firebaseconfig";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import TarjetaProducto from "../Components/catalogo/TarjetaProducto";
import ModalEdicionProducto from "../Components/productos/ModalEdicionProducto";
import ModalQRProducto from "../Components/catalogo/ModalQRProducto";
import { useTranslation } from 'react-i18next';


const Catalogo = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todas");

  const [showEditModal, setShowEditModal] = useState(false);
  const [productoEditado, setProductoEditado] = useState(null);

  const [showQRModal, setShowQRModal] = useState(false);
  const [productoQR, setProductoQR] = useState(null);

  const openQRModal = (producto) => {
    setProductoQR(producto);
    setShowQRModal(true);
  };

  const closeQRModal = () => setShowQRModal(false);

  const handleCopy = (producto) => {
    const rowData = `Nombre: ${producto.nombre}\nPrecio: C$${producto.precio}\nCategoría: ${producto.categoria}`;
    navigator.clipboard
      .writeText(rowData)
      .then(() => {
        console.log("Datos copiados al portapapeles:\n" + rowData);
        alert("✅ Datos copiados al portapapeles.");
      })
      .catch((err) => {
        console.error("❌ Error al copiar al portapapeles:", err);
      });
  };

  const productosCollection = collection(db, "productos");
  const categoriasCollection = collection(db, "categorias");

  const fetchData = async () => {
    try {
      const productosData = await getDocs(productosCollection);
      const fetchedProductos = productosData.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setProductos(fetchedProductos);

      const categoriasData = await getDocs(categoriasCollection);
      const fetchedCategorias = categoriasData.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setCategorias(fetchedCategorias);
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openEditModal = (producto) => {
    setProductoEditado({ ...producto });
    setShowEditModal(true);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setProductoEditado((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProductoEditado((prev) => ({ ...prev, imagen: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditProducto = async () => {
    if (!productoEditado.nombre || !productoEditado.precio || !productoEditado.categoria) {
      alert("Por favor, completa todos los campos requeridos.");
      return;
    }
    try {
      const productoRef = doc(db, "productos", productoEditado.id);
      await updateDoc(productoRef, productoEditado);
      setShowEditModal(false);
      setProductoEditado(null);
      fetchData();
    } catch (error) {
      console.error("Error al actualizar producto:", error);
    }
  };

  const productosFiltrados =
    categoriaSeleccionada === "Todas"
      ? productos
      : productos.filter((producto) => producto.categoria === categoriaSeleccionada);

  const { t, i18n } = useTranslation();
    

  return (
    <Container className="mt-5">
      <br />
      <h4>Catálogo de Productos</h4>

      <Row>
        <Col lg={3} md={3} sm={6}>
          <Form.Group className="mb-3">
            <Form.Label>Filtrar por categoría:</Form.Label>
            <Form.Select
              value={categoriaSeleccionada}
              onChange={(e) => setCategoriaSeleccionada(e.target.value)}
            >
              <option value="Todas">Todas</option>
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.nombre}>
                  {categoria.nombre}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <ModalEdicionProducto
        showEditModal={showEditModal}
        setShowEditModal={setShowEditModal}
        productoEditado={productoEditado}
        handleEditInputChange={handleEditInputChange}
        handleEditImageChange={handleEditImageChange}
        handleEditProducto={handleEditProducto}
        categorias={categorias}
      />

      <Row>
        {productosFiltrados.length > 0 ? (
          productosFiltrados.map((producto) => (
            <TarjetaProducto
              key={producto.id}
              producto={producto}
              openEditModal={openEditModal}
              openQRModal={openQRModal}
              handleCopy={handleCopy}
            />
          ))
        ) : (
          <p>No hay productos en esta categoría.</p>
        )}
      </Row>

      <ModalQRProducto
        show={showQRModal}
        handleClose={closeQRModal}
        producto={productoQR}
      />
    </Container>
  );
};

export default Catalogo;