// Importaciones
import React, { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import { db } from "../database/firebaseconfig";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

// Importaciones de componentes personalizados
import TablaCategorias from "../Components/categorias/TablaCategorias";
import ModalRegistroCategoria from "../Components/categorias/ModalRegistroCategoria";
import ModalEdicionCategoria from "../Components/categorias/ModalEdicionCategoria";
import ModalEliminacionCategoria from "../Components/categorias/ModalEliminacionCategoria";
import CuadroBusqueda from "../Components/Busquedas/Cuadrobusquedas";
import Paginacion from "../Components/ordenamiento/Paginacion"; // ✅ NUEVO

const Categorias = () => {
  // Estados
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

  // Referencia a colección
  const categoriasCollection = collection(db, "categorias");

  // Escuchar cambios en categorías
  const listenCategorias = () => {
    const unsubscribe = onSnapshot(
      categoriasCollection,
      (snapshot) => {
        const fetchedCategorias = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setCategorias(fetchedCategorias);
        console.log("Categorías cargadas desde Firestore:", fetchedCategorias);
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

  // Escuchar conexión offline/online
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

  // Cargar categorías al montar
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
    try {
      await addDoc(categoriasCollection, nuevaCategoria);
      setShowModal(false);
      setNuevaCategoria({ nombre: "", descripcion: "" });
    } catch (error) {
      console.error("Error al agregar la categoría:", error);
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

      if (isOffline) {
        setCategorias((prev) =>
          prev.map((cat) =>
            cat.id === categoriaEditada.id ? { ...categoriaEditada } : cat
          )
        );
        console.log("Categoría actualizada localmente (sin conexión).");
        alert(
          "Sin conexión: Categoría actualizada localmente. Se sincronizará cuando haya internet."
        );
      } else {
        console.log("Categoría actualizada exitosamente en la nube.");
      }
    } catch (error) {
      console.error("Error al actualizar la categoría:", error);
      alert("Ocurrió un error al actualizar la categoría: " + error.message);
    }
  };

  const handleDeleteCategoria = async () => {
    if (categoriaAEliminar) {
      try {
        const categoriaRef = doc(db, "categorias", categoriaAEliminar.id);
        await deleteDoc(categoriaRef);
        setShowDeleteModal(false);
      } catch (error) {
        console.error("Error al eliminar la categoría:", error);
      }
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

  return (
    <Container className="mt-5">
      <br />
      <h4>Gestión de Categorías</h4>

      <Button className="mb-3" onClick={() => setShowModal(true)}>
        Agregar categoría
      </Button>

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
    </Container>
  );
};

export default Categorias;