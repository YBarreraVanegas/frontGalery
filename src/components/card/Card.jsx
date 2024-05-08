import { Link } from 'react-router-dom'
import { ProcessedImageUrl } from '../utils'
import { OverlayTrigger, Tooltip } from 'react-bootstrap' // Importa OverlayTrigger y Tooltip

const Card = ({ imagen, titulo, descripcion, id }) => {
  const imagenUrl = imagen

  return (
    <article className="card">
      <Link to={`/Imagenes/${id}`} state={{ id }}>
        <ProcessedImageUrl
          imageUrl={imagenUrl}
          alt={titulo}
          className="card-img"
        />
      </Link>
    </article>
  )
}

export default Card
