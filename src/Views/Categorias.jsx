// Importaciones
import React, { useState, useEffect } from "react";
import { Container, Button, Col } from "react-bootstrap";
import { db } from "../database/firebaseconfig";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";

// Componentes personalizados
import TablaCategorias from "../Components/categorias/TablaCategorias";
import ModalRegistroCategoria from "../Components/categorias/ModalRegistroCategoria";
import ModalEdicionCategoria from "../Components/categorias/ModalEdicionCategoria";
import ModalEliminacionCategoria from "../Components/categorias/ModalEliminacionCategoria";
import CuadroBusqueda from "../Components/Busquedas/Cuadrobusquedas";
import Paginacion from "../Components/ordenamiento/Paginacion";
import ChatIA from "../Components/chat/ChatIA";
import { useTranslation } from 'react-i18next';


const Categorias = () => {
  // Estados
  const [showChatModal, setShowChatModal] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [nuevaCategoria, setNuevaCategoria] = useState({
    nombre: "",
    descripcion: "",
  });
  const [categoriaEditada, setCategoriaEditada] = useState(null);
  const [categoriaAEliminar, setCategoriaAEliminar] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  const categoriasCollection = collection(db, "categorias");

  const listenCategorias = () => {
    const unsubscribe = onSnapshot(
      categoriasCollection,
      (snapshot) => {
        const fetchedCategorias = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setCategorias(fetchedCategorias);
        if (isOffline) {
          console.log("Offline: Mostrando datos desde la caché local.");
        }
      },
      (error) => {
        console.error("Error al escuchar categorías:", error);
        if (isOffline) {
          console.log("Offline: Mostrando datos desde la caché local.");
        } else {
          alert("Error al cargar las categorías: " + error.message);
        }
      }
    );
    return unsubscribe;
  };

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    setIsOffline(!navigator.onLine);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  useEffect(() => {
    const unsubscribe = listenCategorias();
    return () => unsubscribe();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevaCategoria((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setCategoriaEditada((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddCategoria = async () => {
    if (!nuevaCategoria.nombre || !nuevaCategoria.descripcion) {
      alert("Por favor, completa todos los campos antes de guardar.");
      return;
    }

    setShowModal(false);
    const tempId = `temp_${Date.now()}`;
    const categoriaConId = { ...nuevaCategoria, id: tempId };

    try {
      setCategorias((prev) => [...prev, categoriaConId]);
      setNuevaCategoria({ nombre: "", descripcion: "" });
      await addDoc(categoriasCollection, nuevaCategoria);
      console.log("Categoría agregada exitosamente.");
    } catch (error) {
      console.error("Error al agregar la categoría:", error);
      setCategorias((prev) => prev.filter((cat) => cat.id !== tempId));
      alert("Error al agregar la categoría: " + error.message);
    }
  };

  const handleEditCategoria = async () => {
    if (!categoriaEditada?.nombre || !categoriaEditada?.descripcion) {
      alert("Por favor, completa todos los campos antes de actualizar.");
      return;
    }

    setShowEditModal(false);

    const categoriaRef = doc(db, "categorias", categoriaEditada.id);

    try {
      await updateDoc(categoriaRef, {
        nombre: categoriaEditada.nombre,
        descripcion: categoriaEditada.descripcion,
      });

      console.log("Categoría actualizada exitosamente.");
    } catch (error) {
      console.error("Error al actualizar la categoría:", error);
      alert("Ocurrió un error al actualizar la categoría: " + error.message);
    }
  };

  const handleDeleteCategoria = async () => {
    if (!categoriaAEliminar) return;

    setShowDeleteModal(false);

    try {
      setCategorias((prev) =>
        prev.filter((cat) => cat.id !== categoriaAEliminar.id)
      );
      const categoriaRef = doc(db, "categorias", categoriaAEliminar.id);
      await deleteDoc(categoriaRef);
      console.log("Categoría eliminada exitosamente.");
    } catch (error) {
      console.error("Error al eliminar la categoría:", error);
      setCategorias((prev) => [...prev, categoriaAEliminar]);
      alert("Error al eliminar la categoría: " + error.message);
    }
  };

  const openEditModal = (categoria) => {
    setCategoriaEditada({ ...categoria });
    setShowEditModal(true);
  };

  const openDeleteModal = (categoria) => {
    setCategoriaAEliminar(categoria);
    setShowDeleteModal(true);
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value.toLowerCase());
  };

  const onInsertCategoriaIA = async (categoria) => {
    try {
      await addDoc(categoriasCollection, categoria);
      console.log("✅ Categoría insertada desde IA:", categoria);
    } catch (error) {
      console.error("❌ Error al insertar categoría desde IA:", error);
    }
  };

  const categoriasFiltradas = searchText
    ? categorias.filter(
      (categoria) =>
        categoria.nombre.toLowerCase().includes(searchText) ||
        categoria.descripcion.toLowerCase().includes(searchText)
    )
    : categorias;

  const paginatedCategorias = categoriasFiltradas.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const { t, i18n } = useTranslation();



  return (
    <Container className="mt-5">
      <br />
      <h4>Gestión de Categorías</h4>

      <Button className="mb-3" onClick={() => setShowModal(true)}>
        Agregar categoría
      </Button>

      <Col lg={3} md={4} sm={4} xs={5}>
        <Button
          className="mb-3"
          onClick={() => setShowChatModal(true)}
          style={{ width: "100%" }}
        >
          Chat IA
        </Button>
      </Col>

      <CuadroBusqueda
        searchText={searchText}
        handleSearchChange={handleSearchChange}
      />

      <TablaCategorias
        categorias={paginatedCategorias}
        openEditModal={openEditModal}
        openDeleteModal={openDeleteModal}
        totalItems={categoriasFiltradas.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <Paginacion
        itemsPerPage={itemsPerPage}
        totalItems={categoriasFiltradas.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <ModalRegistroCategoria
        showModal={showModal}
        setShowModal={setShowModal}
        nuevaCategoria={nuevaCategoria}
        handleInputChange={handleInputChange}
        handleAddCategoria={handleAddCategoria}
      />
      <ModalEdicionCategoria
        showEditModal={showEditModal}
        setShowEditModal={setShowEditModal}
        categoriaEditada={categoriaEditada}
        handleEditInputChange={handleEditInputChange}
        handleEditCategoria={handleEditCategoria}
      />
      <ModalEliminacionCategoria
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        handleDeleteCategoria={handleDeleteCategoria}
      />

      <ChatIA
        showChatModal={showChatModal}
        setShowChatModal={setShowChatModal}
        onInsertCategoriaIA={(categoria) => {
          console.log("Categoría creada con IA:", categoria);
        }}
      />
    </Container>
  );
};

export default Categorias;
