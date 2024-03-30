import React from 'react'
import { Link } from 'react-router-dom'
import SearchCard from '../search/SearchCard'

const Carrusel = ({ categorias }) => {
  return (
    <div className="carrusel-container">
      <h1>Carrusel de Cards</h1>

      <h3> {categorias} </h3>
      <Link to={`/filtro/${categorias}`}>
        <button className="btn-mostrar-mas">Mostrar más</button>
      </Link>
    </div>
  )
}

export default Carrusel
