import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Inicio = () => {
  const navigate = useNavigate();

  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallButton, setShowInstallButton] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  // Detectar si el dispositivo es iOS
  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    setIsIOS(/iphone|ipad|ipod/.test(userAgent));
  }, []);

  // Escuchar el evento beforeinstallprompt (solo Android)
  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallButton(true);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  // Función para disparar la instalación de la PWA
  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === "accepted") {
        console.log("App instalada");
      }
      setDeferredPrompt(null);
      setShowInstallButton(false);
    }
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Inicio</h1>

      {/* Botón de instalación solo si es Android */}
      {showInstallButton && !isIOS && (
        <button
          onClick={handleInstallClick}
          style={{ marginTop: "1rem", padding: "10px 20px", fontSize: "16px" }}
        >
          Instalar App
        </button>
      )}

      {/* Instrucción para iOS */}
      {isIOS && (
        <p style={{ marginTop: "1rem", color: "#555" }}>
          Para instalar esta app en iOS, abre en Safari y selecciona “Agregar a pantalla de inicio”.
        </p>
      )}
    </div>
  );
};

export default Inicio;
