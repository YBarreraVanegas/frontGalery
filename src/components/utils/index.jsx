export const ProcessedImageUrl = ({ imageUrl }) => {
  // Tratar la URL de la imagen aquí
  const processedUrl = imageUrl
    .replace(/[{""}]/g, '')
    .split(',')
    .map(img => img.trim())
    .join(',') // Unir los elementos del array tratado de nuevo en una cadena

  return processedUrl
}
