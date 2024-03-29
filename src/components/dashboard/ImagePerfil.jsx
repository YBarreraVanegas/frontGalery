import React, { useState, useEffect } from 'react'

export const ProfileImage = ({ userId }) => {
  const [imagenUrl, setImagenUrl] = useState(null)

  useEffect(() => {
    const obtenerImagenPerfil = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_URL_API}/perfil/${userId}`
        )
        const data = await response.json()
        if (data && data.imagen_perfil) {
          const urlImagen = data.imagen_perfil
            .replace(/["{}]/g, '')
            .split(',')
            .map(img => img.trim())[0]
          setImagenUrl(urlImagen)
        }
      } catch (error) {
        console.error('Error al obtener la imagen del perfil:', error)
      }
    }

    obtenerImagenPerfil()
  }, [userId])

  if (!imagenUrl) {
    return <p>Cargando imagen de perfil...</p>
  }

  return <img src={imagenUrl} alt="Perfil" />
}

export const ProfileImageNav = ({ userId }) => {
  const [imagenUrl, setImagenUrl] = useState(null)

  useEffect(() => {
    const obtenerImagenPerfil = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_URL_API}/perfil/${userId}`
        )
        const data = await response.json()
        if (data && data.imagen_perfil) {
          const urlImagen = data.imagen_perfil
            .replace(/["{}]/g, '')
            .split(',')
            .map(img => img.trim())[0]
          setImagenUrl(urlImagen)
        }
      } catch (error) {
        console.error('Error al obtener la imagen del perfil:', error)
      }
    }

    obtenerImagenPerfil()
  }, [userId])

  if (!imagenUrl) {
    return <p>Cargando imagen de perfil...</p>
  }

  return (
    <div className="container-circle">
      <img src={imagenUrl} alt="Perfil" className="imagenNav" />
    </div>
  )
}
