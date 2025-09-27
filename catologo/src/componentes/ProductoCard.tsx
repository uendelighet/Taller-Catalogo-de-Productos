import { useState } from "react";
import { Producto } from "../types";

interface ProductoCardProps {
  producto: Producto;
}

export default function ProductoCard({ producto }: ProductoCardProps) {
  const [agregado, setAgregado] = useState(false);
  const [mostrarReseñas, setMostrarReseñas] = useState(false);

  return (
    <div className="border rounded-2xl shadow-md p-4 w-64 bg-white">
      <img
        src={producto.imagen}
        alt={producto.nombre}
        className="w-full h-40 object-cover rounded-xl mb-2"
      />
      <h2 className="text-xl font-bold">{producto.nombre}</h2>
      <p className="text-gray-600">{producto.descripcion}</p>
      <p className="font-semibold mt-2">${producto.precio.toFixed(2)}</p>

      <button
        onClick={() => setAgregado(true)}
        disabled={agregado}
        className={`mt-3 px-3 py-1 rounded-lg w-full ${
          agregado ? "bg-green-500 text-white" : "bg-blue-500 text-white"
        }`}
      >
        {agregado ? "Agregado ✅" : "Agregar al Carrito"}
      </button>

      <button
        onClick={() => setMostrarReseñas(!mostrarReseñas)}
        className="mt-2 text-sm text-blue-600 underline"
      >
        {mostrarReseñas ? "Ocultar Reseñas" : "Mostrar Reseñas"}
      </button>

      {mostrarReseñas && (
        <ul className="mt-2 bg-gray-50 p-2 rounded-xl text-sm">
          {producto.reseñas.length > 0 ? (
            producto.reseñas.map((r, i) => (
              <li key={i} className="mb-1">
                <strong>{r.usuario}:</strong> {r.texto} <br />
                <span className="text-gray-500 text-xs">{r.fecha}</span>
              </li>
            ))
          ) : (
            <li className="text-gray-500 italic">Sin reseñas aún</li>
          )}
        </ul>
      )}
    </div>
  );
}
