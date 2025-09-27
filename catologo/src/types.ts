export interface Reseña {
  usuario: string;
  texto: string;
  fecha: string;
}

export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
  reseñas: Reseña[];
}
