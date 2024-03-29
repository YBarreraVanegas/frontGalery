import { useState, useEffect } from 'react'
import axios from 'axios'

const useGetData = url => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = async () => {
    try {
      const response = await axios.get(url)
      setData(response.data)
    } catch (error) {
      console.error('Error de red:', error)
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [url])

  const refetch = () => {
    setLoading(true)
    fetchData()
  }

  return { data, loading, error, refetch }
}

export default useGetData
