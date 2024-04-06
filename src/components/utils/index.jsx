import axios from 'axios'
import { useEffect, useState } from 'react'

export const ProcessedImageUrl = ({ imageUrl }) => {
  // Tratar la URL de la imagen aquí
  const processedUrl = imageUrl
    .replace(/[{""}]/g, '')
    .split(',')
    .map(img => img.trim())
    .join(',') // Unir los elementos del array tratado de nuevo en una cadena

  return (
    <div>
      <img src={processedUrl} alt="Perfil" className="card-img" />
    </div>
  )
}

export const useFavorito = imagenId => {
  const [favorito, setFavorito] = useState(false)
  const [guardado, setGuardado] = useState(false)
  const [mensaje, setMensaje] = useState('')
  const [loading, setLoading] = useState(true)
  const [perfilData, setPerfilData] = useState(null)
  const [showAlert, setShowAlert] = useState(false) // Nuevo estado para controlar el alert
  const token = localStorage.getItem('token')
  const perfilEncontrado = localStorage.getItem('perfilEncontrado')

  const fetchData = async () => {
    try {
      if (!token || !perfilEncontrado) {
        throw new Error('Token o perfil no encontrados')
      }

      const response = await axios.get(
        `${import.meta.env.VITE_URL_API}/perfil/${perfilEncontrado}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      setPerfilData(response.data)
      setFavorito(response.data.favoritos.includes(imagenId))
      setGuardado(response.data.guardados.includes(imagenId))
      setLoading(false)
    } catch (error) {
      console.error('Error al obtener datos del perfil:', error)
      setLoading(false)
    }
  }

  const toggleFavorito = async () => {
    try {
      if (!token || !perfilEncontrado) {
        setShowAlert(true)
        return
      }

      const formData = new FormData()
      formData.append('favoritos', imagenId)

      if (
        perfilData &&
        perfilData.favoritos &&
        perfilData.favoritos.includes(imagenId)
      ) {
        const response = await axios.delete(
          `${import.meta.env.VITE_URL_API}/fav/${perfilEncontrado}`,
          {
            data: formData,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        console.log('Eliminado de favoritos')
        setFavorito(false)
        setMensaje(response.data.message)
      } else {
        const response = await axios.post(
          `${import.meta.env.VITE_URL_API}/fav/${perfilEncontrado}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        console.log('Agregado a favoritos')
        setFavorito(true)
        setMensaje(response.data.message)
      }

      fetchData()
    } catch (error) {
      console.error('Error al agregar/eliminar imagen de favoritos:', error)
      setMensaje('Error al agregar/eliminar imagen de favoritos')
    }
  }

  const toggleGuardado = async () => {
    try {
      if (!token || !perfilEncontrado) {
        setShowAlert(true)
        return
      }

      const formData = new FormData()
      formData.append('guardados', imagenId)

      if (
        perfilData &&
        perfilData.guardados &&
        perfilData.guardados.includes(imagenId)
      ) {
        const response = await axios.delete(
          `${import.meta.env.VITE_URL_API}/fav/${perfilEncontrado}`,
          {
            data: formData,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        console.log('Eliminado de guardados')
        setGuardado(false)
        setMensaje(response.data.message)
      } else {
        const response = await axios.post(
          `${import.meta.env.VITE_URL_API}/fav/${perfilEncontrado}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        console.log('Agregado a guardados')
        setGuardado(true)
        setMensaje(response.data.message)
      }

      fetchData()
    } catch (error) {
      console.error('Error al agregar/eliminar imagen de guardados:', error)
      setMensaje('Error al agregar/eliminar imagen de guardados')
    }
  }

  useEffect(() => {
    if (token && perfilEncontrado) {
      fetchData()
    }
  }, [token, perfilEncontrado])

  // Mostrar el alert cuando showAlert es true
  useEffect(() => {
    if (showAlert) {
      alert('Para realizar esta acción, primero debes iniciar sesión.')
      setShowAlert(false) // Reiniciar el estado para no mostrar el alert repetidamente
    }
  }, [showAlert])

  useEffect(() => {}, [favorito, guardado]) // Escucha cambios en favorito y guardado

  return {
    favorito,
    guardado,
    mensaje,
    toggleFavorito,
    toggleGuardado,
    loading,
  }
}
