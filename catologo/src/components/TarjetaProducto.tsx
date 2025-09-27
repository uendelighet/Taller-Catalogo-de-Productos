import React, { useState } from 'react';
import { PropsTarjetaProducto } from '../types';
import '../styles/TarjetaProducto.css';

/**
 * Componente TarjetaProducto
 * 
 * Renderiza una tarjeta individual de producto con toda su información:
 * - Imagen del producto
 * - Información básica (nombre, descripción, precio)
 * - Botones de acción (agregar al carrito, mostrar reseñas)
 * - Lista de reseñas (mostrada condicionalmente)
 * 
 * @param {PropsTarjetaProducto} props - Props del componente
 * @returns {JSX.Element} Tarjeta de producto renderizada
 */
export const TarjetaProducto: React.FC<PropsTarjetaProducto> = ({ 
  productoIndividual 
}) => {
  // ===== ESTADOS DEL COMPONENTE =====
  
  /** Estado que controla si el producto está agregado al carrito */
  const [estaAgregadoAlCarrito, setEstaAgregadoAlCarrito] = useState<boolean>(false);
  
  /** Estado que controla la visibilidad de las reseñas */
  const [mostrandoReseñas, setMostrandoReseñas] = useState<boolean>(false);

  // ===== FUNCIONES DE MANEJO DE EVENTOS =====

  /**
   * Maneja el click del botón "Agregar al Carrito"
   * Cambia el estado para mostrar que el producto fue agregado
   */
  const manejarClickAgregarCarrito = (): void => {
    setEstaAgregadoAlCarrito(true);
    console.log(`✅ Producto agregado al carrito: ${productoIndividual.nombre}`);
  };

  /**
   * Maneja el click del botón para mostrar/ocultar reseñas
   * Alterna entre mostrar y ocultar las reseñas del producto
   */
  const alternarVisibilidadReseñas = (): void => {
    const nuevoEstado = !mostrandoReseñas;
    setMostrandoReseñas(nuevoEstado);
    console.log(`${nuevoEstado ? '👁️' : '🙈'} Reseñas ${nuevoEstado ? 'mostradas' : 'ocultadas'} para: ${productoIndividual.nombre}`);
  };

  // ===== FUNCIONES DE RENDERIZADO =====

  /**
   * Renderiza la lista de reseñas del producto
   * Si no hay reseñas, muestra un mensaje informativo
   * 
   * @returns {JSX.Element} Lista de reseñas o mensaje de no reseñas
   */
  const renderizarListaReseñas = (): JSX.Element => {
    // Verificar si el producto tiene reseñas
    const tieneReseñas = productoIndividual.reseñas.length > 0;

    if (!tieneReseñas) {
      return (
        <div className="sin-reseñas-producto">
          <p>📝 No hay reseñas disponibles para este producto.</p>
          <p><small>¡Sé el primero en dejar una reseña!</small></p>
        </div>
      );
    }

    return (
      <ul className="lista-reseñas-producto">
        {productoIndividual.reseñas.map((cadaReseña, indiceReseña) => (
          <li key={indiceReseña} className="reseña-individual">
            <div className="header-reseña">
              <span className="usuario-reseña">👤 {cadaReseña.usuario}</span>
              <span className="fecha-reseña">📅 {cadaReseña.fecha}</span>
            </div>
            <p className="texto-reseña">"{cadaReseña.texto}"</p>
          </li>
        ))}
      </ul>
    );
  };

  /**
   * Formatea el precio del producto con separadores de miles
   * 
   * @param {number} precio - Precio a formatear
   * @returns {string} Precio formateado
   */
  const formatearPrecio = (precio: number): string => {
    return precio.toLocaleString('es-CO', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  // ===== RENDERIZADO DEL COMPONENTE =====

  return (
    <article className="tarjeta-producto">
      {/* ===== SECCIÓN DE IMAGEN ===== */}
      <div className="contenedor-imagen-producto">
        <img 
          src={productoIndividual.imagen} 
          alt={`Imagen del producto ${productoIndividual.nombre}`}
          className="imagen-producto"
          loading="lazy"
          onError={(e) => {
            // Fallback si la imagen no carga
            e.currentTarget.src = 'https://via.placeholder.com/200x200/e2e8f0/64748b?text=Sin+Imagen';
          }}
        />
      </div>

      {/* ===== INFORMACIÓN DEL PRODUCTO ===== */}
      <div className="informacion-producto">
        <h3 className="nombre-producto" title={productoIndividual.nombre}>
          {productoIndividual.nombre}
        </h3>
        
        <p className="descripcion-producto" title={productoIndividual.descripcion}>
          {productoIndividual.descripcion}
        </p>
        
        <div className="precio-producto">
          <span className="simbolo-moneda">$</span>
          <span className="valor-precio">
            {formatearPrecio(productoIndividual.precio)}
          </span>
        </div>
      </div>

      {/* ===== BOTONES DE ACCIÓN ===== */}
      <div className="botones-accion-producto">
        <button
          onClick={manejarClickAgregarCarrito}
          disabled={estaAgregadoAlCarrito}
          className={`boton-carrito-producto ${estaAgregadoAlCarrito ? 'agregado' : 'disponible'}`}
          aria-label={`${estaAgregadoAlCarrito ? 'Producto agregado al carrito' : 'Agregar producto al carrito'}`}
        >
          {estaAgregadoAlCarrito ? '✅ Agregado' : '🛒 Agregar al Carrito'}
        </button>

        <button
          onClick={alternarVisibilidadReseñas}
          className="boton-reseñas-producto"
          aria-label={`${mostrandoReseñas ? 'Ocultar' : 'Mostrar'} reseñas del producto`}
          aria-expanded={mostrandoReseñas}
        >
          {mostrandoReseñas ? '👁️‍🗨️ Ocultar Reseñas' : '💬 Mostrar Reseñas'}
        </button>
      </div>

      {/* ===== SECCIÓN DE RESEÑAS (CONDICIONAL) ===== */}
      {mostrandoReseñas && (
        <section className="seccion-reseñas-producto" aria-live="polite">
          <h4 className="titulo-reseñas-producto">
            📋 Reseñas ({productoIndividual.reseñas.length})
          </h4>
          {renderizarListaReseñas()}
        </section>
      )}
    </article>
  );
};

export default TarjetaProducto;