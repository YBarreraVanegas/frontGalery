import { useState } from 'react'
import axios from 'axios'

const usePostData = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [responseData, setResponseData] = useState(null)

  const postData = async (url, formData, userId) => {
    setLoading(true)
    setError(null)

    try {
      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userId}`, // Incluye el token en la cabecera
        },
      })
      setResponseData(response.data)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return { loading, error, responseData, postData }
}

export default usePostData
