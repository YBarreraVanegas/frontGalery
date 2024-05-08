import { useState } from 'react'
import { useNavigate } from 'react-router-dom' // Importar useNavigate
import usePostData from '../Fetch/usePostData'

const CreatePerfil = () => {
  const [nombre, setNombre] = useState('')
  const [imagenPerfil, setImagenPerfil] = useState(null)
  const [descripcion, setDescripcion] = useState('')

  const { postData, loading, error, token } = usePostData()

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
    await postData(`${import.meta.env.VITE_URL_API}/perfil`, formData, token)

    navigate('/', { replace: true })
    window.location.reload() // Recargar la página
  }

  return (
    <form className="container mt-4" onSubmit={handleSubmit}>
      <div className="mb-3">
        <input
          type="text"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
          className="form-control"
          placeholder="Nombre"
        />
      </div>
      <div className="mb-3">
        <input
          type="file"
          onChange={handleImagenPerfilChange}
          className="form-control"
          accept="image/*"
        />
      </div>
      <div className="mb-3">
        <textarea
          value={descripcion}
          onChange={e => setDescripcion(e.target.value)}
          className="form-control"
          placeholder="Descripción"
        />
      </div>

      <button type="submit" disabled={loading} className="btn btn-primary">
        Enviar
      </button>
      {loading && <p className="mt-2">Enviando datos...</p>}
      {error && <p className="mt-2 text-danger">Error al enviar datos</p>}
    </form>
  )
}

export default CreatePerfil
