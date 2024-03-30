import React, { useState, useEffect, useRef } from 'react'
import useGetData from '../Fetch/useGetData'
import Card from './Card.jsx'
import './style/card.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Masonry from 'react-masonry-css'

export const ContainerCard = () => {
  const { data, loading, error, refetch } = useGetData(
    `${import.meta.env.VITE_URL_API}/api`
  )
  const [cardsToShow, setCardsToShow] = useState([])
  const observerRef = useRef(null)
  const observerTargetRef = useRef(null)

  useEffect(() => {
    if (data) {
      setCardsToShow(data)
    }
  }, [data])

  useEffect(() => {
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(
        entries => {
          const [target] = entries
          if (target.isIntersecting) {
            observerTargetRef.current &&
              observerTargetRef.current.scrollIntoView()
          }
        },
        {
          root: null,
          rootMargin: '0px',
          threshold: 0.1,
        }
      )
    }

    const observer = observerRef.current
    if (observer && observerTargetRef.current) {
      observer.observe(observerTargetRef.current)
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  // Función para recargar los datos
  const handleRefresh = () => {
    refetch()
  }

  useEffect(() => {
    window.addEventListener('beforeunload', handleRefresh)
    return () => {
      window.removeEventListener('beforeunload', handleRefresh)
    }
  }, [])

  if (loading) {
    return <div>Cargando...</div>
  }

  if (error) {
    return <div>Error al cargar los datos</div>
  }

  return (
    <div>
      <Masonry
        breakpointCols={{ default: 4, 1100: 3, 700: 2, 500: 1 }}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {cardsToShow.map(item => (
          <div key={item.id} className="my-masonry-grid_item">
            <Card
              id={item.id}
              imagen={item.imagen}
              titulo={item.titulo}
              descripcion={item.descripcion}
            />
          </div>
        ))}
      </Masonry>
      <div ref={observerTargetRef} />
    </div>
  )
}

export default ContainerCard
