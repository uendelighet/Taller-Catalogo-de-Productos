import { useEffect, useState } from "react";
import TarjetaProducto from "./components/TarjetaProducto";

interface Reseña {
  usuario: string;
  texto: string;
  fecha: string;
}

interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
  reseñas: Reseña[];
}

export default function App() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/src/data/productos.json")
      .then((res) => res.json())
      .then((data) => setProductos(data))
      .catch((err) => console.error("Error cargando productos:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p style={{ textAlign: "center" }}>Cargando...</p>;

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: 20 }}>
      <h1 style={{ textAlign: "center" }}>Catálogo de Productos</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: 20,
          marginTop: 20,
        }}
      >
        {productos.map((p) => (
          <TarjetaProducto
            key={p.id}
            nombre={p.nombre}
            descripcion={p.descripcion}
            precio={p.precio}
            imagen={p.imagen}
            reseñas={p.reseñas}
          />
        ))}
      </div>
    </div>
  );
}
