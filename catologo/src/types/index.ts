/**
 * Interfaz que define la estructura de una reseña individual de producto
 * Contiene la información básica de quien escribió la reseña
 */
export interface ReseñaProducto {
  /** Nombre del usuario que escribió la reseña */
  usuario: string;
  /** Contenido/comentario de la reseña */
  texto: string;
  /** Fecha cuando se escribió la reseña (formato YYYY-MM-DD) */
  fecha: string;
}

/**
 * Interfaz que define la estructura completa de un producto
 * Incluye toda la información necesaria para mostrar en el catálogo
 */
export interface ProductoCompleto {
  /** Identificador único del producto */
  id: number;
  /** Nombre comercial del producto */
  nombre: string;
  /** Descripción detallada del producto */
  descripcion: string;
  /** Precio del producto en dólares */
  precio: number;
  /** URL de la imagen del producto */
  imagen: string;
  /** Array de reseñas del producto (puede estar vacío) */
  reseñas: ReseñaProducto[];
}

/**
 * Props que recibe el componente TarjetaProducto
 */
export interface PropsTarjetaProducto {
  /** Objeto producto individual con toda su información */
  productoIndividual: ProductoCompleto;
}

/**
 * Estados posibles para la carga de datos
 */
export interface EstadoCarga {
  /** Indica si los datos están siendo cargados */
  cargando: boolean;
  /** Mensaje de error si la carga falla */
  error: string | null;
}