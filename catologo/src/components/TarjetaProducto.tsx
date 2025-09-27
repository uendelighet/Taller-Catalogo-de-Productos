import { useState } from "react";

interface Reseña {
  usuario: string;
  texto: string;
  fecha: string;
}

interface ProductoProps {
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
  reseñas: Reseña[];
}

export default function TarjetaProducto({
  nombre,
  descripcion,
  precio,
  imagen,
  reseñas,
}: ProductoProps) {
  const [agregado, setAgregado] = useState(false); // controla el botón de carrito
  const [mostrarReseñas, setMostrarReseñas] = useState(false); // controla visibilidad reseñas

  return (
    <div
      style={{
        background: "white",
        border: "1px solid #ddd",
        borderRadius: 12,
        padding: 16,
        textAlign: "center",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      }}
    >
      <img
        src={imagen}
        alt={nombre}
        style={{ width: "100%", borderRadius: 8 }}
      />
      <h2 style={{ marginTop: 10 }}>{nombre}</h2>
      <p style={{ color: "#555" }}>{descripcion}</p>
      <strong>${precio}</strong>

      {/* Botón Agregar al Carrito */}
      <div style={{ marginTop: 10 }}>
        <button
          onClick={() => setAgregado(true)}
          disabled={agregado}
          style={{
            backgroundColor: agregado ? "#4CAF50" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: 6,
            padding: "6px 12px",
            cursor: agregado ? "not-allowed" : "pointer",
          }}
        >
          {agregado ? "Agregado ✅" : "Agregar al Carrito"}
        </button>
      </div>

      {/* Botón mostrar/ocultar reseñas */}
      {reseñas.length > 0 && (
        <div style={{ marginTop: 8 }}>
          <button
            onClick={() => setMostrarReseñas(!mostrarReseñas)}
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

      {/* Lista de reseñas */}
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
