import { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom' // Importa el hook de navegación
import usePostData from '../Fetch/usePostData' // Importa el hook personalizado
import 'bootstrap/dist/css/bootstrap.min.css' // Importa los estilos de Bootstrap

const Registro = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorText, setErrorText] = useState('')
  const [showPassword, setShowPassword] = useState(false) // Estado para mostrar/ocultar la contraseña
  const { loading, error, responseData, postData } = usePostData() // Usa el hook
  const navigate = useNavigate() // Hook de navegación

  const handleSubmit = async e => {
    e.preventDefault()

    // Validación de campos
    if (!email || !password) {
      setErrorText('Por favor complete todos los campos.')
      return
    }

    // Validación de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setErrorText('Por favor ingrese un correo electrónico válido.')
      return
    }

    // Validación de contraseña
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*.])(?=.*[^\s]).{8,}$/
    if (!passwordRegex.test(password)) {
      setErrorText(
        'La contraseña debe contener al menos 8 caracteres, incluyendo al menos un número, una mayúscula, una minúscula y un carácter especial.'
      )
      return
    }

    const formData = new FormData()
    formData.append('email', email)
    formData.append('password_hash', password)

    postData(`${import.meta.env.VITE_URL_API}/register`, formData)
  }

  useEffect(() => {
    if (responseData && responseData.token) {
      localStorage.setItem('token', responseData.token) // Guarda el token en el almacenamiento local
      navigate('/create') // Redirige al usuario al create perfil
    }
  }, [responseData, navigate])

  return (
    <Form className="container mt-4" onSubmit={handleSubmit}>
      <Form.Group controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Ingrese su email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="password">
        <Form.Label>Contraseña</Form.Label>
        <div className="input-group">
          <Form.Control
            type={showPassword ? 'text' : 'password'}
            placeholder="Ingrese su contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Button
            variant="outline-secondary"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <i className="bi bi-eye-slash"></i>
            ) : (
              <i className="bi bi-eye"></i>
            )}
          </Button>
        </div>
      </Form.Group>

      <Button variant="primary" type="submit" disabled={loading}>
        {loading ? 'Registrando...' : 'Registrarse'}
      </Button>

      {error && <div>Error al registrar: {error}</div>}
      {errorText && <div className="text-danger">{errorText}</div>}
    </Form>
  )
}

export default Registro
