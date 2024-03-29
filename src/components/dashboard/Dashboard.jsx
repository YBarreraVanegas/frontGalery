import React, { useEffect, useState } from 'react'
import { ProfileImage } from './ImagePerfil'

const Dashboard = () => {
  const [perfil, setPerfil] = useState(null)
  const token = localStorage.getItem('token')
  const userId = token ? JSON.parse(atob(token.split('.')[1])).userId : null

  useEffect(() => {
    const obtenerPerfiles = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_URL_API}/perfil`)
        const data = await response.json()
        const perfilEncontrado = data.find(
          perfil => perfil.usuario_id === userId
        )
        if (perfilEncontrado) {
          const responsePerfil = await fetch(
            `${import.meta.env.VITE_URL_API}/perfil/${perfilEncontrado.id}`
          )
          const perfilEspecifico = await responsePerfil.json()
          setPerfil(perfilEspecifico)
        }
      } catch (error) {
        console.error('Error al cargar el perfil específico:', error)
      }
    }

    obtenerPerfiles()
  }, [userId])
  if (!perfil) {
    return <p>Cargando perfil...</p>
  }

  return (
    <div className="container">
      <ProfileImage userId={perfil.id} />
      <h1>Perfil de {perfil.nombre}</h1>
      <p>Email: {perfil.descripcion}</p>
    </div>
  )
}

export default Dashboard
