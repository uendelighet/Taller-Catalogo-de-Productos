import React from 'react';
import TarjetaProducto from './components/TarjetaProducto';
import { useObtenerProductos } from './hooks/useProductos';
import './styles/App.css';

/**
 * Componente principal de la aplicación del catálogo de productos
 * 
 * Este componente:
 * - Utiliza el hook personalizado para obtener productos via fetch
 * - Maneja los estados de carga, error y éxito
 * - Renderiza la grilla de productos usando el componente TarjetaProducto
 * - Muestra estadísticas del catálogo
 * 
 * @returns {JSX.Element} La aplicación completa del catálogo
 */
const CatalogoProductosApp: React.FC = () => {
  // ===== OBTENCIÓN DE DATOS =====
  
  // Usar el hook personalizado para obtener productos del JSON
  const { 
    productos, 
    cargando, 
    error, 
    recargarProductos 
  } = useObtenerProductos();

  // ===== FUNCIONES DE UTILIDAD =====

  /**
   * Calcula estadísticas básicas de los productos
   * @returns {Object} Objeto con estadísticas calculadas
   */
  const calcularEstadisticasCatalogo = () => {
    const totalProductos = productos.length;
    const productosConReseñas = productos.filter(producto => producto.reseñas.length > 0).length;
    const totalReseñas = productos.reduce((total, producto) => total + producto.reseñas.length, 0);
    const precioPromedio = productos.length > 0 
      ? productos.reduce((total, producto) => total + producto.precio, 0) / productos.length
      : 0;

    return {
      totalProductos,
      productosConReseñas,
      totalReseñas,
      precioPromedio: precioPromedio.toFixed(2)
    };
  };

  // ===== RENDERIZADO CONDICIONAL =====

  /**
   * Renderiza el estado de carga
   * @returns {JSX.Element} Componente de carga
   */
  const renderizarEstadoCarga = (): JSX.Element => (
    <div className="contenedor-estado">
      <div className="mensaje-cargando">
        <div className="spinner-carga" aria-label="Cargando productos"></div>
        <span>🔄 Cargando productos del catálogo...</span>
      </div>
      <p style={{ color: '#64748b', marginTop: '10px' }}>
        Por favor espera mientras obtenemos los mejores productos para ti
      </p>
    </div>
  );

  /**
   * Renderiza el estado de error
   * @returns {JSX.Element} Componente de error con opción de reintento
   */
  const renderizarEstadoError = (): JSX.Element => (
    <div className="contenedor-estado">
      <div className="mensaje-error">
        <h3>❌ Error al cargar productos</h3>
        <p>{error}</p>
        <button 
          onClick={recargarProductos}
          className="boton-reintentar"
          aria-label="Reintentar carga de productos"
        >
          🔄 Reintentar
        </button>
      </div>
    </div>
  );

  /**
   * Renderiza la grilla principal de productos
   * @returns {JSX.Element} Grilla con todos los productos
   */
  const renderizarGrillaProductos = (): JSX.Element => {
    const estadisticas = calcularEstadisticasCatalogo();

    return (
      <>
        {/* Contenedor principal de productos */}
        <main className="contenedor-principal-productos">
          <div className="grilla-productos-catalogo">
            {productos.map((cadaProducto) => (
              <TarjetaProducto 
                key={cadaProducto.id} 
                productoIndividual={cadaProducto}
              />
            ))}
          </div>
        </main>

        {/* Pie de página con estadísticas */}
        <footer className="pie-pagina-catalogo">
          <div className="estadisticas-catalogo">
            <div className="estadistica-item">
              <span className="estadistica-numero">{estadisticas.totalProductos}</span>
              <div className="estadistica-label">Productos Disponibles</div>
            </div>
            <div className="estadistica-item">
              <span className="estadistica-numero">{estadisticas.productosConReseñas}</span>
              <div className="estadistica-label">Con Reseñas</div>
            </div>
            <div className="estadistica-item">
              <span className="estadistica-numero">{estadisticas.totalReseñas}</span>
              <div className="estadistica-label">Total Reseñas</div>
            </div>
            <div className="estadistica-item">
              <span className="estadistica-numero">${estadisticas.precioPromedio}</span>
              <div className="estadistica-label">Precio Promedio</div>
            </div>
          </div>
          <p className="texto-pie-pagina">
            💻 Catálogo de productos tecnológicos - Encuentra todo lo que necesitas para tu oficina y gaming
          </p>
        </footer>
      </>
    );
  };

  // ===== RENDERIZADO PRINCIPAL =====

  return (
    <div className="aplicacion-catalogo">
      {/* ===== ENCABEZADO ===== */}
      <header className="encabezado-catalogo">
        <h1 className="titulo-principal-catalogo">
          🛍️ Catálogo de Productos Tecnológicos
        </h1>
        <p className="subtitulo-catalogo">
          Encuentra los mejores productos para tu oficina, gaming y productividad
        </p>
      </header>

      {/* ===== CONTENIDO PRINCIPAL (CONDICIONAL) ===== */}
      {cargando && renderizarEstadoCarga()}
      {error && !cargando && renderizarEstadoError()}
      {!cargando && !error && productos.length > 0 && renderizarGrillaProductos()}
      
      {/* Estado cuando no hay productos (sin error) */}
      {!cargando && !error && productos.length === 0 && (
        <div className="contenedor-estado">
          <p>📦 No se encontraron productos en el catálogo.</p>
          <button 
            onClick={recargarProductos}
            className="boton-reintentar"
          >
            🔄 Recargar
          </button>
        </div>
      )}
    </div>
  );
};

export default CatalogoProductosApp;