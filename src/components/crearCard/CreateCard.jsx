import React, { useState } from 'react'
import usePostData from '../Fetch/usePostData'

const CreateCard = () => {
  const [titulo, setTitulo] = useState('')
  const [imagenPerfil, setImagenPerfil] = useState(null)
  const [descripcion, setDescripcion] = useState('')
  const [categorias, setCategorias] = useState([])
  const [categoriaInput, setCategoriaInput] = useState('')
  const [token] = useState(localStorage.getItem('token') || '')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const url = `${import.meta.env.VITE_URL_API}/api`
  const { postData } = usePostData()

  const handleImagenPerfilDrop = e => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    setImagenPerfil(file)
  }

  const handleImagenPerfilChange = e => {
    const file = e.target.files[0]
    setImagenPerfil(file)
  }

  const handleSeleccionarImagenClick = () => {
    document.getElementById('inputImagenPerfil').click()
  }

  const handleCategoriaInputChange = e => {
    setCategoriaInput(e.target.value)
  }

  const handleAgregarCategoria = () => {
    if (categoriaInput.trim() !== '') {
      setCategorias(prevCategorias => [
        ...prevCategorias,
        categoriaInput.trim(),
      ])
      setCategoriaInput('')
    }
  }

  const handleEliminarCategoria = index => {
    setCategorias(prevCategorias =>
      prevCategorias.filter((_, i) => i !== index)
    )
  }

  const handleSubmit = async e => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('titulo', titulo)
    formData.append('imagen', imagenPerfil)
    formData.append('descripcion', descripcion)
    formData.append('categorias', JSON.stringify(categorias))

    try {
      setLoading(true)
      setError('')

      await postData(url, formData, token)

      clearForm()
    } catch (error) {
      console.error('Error al enviar datos:', error)
      setError('Error al enviar datos. Por favor, inténtalo de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  const clearForm = () => {
    setTitulo('')
    setImagenPerfil(null)
    setDescripcion('')
    setCategorias([])
    setCategoriaInput('')
  }

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <div className="mb-3">
        <label htmlFor="titulo" className="form-label">
          Título
        </label>
        <input
          type="text"
          id="titulo"
          className="form-control"
          value={titulo}
          onChange={e => setTitulo(e.target.value)}
          placeholder="Título"
        />
      </div>
      <div className="mb-3">
        <div
          className="mb-3"
          onDrop={handleImagenPerfilDrop}
          onDragOver={e => e.preventDefault()}
        >
          <label htmlFor="imagenPerfil" className="form-label">
            Imagen
          </label>
          <div className="form-control" style={{ minHeight: '100px' }}>
            {imagenPerfil ? (
              <img
                src={URL.createObjectURL(imagenPerfil)}
                alt="Imagen"
                style={{ maxWidth: '100%' }}
              />
            ) : (
              <p>Arrastra y suelta la imagen aquí o selecciona un archivo</p>
            )}
          </div>
          <input
            type="file"
            id="inputImagenPerfil"
            className="d-none"
            onChange={handleImagenPerfilChange}
            accept="image/*"
          />
          <button
            type="button"
            className="btn btn-secondary mt-2"
            onClick={handleSeleccionarImagenClick}
          >
            Seleccionar Imagen
          </button>
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="descripcion" className="form-label">
          Descripción
        </label>
        <textarea
          id="descripcion"
          className="form-control"
          value={descripcion}
          onChange={e => setDescripcion(e.target.value)}
          placeholder="Descripción"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="categorias" className="form-label">
          Categorías
        </label>
        <div className="d-flex align-items-center">
          {categorias.map((categoria, index) => (
            <div key={index} className="badge bg-secondary me-2">
              {categoria}
              <span
                className="ms-1 text-white cursor-pointer"
                onClick={() => handleEliminarCategoria(index)}
              >
                X
              </span>
            </div>
          ))}
          <input
            type="text"
            id="categorias"
            className="form-control"
            value={categoriaInput}
            onChange={handleCategoriaInputChange}
            placeholder="Agregar categoría"
          />
          <button
            type="button"
            className="btn btn-primary ms-2"
            onClick={handleAgregarCategoria}
          >
            Agregar
          </button>
        </div>
      </div>
      <button type="submit" className="btn btn-primary" disabled={loading}>
        Enviar
      </button>
      {loading && <p className="mt-2">Enviando datos...</p>}
      {error && <p className="mt-2 text-danger">Error al enviar datos</p>}
    </form>
  )
}

export default CreateCard
