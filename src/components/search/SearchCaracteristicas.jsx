import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useGetData from '../Fetch/useGetData'
import './style/buscador.css'

const BuscadorImagenesPorCaracteristicas = () => {
  const [categorias, setCategorias] = useState([])
  const [filteredCategories, setFilteredCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [searchText, setSearchText] = useState('')
  const [showMenu, setShowMenu] = useState(false)
  const url = `${import.meta.env.VITE_URL_API}/api`
  const navigate = useNavigate()

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
    navigate(`/filtro/${category.toLowerCase()}`)
  }

  const handleMostrarTodas = () => {
    setSelectedCategory('')
    navigate(`/filtro/todas`)
  }

  const handleMenuToggle = () => {
    setShowMenu(!showMenu)
  }

  return (
    <div className="container mt-4">
      <div className="categorias">
        <div className="dropdown">
          <button
            className="btn btn-toggle btn-primary dropdown-toggle"
            onClick={handleMenuToggle}
            aria-expanded={showMenu ? 'true' : 'false'}
          >
            Categorías
          </button>
          <ul className={`dropdown-menu${showMenu ? ' show' : ''}`}>
            <li key="todas">
              <button
                className={`dropdown-item${
                  selectedCategory === '' ? ' active' : ''
                }`}
                onClick={handleMostrarTodas}
              >
                Todas
              </button>
            </li>
            {filteredCategories.map((category, index) => (
              <li key={index}>
                <button
                  className={`dropdown-item${
                    selectedCategory === category ? ' active' : ''
                  }`}
                  onClick={() => handleCategoryToggle(category)}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </div>
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
