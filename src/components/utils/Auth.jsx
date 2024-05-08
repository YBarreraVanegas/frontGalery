export const getToken = () => localStorage.getItem('token')

export const setToken = token => localStorage.setItem('token', token)

export const removeToken = () => localStorage.removeItem('token')

export const isTokenExpired = () => {
  const token = getToken()
  if (!token) return true

  try {
    const { exp } = JSON.parse(atob(token.split('.')[1]))
    const expirationTime = exp * 1000
    const currentTime = new Date().getTime()
    return currentTime > expirationTime
  } catch (error) {
    console.error('Error al verificar la expiración del token:', error)
    return true
  }
}

export const handleLogout = () => {
  removeToken()
  window.location.reload()
}
