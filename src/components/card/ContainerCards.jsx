import React, { useState, useEffect } from 'react'
import useGetData from '../Fetch/useGetData'
import Card from './Card.jsx'
import './style/card.css'
import 'bootstrap/dist/css/bootstrap.min.css' // Importa los estilos de Bootstrap
import ReactPaginate from 'react-paginate'

export const ContainerCard = () => {
  const perPage = 25 // Número de tarjetas por página
  const { data, loading, error } = useGetData(
    `${import.meta.env.VITE_URL_API}/api`
  )

  const [pageNumber, setPageNumber] = useState(0)
  const pageCount = Math.ceil(data.length / perPage)
  const offset = pageNumber * perPage
  const currentPageData = data.slice(offset, offset + perPage)

  const handlePageClick = ({ selected }) => {
    setPageNumber(selected)
  }

  if (loading) {
    return <div>Cargando...</div>
  }

  if (error) {
    return <div>Error al cargar los datos</div>
  }

  return (
    <div>
      <main className="grid-container">
        {currentPageData.map(item => (
          <div key={item.id} className="grid-item">
            <Card
              id={item.id}
              imagen={item.imagen}
              titulo={item.titulo}
              descripcion={item.descripcion}
            />
          </div>
        ))}
      </main>
      <nav className="pagination-container">
        <ReactPaginate
          previousLabel={'Anterior'}
          nextLabel={'Siguiente'}
          breakLabel={'...'}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={'pagination justify-content-center'}
          activeClassName={'active'}
          pageLinkClassName={'page-link'}
          previousLinkClassName={'page-link'}
          nextLinkClassName={'page-link'}
          breakClassName={'page-item'}
          breakLinkClassName={'page-link'}
          disabledClassName={'disabled'}
        />
      </nav>
    </div>
  )
}

export default ContainerCard
