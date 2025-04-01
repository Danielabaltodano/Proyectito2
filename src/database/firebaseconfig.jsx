import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Configuración de Firebase usando variables de entorno
const firebaseConfig = {
  apiKey: "AIzaSyBplIlFUaAbeIwxeOnKEFXtyByeaWSTzg4",
  authDomain: "proyectito2-9914d.firebaseapp.com",
  projectId: "proyectito2-9914d",
  storageBucket: "proyectito2-9914d.firebasestorage.app",
  messagingSenderId: "641141473251",
  appId: "1:641141473251:web:3d84412e76c233c9e7ead6",
  measurementId: "G-8YRLR7MCGR"
};

// Inicializa Firebase
const appfirebase = initializeApp(firebaseConfig);

// Inicializa Firestore
const db = getFirestore(appfirebase);

// Inicializa Authentication
const auth = getAuth(appfirebase);

// Inicializa Storage
const storage = getStorage(appfirebase);

// Exportación única al final del archivo
export { appfirebase, db, auth, storage };
