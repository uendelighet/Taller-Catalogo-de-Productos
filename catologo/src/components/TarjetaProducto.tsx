import { useState } from "react"; 
// 🔹 Importamos useState, un hook de React que nos permite manejar estados internos 
// dentro de nuestro componente funcional. Lo usaremos para controlar el carrito y 
// la visibilidad de las reseñas.

// 🔹 Definimos la estructura de una reseña usando TypeScript
interface Reseña {
  usuario: string; // Nombre del usuario que hizo la reseña
  texto: string;   // Contenido de la reseña
  fecha: string;   // Fecha en que se publicó
}

// 🔹 Definimos las props que recibirá la tarjeta de producto
interface ProductoProps {
  nombre: string;       // Nombre del producto
  descripcion: string;  // Breve descripción
  precio: number;       // Precio en número
  imagen: string;       // URL de la imagen del producto
  reseñas: Reseña[];    // Lista de reseñas
}

// 🔹 Componente principal que representa una tarjeta de producto
export default function TarjetaProducto({
  nombre,
  descripcion,
  precio,
  imagen,
  reseñas,
}: ProductoProps) {
  // 🔹 Estado que controla si el producto ya fue agregado al carrito
  const [agregado, setAgregado] = useState(false);

  // 🔹 Estado que controla si se muestran las reseñas
  const [mostrarReseñas, setMostrarReseñas] = useState(false);

  return (
    <div
      style={{
        background: "white",               // Fondo blanco
        border: "1px solid #ddd",          // Borde gris claro
        borderRadius: 12,                  // Bordes redondeados
        padding: 16,                        // Espacio interno
        textAlign: "center",               // Texto centrado
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)", // Sombra ligera
      }}
    >
      {/* 🔹 Imagen del producto */}
      <img
        src={imagen}   // URL de la imagen
        alt={nombre}   // Texto alternativo (accesibilidad)
        style={{ width: "100%", borderRadius: 8 }}
      />

      {/* 🔹 Información textual */}
      <h2 style={{ marginTop: 10 }}>{nombre}</h2>
      <p style={{ color: "#555" }}>{descripcion}</p>
      <strong>${precio}</strong>

      {/* 🔹 Botón “Agregar al Carrito” */}
      <div style={{ marginTop: 10 }}>
        <button
          onClick={() => setAgregado(true)}   // Cambia el estado al hacer click
          disabled={agregado}                // Desactiva si ya fue agregado
          style={{
            backgroundColor: agregado ? "#4CAF50" : "#007bff", // Cambia color
            color: "white",
            border: "none",
            borderRadius: 6,
            padding: "6px 12px",
            cursor: agregado ? "not-allowed" : "pointer",      // Cursor
          }}
        >
          {agregado ? "Agregado ✅" : "Agregar al Carrito"}
        </button>
      </div>

      {/* 🔹 Botón “Ver/Ocultar Reseñas” */}
      {reseñas.length > 0 && (
        <div style={{ marginTop: 8 }}>
          <button
            onClick={() => setMostrarReseñas(!mostrarReseñas)} // Alterna visibilidad
            style={{
              backgroundColor: "#f1f1f1",
              border: "1px solid #ccc",
              borderRadius: 6,
              padding: "4px 10px",
              cursor: "pointer",
            }}
          >
            {mostrarReseñas ? "Ocultar Reseñas" : "Ver Reseñas"}
          </button>
        </div>
      )}

      {/* 🔹 Lista de reseñas */}
      {mostrarReseñas && reseñas.length > 0 && (
        <ul style={{ textAlign: "left", marginTop: 10 }}>
          {reseñas.map((r, i) => (
            <li key={i}>
              <strong>{r.usuario}:</strong> {r.texto} <br />
              <small style={{ color: "#777" }}>{r.fecha}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* 
✨ RESUMEN TUTO:

1️⃣ Recibimos la info del producto mediante props y la mostramos en la tarjeta.
2️⃣ `agregado` controla el botón del carrito:
   - Si se hace click cambia de texto y color.
   - Se desactiva una vez agregado.
3️⃣ `mostrarReseñas` controla la visibilidad de la lista de reseñas.
4️⃣ Si hay reseñas, mostramos el botón para verlas/ocultarlas.
5️⃣ La lista de reseñas solo aparece si el usuario decide verla.
6️⃣ Cada reseña se renderiza con `map` y `key` único.
*/
