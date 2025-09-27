// src/components/ProductCard.tsx
import { useState } from "react";
import { Producto } from "../types";

type Props = {
  producto: Producto;
};

function ProductCard({ producto }: Props) {
  // estados para el boton de carrito y reseñas
  const [enCarrito, setEnCarrito] = useState(false);
  const [verResenas, setVerResenas] = useState(false);

  return (
    <div className="tarjeta">
      <img src={producto.imagen} alt={producto.nombre} className="img" />

      <h3>{producto.nombre}</h3>
      <p>{producto.descripcion}</p>
      <p><b>Precio:</b> ${producto.precio}</p>

      <div style={{ marginTop: "10px" }}>
        <button
          onClick={() => setEnCarrito(true)}
          disabled={enCarrito}
        >
          {enCarrito ? "Agregado ✅" : "Agregar al Carrito"}
        </button>

        <button onClick={() => setVerResenas(!verResenas)}>
          {verResenas ? "Ocultar Reseñas" : "Mostrar Reseñas"}
        </button>
      </div>

      {verResenas && (
        <ul>
          {producto.reseñas.length === 0 ? (
            <li>No hay reseñas</li>
          ) : (
            producto.reseñas.map((r, index) => (
              <li key={index}>
                <b>{r.usuario}</b>: {r.texto} ({r.fecha})
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}

export default ProductCard;