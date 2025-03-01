import { createRequire } from 'module'
const require = createRequire(import.meta.url)

// Función para leer json locales
export const readJson = (path) => {
  return require(path)
}
