import { Navigate } from 'react-router-dom'
import Dashboard from '../dashboard/Dashboard'
import CreatePerfil from '../crearPerfil/CreatePerfil'
import CreateCard from '../crearCard/CreateCard'
import Editar from '../editar/Editar'

export const RutaProtegida = () => {
  const token = localStorage.getItem('token')

  return token ? <Dashboard /> : <Navigate to="/" />
}

export const RutaProtegidaEdit = () => {
  const token = localStorage.getItem('token')

  return token ? <Editar /> : <Navigate to="/" />
}

export const RutaProtegidaCreate = () => {
  const token = localStorage.getItem('token')

  return token ? <CreatePerfil /> : <Navigate to="/registro" />
}
export const RutaProtegidaCreateCard = () => {
  const token = localStorage.getItem('token')

  return token ? <CreateCard /> : <Navigate to="/registro" />
}
