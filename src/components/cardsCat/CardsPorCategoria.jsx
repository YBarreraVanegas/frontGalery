import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useGetData from '../Fetch/useGetData'
import SearchCard from '../search/SearchCard'
import './style/category.css'
const CardsPorBusqueda = () => {
  const { categoria } = useParams()
  const [data, setData] = useState([])
  const {
    data: fetchedData,
    loading,
    error,
  } = useGetData(`${import.meta.env.VITE_URL_API}/api`)
  useEffect(() => {
    if (fetchedData) {
      setData(fetchedData)
    }
  }, [fetchedData])

  if (loading) return <p>Cargando...</p>
  if (error) return <p>Error al cargar los datos</p>

  const normalizedCategoria = categoria.toLowerCase()

  const filteredData = data.filter(item => {
    // Parsear la cadena JSON de categorias a un array
    const categoriasArray = JSON.parse(item.categorias)
    // Verificar si alguna de las categorias del array coincide con la categoria buscada
    return (
      categoriasArray &&
      categoriasArray.some(
        cat => cat && cat.toLowerCase().startsWith(normalizedCategoria)
      )
    )
  })

  return (
    <div className="container-col">
      {filteredData.map(item => (
        <div key={item.id} className="my-masonry-grid_item">
          <SearchCard
            id={item.id}
            imagen={item.imagen}
            titulo={item.titulo}
            descripcion={item.descripcion}
          />
        </div>
      ))}
    </div>
  )
}

export default CardsPorBusqueda
