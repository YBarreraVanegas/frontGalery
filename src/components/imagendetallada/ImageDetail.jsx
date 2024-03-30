import { useParams } from 'react-router-dom'
import ImageDownload from './Download.jsx'
import SideBar from './SidebarDetail.jsx'
import './style/detailImage.css'
import Carrusel from './Carrusel.jsx'
const ImageDetail = () => {
  const { id } = useParams()
  return (
    <div className="container-Detail">
      <ImageDownload
        imageUrl={`${import.meta.env.VITE_URL_API}/api/${id}`}
        className="img-detail"
      />
      <SideBar />
    </div>
  )
}

export default ImageDetail
