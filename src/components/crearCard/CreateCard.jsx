import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import usePostData from '../Fetch/usePostData'

const CreateCard = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm()
  const { postData } = usePostData()
  const [loading, setLoading] = useState(false)
  const [error, setErrorMsg] = useState('')
  const [imageUploaded, setImageUploaded] = useState(false) // Nuevo estado para controlar si la imagen se ha enviado
  const token = localStorage.getItem('token') || ''
  const url = `${import.meta.env.VITE_URL_API}/api`
  const [previewImage, setPreviewImage] = useState(null)
  const [categoriasList, setCategoriasList] = useState([])
  const [selectedFile, setSelectedFile] = useState(null) // Nuevo estado para guardar el archivo seleccionado

  const imagen = watch('imagen')

  const handleImagenChange = e => {
    const file = e.target.files[0]
    setSelectedFile(file) // Guardar el archivo seleccionado en el estado
    setPreviewImage(URL.createObjectURL(file)) // Mostrar vista previa de la imagen
  }

  const onSubmit = async data => {
    try {
      setLoading(true)
      setErrorMsg('')

      const formData = new FormData()
      formData.append('titulo', data.titulo)
      formData.append('descripcion', data.descripcion)
      formData.append('categorias', JSON.stringify(categoriasList))
      formData.append('imagen', selectedFile, 'imagen') // Agregar el archivo al FormData con el nombre 'imagen'

      await postData(url, formData, token)

      clearForm()
      setImageUploaded(true) // Establecer que la imagen se ha enviado
    } catch (error) {
      console.error('Error al enviar datos:', error)
      setErrorMsg('Error al enviar datos. Por favor, inténtalo de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  const handleEliminarCategoria = categoria => {
    const updatedCategorias = categoriasList.filter(cat => cat !== categoria)
    setCategoriasList(updatedCategorias)
  }

  const clearForm = () => {
    setValue('titulo', '')
    setValue('imagen', null)
    setValue('descripcion', '')
    setCategoriasList([])
    setPreviewImage(null)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="container mt-4">
      <div className="mb-3">
        <label htmlFor="titulo" className="form-label">
          Título
        </label>
        <input
          type="text"
          id="titulo"
          className="form-control"
          {...register('titulo', { required: 'Este campo es requerido' })}
          placeholder="Título"
        />
        {errors.titulo && (
          <p className="text-danger">{errors.titulo.message}</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="imagen" className="form-label">
          Imagen
        </label>
        <input
          type="file"
          id="imagen"
          className="form-control"
          {...register('imagen', {
            required: previewImage ? false : 'Selecciona una imagen',
          })}
          onChange={handleImagenChange}
          accept="image/*"
        />
        {errors.imagen && (
          <p className="text-danger">{errors.imagen.message}</p>
        )}
      </div>
      {previewImage && (
        <div className="mb-3">
          <img src={previewImage} alt="Imagen" style={{ maxWidth: '100%' }} />
        </div>
      )}
      <div className="mb-3">
        <label htmlFor="descripcion" className="form-label">
          Descripción
        </label>
        <textarea
          id="descripcion"
          className="form-control"
          {...register('descripcion', { required: 'Este campo es requerido' })}
          placeholder="Descripción"
        />
        {errors.descripcion && (
          <p className="text-danger">{errors.descripcion.message}</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="categorias" className="form-label">
          Categorías
        </label>
        <input
          type="text"
          id="categorias"
          className="form-control"
          placeholder="Agregar categoría"
          onKeyDown={e => {
            if (e.key === ' ' && e.target.value.trim()) {
              e.preventDefault() // Evita que se agregue el espacio al valor del campo

              const nuevaCategoria = e.target.value.trim()
              setCategoriasList([...categoriasList, nuevaCategoria])
              e.target.value = '' // Limpia el campo de entrada
            }
          }}
        />
        <div className="mb-3">
          <label className="form-label">Categorías seleccionadas:</label>
          <div className="d-flex flex-wrap">
            {categoriasList.length > 0 ? (
              categoriasList.map((categoria, index) => (
                <div key={index} className="badge bg-secondary me-2">
                  {categoria}
                  <span
                    className="ms-1 text-white cursor-pointer"
                    onClick={() => handleEliminarCategoria(categoria)}
                  >
                    X
                  </span>
                </div>
              ))
            ) : (
              <p>No hay categorías seleccionadas.</p>
            )}
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="btn btn-primary"
        disabled={loading || (!imagen && !previewImage)} // Modificamos la condición del disabled
      >
        Enviar
      </button>
      {imageUploaded && (
        <div className="alert alert-success mt-3" role="alert">
          La imagen se ha subido exitosamente.
        </div>
      )}
      {loading && <p className="mt-2">Enviando datos...</p>}
      {error && <p className="mt-2 text-danger">Error al enviar datos</p>}
    </form>
  )
}

export default CreateCard
