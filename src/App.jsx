import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./database/authcontext";
import ProtectedRoute from "./Components/ProtectedRoute";
import Login from './Views/Login';
import Encabezado from "./Components/Encabezado";
import Inicio from "./Views/Inicio";
import Categorias from "./Views/Categorias"; 
import Productos from "./Views/Productos";
import Catalogo from "./Views/Catalogo";
import Libros from "./Views/Libros";


import "./App.css";



function App() {
  return (
    <AuthProvider>
      <Router>
          <Encabezado />
          <main className="margen-superior-main">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/inicio" element={<ProtectedRoute element={<Inicio />} />} />
              <Route path="/categorias" element={<ProtectedRoute element={<Categorias />} />}/>
              <Route path="/productos" element={<ProtectedRoute element={<Productos />} />}/>
              <Route path="/Catalogo" element={<ProtectedRoute element={<Catalogo />} />}/>
              <Route path="/Libros" element={<ProtectedRoute element={<Libros />} />}/>
            </Routes>
          </main>
      </Router>
    </AuthProvider>
  )
}

export default App;
