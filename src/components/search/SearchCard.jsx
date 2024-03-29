import { Link } from 'react-router-dom'

const SearchCard = ({ id, imagen, titulo, descripcion }) => {
  const [imagenUrl] = imagen
    .replace(/[{""}]/g, '')
    .split(',')
    .map(img => img.trim())
  return (
    <div className="card mb-3">
      <Link to={`/Imagenes/${id}`} className="custom-link">
        <img src={imagenUrl} className="card-img-top" alt={titulo} />
      </Link>
      <div className="card-body">
        <h5 className="card-title">{titulo}</h5>
      </div>
    </div>
  )
}

export default SearchCard
