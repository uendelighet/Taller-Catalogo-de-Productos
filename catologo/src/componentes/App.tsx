
import productos from "./data/productos.json";
import ProductCard from "./components/ProductCard";
import { Producto } from "./types";

function App() {
  const listaProductos =  productos as Producto[];

  return (
    <div style={{ padding: "20px" }}>
      <h1>Catálogo de Productos</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
        {listaProductos.map((p) => (
          <ProductCard key={p.id} producto={p} />
          ))}
      </div>
    </div>
  );
}

export default App;