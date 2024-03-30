import { Link } from 'react-router-dom'
import './style/card.css'
import { ProcessedImageUrl, useFavorito } from '../utils' // Asegúrate de importar correctamente este componente

const Card = ({ imagen, titulo, descripcion, id }) => {
  const { favorito, mensaje, toggleFavorito, toggleGuardado } = useFavorito(id)

  const imagenUrl = imagen

  return (
    <article className="card">
      <Link to={`/Imagenes/${id}`}>
        <ProcessedImageUrl
          imageUrl={imagenUrl}
          alt={titulo}
          className="card-img"
        />
      </Link>
      <div className="card-buttons">
        <button className="btn btn-primary btn-sm" onClick={toggleFavorito}>
          {favorito ? 'Eliminar de favoritos' : 'Agregar a favoritos'}
        </button>
        <button className="btn btn-secondary btn-sm" onClick={toggleGuardado}>
          Guardar en selección
        </button>
      </div>
      {mensaje && <p>{mensaje}</p>}
    </article>
  )
}

export default Card
