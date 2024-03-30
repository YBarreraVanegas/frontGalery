import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CardDashboard from '../dashboard/CardDashboard'

const Editar = () => {
  const [perfil, setPerfil] = useState(null)
  const [nombre, setNombre] = useState('')
  const [imagen, setImagen] = useState(null)
  const [descripcion, setDescripcion] = useState('')
  const token = localStorage.getItem('token')
  const userId = token ? JSON.parse(atob(token.split('.')[1])).userId : null
  const navigate = useNavigate()

  useEffect(() => {
    const obtenerPerfiles = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_URL_API}/perfil`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        const data = await response.json()
        const perfilEncontrado = data.find(
          perfil => perfil.usuario_id === userId
        )
        if (perfilEncontrado) {
          const responsePerfil = await fetch(
            `${import.meta.env.VITE_URL_API}/perfil/${perfilEncontrado.id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          const perfilEspecifico = await responsePerfil.json()
          setPerfil(perfilEspecifico)
          setNombre(perfilEspecifico.nombre)
          setDescripcion(perfilEspecifico.descripcion)
        }
      } catch (error) {
        console.error('Error al cargar el perfil específico:', error)
      }
    }

    obtenerPerfiles()
  }, [userId, token])

  const handleNombreChange = event => {
    setNombre(event.target.value)
  }

  const handleImagenChange = event => {
    setImagen(event.target.files[0])
  }

  const handleDescripcionChange = event => {
    setDescripcion(event.target.value)
  }

  const handleSubmit = async event => {
    event.preventDefault()
    try {
      const formData = new FormData()
      formData.append('nombre', nombre)
      if (imagen) {
        formData.append('imagen_perfil', imagen)
      }
      formData.append('descripcion', descripcion)

      const response = await fetch(
        `${import.meta.env.VITE_URL_API}/perfil/${perfil.id}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      )
      if (response.ok) {
        alert('Perfil actualizado exitosamente')
        navigate('/perfil') // Redirigir a la página de perfil después de la actualización
        window.location.reload() // Actualizar la página automáticamente
      } else {
        throw new Error('Error al actualizar el perfil')
      }
    } catch (error) {
      console.error('Error al actualizar el perfil:', error)
    }
  }

  if (!perfil) {
    return <p>Cargando perfil...</p>
  }

  return (
    <div className="container container-dashboard">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={handleNombreChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="imagen">Imagen:</label>
          <input
            type="file"
            id="imagen"
            onChange={handleImagenChange}
            className="form-control-file"
          />
        </div>
        <div className="form-group">
          <label htmlFor="descripcion">Descripción:</label>
          <textarea
            id="descripcion"
            value={descripcion}
            onChange={handleDescripcionChange}
            className="form-control"
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Guardar Cambios
        </button>
      </form>
    </div>
  )
}

export default Editar
