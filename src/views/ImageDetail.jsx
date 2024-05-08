import React from 'react'
import { useParams } from 'react-router-dom'
import ImageDownload from '../components/imagendetallada/Download.jsx'
import SideBar from '../components/imagendetallada/SidebarDetail.jsx'
import '../components/imagendetallada/style/detailImage.css'
import CategoriasDetail from '../components/imagendetallada/Carrusel.jsx'
const ImageDetail = () => {
  const { id } = useParams()
  const imageUrl = `${import.meta.env.VITE_URL_API}/api/${id}`
  return (
    <div className="container-Detail">
      <ImageDownload imageUrl={imageUrl} className="img-detail" />
      <SideBar />
      <CategoriasDetail id={id} />
    </div>
  )
}

export default ImageDetail
