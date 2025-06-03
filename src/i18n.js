import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      es: {
        translation: {
          menu: {
            titulo: "Menú",
            inicio: "Inicio",
            categorias: "Categorías",
            productos: "Productos",
            catalogo: "Catálogo",
            libros: "Libros",
            clima: "Clima",
            pronunciacion: "Pronunciación",
            estadisticas: "Estadísticas",
            cerrarSesion: "Cerrar Sesión",
            iniciarSesion: "Iniciar Sesión"
          },
          productos: {
            titulo: "Gestión de Productos",
            agregar: "Agregar producto",
            pdf: "Generar PDF",
            pdfImagen: "PDF con Imagen",
            excel: "Generar Excel",
            buscar: "Buscar",
            imagen: "Imagen",
            nombre: "Nombre",
            precio: "Precio",
            categoria: "Categoría",
            acciones: "Acciones"
          },
          categorias: {
            titulo: "Gestión de Categorías",
            agregar: "Agregar categoría",
            descripcion: "Descripción",
            buscar: "Buscar",
            editar: "Editar",
            eliminar: "Eliminar"
          },
          catalogo: {
            titulo: "Catálogo de Productos",
            filtrar: "Filtrar por categoría:",
            editar: "Editar"
          },
          libros: {
            titulo: "Gestión de Libros",
            agregar: "Agregar libro",
            autor: "Autor",
            genero: "Género",
            pdf: "PDF",
            copiar: "Copiar",
            editar: "Editar",
            eliminar: "Eliminar"
          },
          clima: {
            titulo: "Clima por Hora",
            ubicacion: "Seleccionar Ubicación",
            automatica: "Ubicación Automática",
            manual: "Ubicación Manual",
            cargar: "Cargar",
            error: "Por favor, ingresa o detecta una ubicación válida."
          },
          pronunciacion: {
            titulo: "Ejercicio de Pronunciación",
            instruccion: "Pronuncia esta palabra:",
            hablar: "Hablar",
            nueva: "Nueva Palabra",
            error: "No se pudo acceder al micrófono."
          },
          estadisticas: {
            titulo: "Estadísticas de Productos",
            precio: "Precio de productos"
          }
        }
      },
      en: {
        translation: {
          menu: {
            titulo: "Menu",
            inicio: "Home",
            categorias: "Categories",
            productos: "Products",
            catalogo: "Catalog",
            libros: "Books",
            clima: "Weather",
            pronunciacion: "Pronunciation",
            estadisticas: "Statistics",
            cerrarSesion: "Log out",
            iniciarSesion: "Login"
          },
          productos: {
            titulo: "Product Management",
            agregar: "Add product",
            pdf: "Generate PDF",
            pdfImagen: "PDF with Image",
            excel: "Generate Excel",
            buscar: "Search",
            imagen: "Image",
            nombre: "Name",
            precio: "Price",
            categoria: "Category",
            acciones: "Actions"
          },
          categorias: {
            titulo: "Category Management",
            agregar: "Add category",
            descripcion: "Description",
            buscar: "Search",
            editar: "Edit",
            eliminar: "Delete"
          },
          catalogo: {
            titulo: "Product Catalog",
            filtrar: "Filter by category:",
            editar: "Edit"
          },
          libros: {
            titulo: "Book Management",
            agregar: "Add book",
            autor: "Author",
            genero: "Genre",
            pdf: "PDF",
            copiar: "Copy",
            editar: "Edit",
            eliminar: "Delete"
          },
          clima: {
            titulo: "Hourly Weather",
            ubicacion: "Select Location",
            automatica: "Automatic Location",
            manual: "Manual Location",
            cargar: "Load",
            error: "Please enter or detect a valid location."
          },
          pronunciacion: {
            titulo: "Pronunciation Exercise",
            instruccion: "Say this word:",
            hablar: "Speak",
            nueva: "New Word",
            error: "Microphone access failed."
          },
          estadisticas: {
            titulo: "Product Statistics",
            precio: "Product Price"
          }
        }
      }
    },
    fallbackLng: 'es',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
