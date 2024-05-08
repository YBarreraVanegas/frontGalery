import { useEffect, useState } from 'react'
import useGetData from '../Fetch/useGetData'

const CategoriasDetail = id => {
  const idImg = id.id

  const url = `${import.meta.env.VITE_URL_API}/api`
  const urlMainImg = `${import.meta.env.VITE_URL_API}/api/${idImg}`
  const [dataCarrusel, setDataCarrusel] = useState([])

  const { data, loading, error, refetch } = useGetData(url)
  const { data: dataMainImg } = useGetData(urlMainImg)
  const categorias = dataMainImg.categorias
  console.log(categorias)
  useEffect(() => {
    if (data) {
      setDataCarrusel(data)
    }
  }, [data])
  if (loading) {
    return <div>Cargando...</div>
  }

  if (error) {
    return <div>Error al cargar los datos</div>
  }

  return (
    <div className="carrusel">
      {dataCarrusel.map(item => (
        <div className="container" key={item.id}>
          <ul>
            <li> {item.categorias} </li>
          </ul>
        </div>
      ))}
    </div>
  )
}

export default CategoriasDetail
