import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import useLoginRequest from '../Fetch/usePostLogin'

const url = `${import.meta.env.VITE_URL_API}/login`
const InicioSesion = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { token, error, loading, login } = useLoginRequest()
  const navigate = useNavigate()

  const handleEmailChange = e => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = e => {
    setPassword(e.target.value)
  }

  const handleSubmit = async e => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('email', email)
    formData.append('password', password)
    await login(formData, url)
  }

  // Navegar a la página de dashboard cuando se obtiene el token
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token)
      navigate('/dashboard')
    }
  }, [token, navigate])

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Ingrese su email"
          value={email}
          onChange={handleEmailChange}
        />
      </Form.Group>

      <Form.Group controlId="password">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control
          type="password"
          placeholder="Ingrese su contraseña"
          value={password}
          onChange={handlePasswordChange}
        />
      </Form.Group>

      <Button variant="primary" type="submit" disabled={loading}>
        {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
      </Button>

      {error && <div>Error al iniciar sesión: {error}</div>}
    </Form>
  )
}

export default InicioSesion
