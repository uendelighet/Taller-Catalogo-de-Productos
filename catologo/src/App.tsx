import { useEffect, useState } from "react";

interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
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
          <div
            key={p.id}
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
              src={p.imagen}
              alt={p.nombre}
              style={{ width: "100%", borderRadius: 8 }}
            />
            <h2 style={{ marginTop: 10 }}>{p.nombre}</h2>
            <p style={{ color: "#555" }}>{p.descripcion}</p>
            <strong>${p.precio}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}
