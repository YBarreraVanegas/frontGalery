import { useState } from 'react'
import axios from 'axios'

const useLoginRequest = () => {
  const [token, setToken] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const login = async (formData, url) => {
    setLoading(true)
    setError(null)

    try {
      const response = await axios.post(url, formData)

      if (response.data.token) {
        setToken(response.data.token)
      } else {
        setError('No se recibió el token del servidor')
      }
    } catch (error) {
      setError('Error al iniciar sesión')
    } finally {
      setLoading(false)
    }
  }

  return { token, error, loading, login }
}

export default useLoginRequest
