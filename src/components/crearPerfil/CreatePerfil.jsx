import { useState } from 'react'
import { useNavigate } from 'react-router-dom' // Importar useNavigate
import usePostData from '../Fetch/usePostData'

const CreatePerfil = () => {
  const [nombre, setNombre] = useState('')
  const [imagenPerfil, setImagenPerfil] = useState(null)
  const [descripcion, setDescripcion] = useState('')
  const [token] = useState(localStorage.getItem('token') || '')

  const url = `${import.meta.env.VITE_URL_API}/perfil`
  const { postData, loading, error } = usePostData()
  const navigate = useNavigate() // Obtener la función de navegación

  const handleImagenPerfilChange = e => {
    const file = e.target.files[0]
    setImagenPerfil(file)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('nombre', nombre)
    formData.append('imagen_perfil', imagenPerfil)
    formData.append('descripcion', descripcion)
    await postData(url, formData, token)

    // Redirigir a la página principal ('/') después de enviar el formulario
    navigate('/', { replace: true }) // Usar navigate con replace para reemplazar la entrada en el historial
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={nombre}
        onChange={e => setNombre(e.target.value)}
        placeholder="Nombre"
      />
      <input type="file" onChange={handleImagenPerfilChange} accept="image/*" />
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
