import { useState } from 'react'
import useGetData from '../Fetch/useGetData'
import './style/buscador.css'
import SearchCard from './SearchCard'
import '../card/style/card.css'
const BuscadorImagenes = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const url = `${import.meta.env.VITE_URL_API}/api`

  const { data, loading, error, refetch } = useGetData(url)

  const handleSearch = () => {
    refetch()
  }

  const handleInputChange = event => {
    setSearchTerm(event.target.value)
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

  return (
    <div className="container mt-4">
      <div className="input-group mb-3">
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
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
            <div className="grid-container-search">
              {filteredData.map(item => (
                <div key={item.id} className="grid-item">
                  <SearchCard
                    id={item.id}
                    imagen={item.imagen}
                    titulo={item.titulo}
                    descripcion={item.descripcion}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default BuscadorImagenes
