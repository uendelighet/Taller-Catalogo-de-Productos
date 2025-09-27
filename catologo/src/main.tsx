import React from "react";
// Importa React, necesario para usar JSX y crear componentes.

import ReactDOM from "react-dom/client";
// Importa ReactDOM para poder renderizar (montar) los componentes en el DOM.

import App from "./App";
// Importa el componente principal de la aplicación, que contiene todo el catálogo.

// 🔹 Punto de entrada de la app: aquí se monta React en el HTML
ReactDOM.createRoot(
  document.getElementById("root")! // Selecciona el elemento <div id="root"> del index.html
)
.render(
  <React.StrictMode>
    {/* StrictMode es un envoltorio de desarrollo que activa advertencias y verifica buenas prácticas */}
    <App /> {/* Monta el componente principal App */}
  </React.StrictMode>
);

/*
Resumen de funcionamiento:

1️⃣ document.getElementById("root")!: Obtiene el div en el HTML donde se mostrará toda la app.
   - El signo de exclamación (!) le dice a TypeScript que estamos seguros de que ese elemento existe.
2️⃣ ReactDOM.createRoot(...).render(...): Crea la raíz de React y monta los componentes dentro de ella.
3️⃣ <React.StrictMode>: No afecta la app en producción, pero en desarrollo ayuda a detectar problemas y advertencias.
4️⃣ <App />: Componente principal que contiene todo el catálogo de productos y sus interacciones.
*/
// El archivo main.tsx es el punto de entrada de la aplicación React.