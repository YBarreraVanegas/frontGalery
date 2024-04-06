import { Link } from 'react-router-dom'
import { ProcessedImageUrl, useFavorito } from '../utils'
import { OverlayTrigger, Tooltip } from 'react-bootstrap' // Importa OverlayTrigger y Tooltip

const Card = ({ imagen, titulo, descripcion, id }) => {
  const {
    favorito,
    guardado,
    mensaje,
    toggleFavorito,
    toggleGuardado,
    loading,
  } = useFavorito(id)

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
        <OverlayTrigger
          placement="top"
          overlay={
            <Tooltip>
              {favorito ? 'Eliminar de favoritos' : 'Agregar a favoritos'}
            </Tooltip>
          } // Tooltip para favoritos
        >
          <button
            className={`btn btn-${favorito ? 'danger' : 'secondary'} btn-sm`}
            onClick={toggleFavorito}
          >
            <i
              className={`bi bi-${favorito ? 'heartbreak-fill' : 'heart-fill'}`}
            ></i>
          </button>
        </OverlayTrigger>

        <OverlayTrigger
          placement="top"
          overlay={
            <Tooltip>
              {guardado ? 'Eliminar de colección' : 'Agregar a colección'}
            </Tooltip>
          } // Tooltip para colección
        >
          <button
            className={`btn btn-${guardado ? 'danger' : 'primary'} btn-sm`}
            onClick={toggleGuardado}
          >
            <i
              className={`bi bi-${
                guardado ? 'bookmark-x-fill' : 'bookmark-heart-fill'
              }`}
            ></i>
          </button>
        </OverlayTrigger>
      </div>
    </article>
  )
}

export default Card
