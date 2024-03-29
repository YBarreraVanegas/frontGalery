import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './style/card.css' // Importa tus estilos CSS personalizados

const Card = ({ imagen, titulo, descripcion, id }) => {
  const [imagenUrl] = imagen
    .replace(/[{""}]/g, '')
    .split(',')
    .map(img => img.trim())

  // Estado para el marcador de favoritos
  const [favorito, setFavorito] = useState(false)

  // Función para cambiar el estado de favorito
  const toggleFavorito = () => {
    setFavorito(!favorito)
  }

  return (
    <article className="card">
      <Link to={`/Imagenes/${id}`}>
        <img src={imagenUrl} alt={titulo} className="card-img" />
      </Link>
      <div className="card-buttons">
        <button className="btn btn-primary btn-sm" onClick={toggleFavorito}>
          {favorito ? 'Eliminar de favoritos' : 'Agregar a favoritos'}
        </button>
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => alert('Guardar en selección')}
        >
          Guardar en selección
        </button>
      </div>
    </article>
  )
}

export default Card
