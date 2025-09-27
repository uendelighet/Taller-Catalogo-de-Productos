import { useEffect, useState } from "react";
// useState: permite manejar estado dentro del componente
// useEffect: permite ejecutar efectos secundarios, como llamadas a APIs o JSON

import TarjetaProducto from "./components/TarjetaProducto";
// Importa el componente de presentación de cada producto

// 🔹 Tipo que define cómo es cada reseña
interface Reseña {
  usuario: string; // Nombre de quien escribió la reseña
  texto: string;   // Contenido de la reseña
  fecha: string;   // Fecha de publicación
}

// 🔹 Tipo que define cada producto
interface Producto {
  id: number;        // Identificador único
  nombre: string;    // Nombre del producto
  descripcion: string; // Descripción breve
  precio: number;    // Precio numérico
  imagen: string;    // URL de la imagen
  reseñas: Reseña[]; // Lista de reseñas
}

export default function App() {
  // Estado que guarda todos los productos cargados
  const [productos, setProductos] = useState<Producto[]>([]);

  // Estado para mostrar un mensaje mientras se cargan los productos
  const [loading, setLoading] = useState(true);

  // 🔹 useEffect se ejecuta una sola vez cuando se monta el componente
  useEffect(() => {
    fetch("/src/data/productos.json") // Pide el JSON con los productos
      .then((res) => res.json())      // Convierte la respuesta en objeto JS
      .then((data) => setProductos(data)) // Guarda los productos en el estado
      .catch((err) => console.error("Error cargando productos:", err)) // Manejo de errores
      .finally(() => setLoading(false)); // Finaliza la carga, sin importar éxito o error
  }, []); // Dependencias vacías => se ejecuta solo al montar

  // 🔹 Si está cargando, mostramos mensaje centralizado
  if (loading) return <p style={{ textAlign: "center" }}>Cargando...</p>;

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: 20 }}>
      <h1 style={{ textAlign: "center" }}>Catálogo de Productos</h1>

      {/* Grid responsivo: adapta columnas según ancho de pantalla */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: 20,
          marginTop: 20,
        }}
      >
        {/* 🔹 Renderiza una tarjeta por cada producto */}
        {productos.map((p) => (
          <TarjetaProducto
            key={p.id}             // Key única para optimización de React
            nombre={p.nombre}      // Prop nombre
            descripcion={p.descripcion} // Prop descripción
            precio={p.precio}      // Prop precio
            imagen={p.imagen}      // Prop imagen
            reseñas={p.reseñas}    // Prop reseñas
          />
        ))}
      </div>
    </div>
  );
}

/*
Resumen paso a paso:

1️⃣ Al montarse el componente App, useEffect hace fetch al JSON de productos.
2️⃣ Mientras se cargan los productos, el estado 'loading' está en true y se muestra "Cargando...".
3️⃣ Cuando llegan los datos, se actualiza 'productos' y se pone 'loading' en false.
4️⃣ Una vez cargados, se renderiza un título y un grid de tarjetas.
5️⃣ Cada TarjetaProducto recibe las props necesarias para mostrar información e interacción.
6️⃣ El grid es responsivo, se ajusta automáticamente según el tamaño de pantalla.
*/
    