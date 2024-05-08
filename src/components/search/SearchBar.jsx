import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useGetData from '../Fetch/useGetData'
import './style/buscador.css'
import { ProcessedImageUrl } from '../utils'

const BuscadorImagenes = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [isTextWritten, setIsTextWritten] = useState(false) // Estado para verificar si hay texto escrito
  const url = `${import.meta.env.VITE_URL_API}/api`
  const navigate = useNavigate()
  const { data, loading, error, refetch } = useGetData(url)

  const handleInputChange = event => {
    setSearchTerm(event.target.value)
    setIsTextWritten(event.target.value.length > 0) // Actualiza el estado isTextWritten
  }

  const handleSearch = () => {
    navigate(`/filtro/${searchTerm}`)
  }

  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      handleSearch()
    }
  }

  const clearSearchTerm = () => {
    setSearchTerm('')
    setIsTextWritten(false) // Actualiza isTextWritten a false al borrar el texto
  }

  const filteredData = data.filter(item => {
    if (!item.titulo || !item.descripcion) {
      return false // Ignorar elementos con título o descripción null
    }
    return (
      searchTerm.trim() !== '' &&
      (item.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.descripcion.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  })

  const handleResultClick = id => {
    navigate(`/Imagenes/${id}`)
  }

  return (
    <div className="container mt-3">
      <div className="input-group mb-3">
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Buscar imagen por título o descripción"
          className="form-control"
        />
        {isTextWritten && ( // Botón con el icono de Bootstrap Icons que se muestra si hay texto escrito
          <button
            onClick={clearSearchTerm} // Llama a la función para borrar el texto y actualizar el estado
            className="btn btn-secondary"
          >
            x
          </button>
        )}
        <button onClick={handleSearch} className="btn btn-primary">
          Buscar
        </button>
      </div>
      {loading ? (
        <p>Cargando...</p>
      ) : error ? (
        <p>Error al cargar los datos</p>
      ) : (
        <div>
          {filteredData.length === 0 && searchTerm.trim() !== '' ? (
            <p>No se encontraron resultados</p>
          ) : (
            <ul className="list-group">
              {filteredData.map(item => (
                <li
                  key={item.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    <Link to={`/Imagenes/${item.id}`} className="nav-link">
                      {item.titulo} - {item.descripcion}
                    </Link>
                    <button
                      onClick={() => handleResultClick(item.id)}
                      className="btn btn-primary me-2"
                    >
                      Ver Detalles
                    </button>
                  </div>
                  <div className="image-search">
                    <ProcessedImageUrl
                      titulo={item.titulo}
                      imageUrl={item.imagen}
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}

export default BuscadorImagenes
