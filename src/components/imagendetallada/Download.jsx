import React, { useState, useEffect } from 'react'
import useGetData from '../Fetch/useGetData'
import { ProcessedImageUrl } from '../utils'
import './style/detailImage.css'
import ImageDownloader from './ImageDownloader'

const ImageDownload = ({ imageUrl }) => {
  const { data: imageInfo, loading, error } = useGetData(imageUrl)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    if (imageInfo && imageInfo.imagen) {
      setTitle(imageInfo.titulo || 'Título no disponible')
      setDescription(imageInfo.descripcion || 'Descripción no disponible')
    }
  }, [imageInfo])

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
              alt={imageInfo.titulo}
              imageUrl={imageInfo.imagen}
              className="card-img"
            />
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <ImageDownloader imageUrl={imageInfo.imagen} />
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default ImageDownload
