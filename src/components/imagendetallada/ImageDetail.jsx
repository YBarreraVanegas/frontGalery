import { useParams } from 'react-router-dom'
import ImageDownload from './Download.jsx'

const ImageDetail = () => {
  const { id } = useParams()
  return (
    <div>
      <ImageDownload imageUrl={`${import.meta.env.VITE_URL_API}/api/${id}`} />
    </div>
  )
}

export default ImageDetail
