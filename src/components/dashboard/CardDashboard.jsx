import { Link } from 'react-router-dom'
import { ProfileImage } from './ImagePerfil'

const CardDashboard = ({ nombre, id }) => {
  return (
    <div className="container">
      <ProfileImage userId={id} />
      <h1>{nombre}</h1>
      <Link to="/editar">Editar perfil</Link>
    </div>
  )
}

export default CardDashboard
