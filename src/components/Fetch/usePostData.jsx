import { useEffect, useState } from 'react'

const usePostData = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [responseData, setResponseData] = useState(null)
  const [token, setToken] = useState('')

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    if (storedToken) {
      setToken(storedToken)
    }
  }, [])

  const postData = async (url, formData) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: token ? `Bearer ${token}` : '', // Agrega el token a la cabecera de autorización si está presente
        },
        body: formData,
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || 'Error en la solicitud')
      }
      setResponseData(data)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return { loading, error, responseData, postData, token }
}

export default usePostData
