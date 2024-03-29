import { useState } from 'react'
import usePostData from '../Fetch/usePostData'

const CreatePerfil = () => {
  const [nombre, setNombre] = useState('')
  const [imagenPerfil, setImagenPerfil] = useState(null) // Cambiado a null inicialmente
  const [descripcion, setDescripcion] = useState('')
  const [token] = useState(localStorage.getItem('token') || '')

  const url = `${import.meta.env.VITE_URL_API}/perfil`
  const { postData, loading, error } = usePostData()

  const handleImagenPerfilChange = e => {
    const file = e.target.files[0]
    setImagenPerfil(file)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('nombre', nombre)
    formData.append('imagen_perfil', imagenPerfil) // Agregar imagen al FormData directamente
    formData.append('descripcion', descripcion)
    await postData(url, formData, token)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={nombre}
        onChange={e => setNombre(e.target.value)}
        placeholder="Nombre"
      />
      <input
        type="file"
        onChange={handleImagenPerfilChange} // Manejar el cambio de la imagen
        accept="image/*" // Aceptar solo archivos de imagen
      />
      <textarea
        value={descripcion}
        onChange={e => setDescripcion(e.target.value)}
        placeholder="Descripción"
      />

      <button type="submit" disabled={loading}>
        Enviar
      </button>
      {loading && <p>Enviando datos...</p>}
      {error && <p>Error al enviar datos</p>}
    </form>
  )
}

export default CreatePerfil
