import { useState, useEffect, useRef } from 'react'
import './style/card.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap'
import useGetData from '../Fetch/useGetData'
import Card from './Card'

const ContainerCards = () => {
  const observerRef = useRef(null)
  const { data, loading, error, refetch } = useGetData(
    `${import.meta.env.VITE_URL_API}/api`
  )
  const [cardsToShow, setCardsToShow] = useState([])

  useEffect(() => {
    if (data) {
      setCardsToShow(data)
    }
  }, [data])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const [target] = entries
        if (target.isIntersecting) {
          target.target.scrollIntoView()
        }
      },
      { threshold: 0.1 }
    )

    const targetRef = observerRef.current
    if (targetRef) {
      observer.observe(targetRef)
    }

    return () => {
      if (targetRef) {
        observer.unobserve(targetRef)
      }
    }
  }, [])

  useEffect(() => {
    window.addEventListener('beforeunload', refetch)
    return () => {
      window.removeEventListener('beforeunload', refetch)
    }
  }, [])

  if (loading) {
    return <div>Cargando...</div>
  }

  if (error) {
    return <div>Error al cargar los datos</div>
  }

  return (
    <Container>
      <div className="container-cards">
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
      </div>
    </Container>
  )
}

export default ContainerCards
