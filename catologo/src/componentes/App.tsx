import productos from "./data/productos.json";
import ProductoCard from "./components/ProductoCard";
import { Producto } from "./types";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Catálogo de Productos
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {productos.map((p: Producto) => (
          <ProductoCard key={p.id} producto={p} />
        ))}
      </div>
    </div>
  );
}
