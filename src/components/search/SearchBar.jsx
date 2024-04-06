import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useGetData from '../Fetch/useGetData'
import './style/buscador.css'

const BuscadorImagenes = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const url = `${import.meta.env.VITE_URL_API}/api`
  const navigate = useNavigate()
  const { data, loading, error, refetch } = useGetData(url)

  const handleInputChange = event => {
    setSearchTerm(event.target.value)
  }

  const handleSearch = () => {
    navigate(`/filtro/${searchTerm}`)
  }

  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      handleSearch()
    }
  }

  const filteredData = data.filter(item => {
    if (!item.titulo || !item.descripcion) {
      return false // Ignorar elementos con titulo o descripcion null
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
                <li key={item.id} className="list-group-item">
                  <button
                    onClick={() => handleResultClick(item.id)}
                    className="btn btn-primary me-2"
                  >
                    Ver Detalles
                  </button>
                  <Link to={`/Imagenes/${item.id}`}>
                    {item.titulo} - {item.descripcion}
                  </Link>
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
