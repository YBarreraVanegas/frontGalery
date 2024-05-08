import axios from 'axios'
import { useEffect, useState } from 'react'

export const ProcessedImageUrl = ({ imageUrl, titulo }) => {
  // Tratar la URL de la imagen aquí
  const processedUrl = imageUrl
    .replace(/[{""}]/g, '')
    .split(',')
    .map(img => img.trim())
    .join(',') // Unir los elementos del array tratado de nuevo en una cadena

  return (
    <div>
      <img src={processedUrl} alt={titulo} className="card-img" />
    </div>
  )
}
