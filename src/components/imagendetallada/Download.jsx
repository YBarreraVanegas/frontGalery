import React, { useState, useEffect } from 'react'
import useGetData from '../Fetch/useGetData'
import { ProcessedImageUrl } from '../utils'
import './style/detailImage.css'
import Carrusel from './Carrusel'
import ImageButtons from '../utils/Butonns'

const ImageDownload = ({ imageUrl }) => {
  const { data: imageInfo, loading, error } = useGetData(imageUrl)
  const [processedImageUrl, setProcessedImageUrl] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [categorias, setCategorias] = useState('')

  useEffect(() => {
    if (imageInfo && imageInfo.imagen) {
      const processedUrl = ProcessedImageUrl({ imageUrl: imageInfo.imagen })
      setProcessedImageUrl(processedUrl)
      setTitle(imageInfo.titulo || 'Título no disponible')
      setDescription(imageInfo.descripcion || 'Descripción no disponible')
      setCategorias(imageInfo.categorias || 'Descripción no disponible')
    }
  }, [imageInfo])

  const handleDownloadImage = async () => {
    try {
      if (!processedImageUrl) {
        console.error('URL de imagen no válida')
        return
      }

      const downloadUrl = `${processedImageUrl}?q=100`
      const response = await fetch(downloadUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)

      const downloadLink = document.createElement('a')
      downloadLink.href = url
      downloadLink.download = 'imagen_descargada.jpg'
      document.body.appendChild(downloadLink)
      downloadLink.click()
      document.body.removeChild(downloadLink)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error al descargar la imagen:', error)
    }
  }

  return (
    <div className="container">
      {loading ? (
        <p>Cargando imagen...</p>
      ) : error ? (
        <p>Error al cargar la imagen</p>
      ) : (
        <>
          <div className="card card-detail">
            <ProcessedImageUrl
              imageUrl={imageInfo.imagen}
              className="card-img"
              alt="Imagen"
            />
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <Carrusel categorias={categorias} />

              {/* Utiliza el componente ImageButtons aquí */}
              <ImageButtons id={imageInfo.id} />

              <button className="btn btn-primary" onClick={handleDownloadImage}>
                Descargar Imagen
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default ImageDownload
