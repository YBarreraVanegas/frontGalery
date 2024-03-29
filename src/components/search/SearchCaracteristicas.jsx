import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom' // Importar useNavigate
import useGetData from '../Fetch/useGetData'
import './style/buscador.css'

const BuscadorImagenesPorCaracteristicas = () => {
  const [categorias, setCategorias] = useState([])
  const [filteredCategories, setFilteredCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [searchText, setSearchText] = useState('')
  const [showMore, setShowMore] = useState(false)
  const url = `${import.meta.env.VITE_URL_API}/api`
  const navigate = useNavigate() // Usar useNavigate para la navegación

  const { data, loading, error, refetch } = useGetData(url)

  useEffect(() => {
    if (data) {
      const allCategories = data.reduce((acc, item) => {
        if (item.categorias !== null) {
          const formattedCats = item.categorias
            .replace(/[\[\]"']/g, '')
            .split(',')
          return acc.concat(formattedCats.map(cat => cat.trim()))
        } else {
          return acc
        }
      }, [])

      const uniqueCategories = [...new Set(allCategories)]
      setCategorias(uniqueCategories.slice(0, 10))
    }
  }, [data])

  useEffect(() => {
    setFilteredCategories(
      categorias.filter(
        cat => cat && cat.toLowerCase().includes(searchText.toLowerCase())
      )
    )
  }, [categorias, searchText])

  const handleCategoryToggle = category => {
    setSelectedCategory(category)
    navigate(`/filtro/${category.toLowerCase()}`) // Redirigir a la página de cards por categoría
  }

  const handleShowMore = () => {
    setShowMore(prevState => !prevState)
  }

  return (
    <div className="container mt-4">
      <div className="categorias">
        {filteredCategories.map((category, index) => (
          <button
            key={index}
            className={` btn btn-toggle bg-primary  ${
              selectedCategory === category ? 'active' : ''
            }`}
            onClick={() => handleCategoryToggle(category)}
          >
            {category}
          </button>
        ))}
        {showMore && categorias.length > 10 && (
          <button className="btn btn-toggle" onClick={handleShowMore}>
            Mostrar menos
          </button>
        )}
      </div>
      {loading ? (
        <p>Cargando...</p>
      ) : error ? (
        <p>Error al cargar los datos</p>
      ) : null}
    </div>
  )
}

export default BuscadorImagenesPorCaracteristicas
