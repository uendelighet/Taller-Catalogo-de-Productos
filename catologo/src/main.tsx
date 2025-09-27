 8. src/main.tsx
Punto de entrada de la aplicación
typescriptimport { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import CatalogoProductosApp from './App';
import './index.css';

/**
 * Punto de entrada principal de la aplicación React
 * 
 * - Configura React en modo estricto para detectar problemas
 * - Monta la aplicación en el elemento con id 'root'
 * - Importa los estilos globales
 */

// Obtener el elemento raíz del DOM
const elementoRaiz = document.getElementById('root');

// Verificar que el elemento existe antes de montar la aplicación
if (!elementoRaiz) {
  throw new Error('❌ No se encontró el elemento root en el DOM. Verifica que existe un div con id="root" en el HTML.');
}

// Crear la raíz de React y montar la aplicación
const raizReact = createRoot(elementoRaiz);

raizReact.render(
  <StrictMode>
    <CatalogoProductosApp />
  </StrictMode>
);

console.log('🚀 Aplicación de catálogo iniciada correctamente');