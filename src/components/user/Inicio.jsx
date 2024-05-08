import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import useLoginRequest from '../Fetch/usePostLogin'

const url = `${import.meta.env.VITE_URL_API}/login`

const InicioSesion = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { token, error, loading, login } = useLoginRequest()
  const navigate = useNavigate()

  const [showModal, setShowModal] = useState(false)

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
      navigate('/')
    }
  }, [token, navigate])

  const openModal = () => {
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
  }

  const handleSendRecoveryCode = async () => {
    // Aquí deberías enviar el correo electrónico para generar el código de recuperación
    // y luego cerrar el modal
    closeModal()
  }

  return (
    <Form className="container mt-4" onSubmit={handleSubmit}>
      <h1>Iniciar sesión</h1>
      <Form.Group controlId="email" className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Ingrese su email"
          value={email}
          onChange={handleEmailChange}
        />
      </Form.Group>

      <Form.Group controlId="password" className="mb-3">
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

      {error && (
        <div className="mt-3 text-danger">Error al iniciar sesión: {error}</div>
      )}

      <p className="mt-3">
        ¿Olvidó su contraseña?
        <Link to="#" onClick={openModal}>
          Recupérela aquí
        </Link>
      </p>

      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Recuperar Contraseña</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="recoveryEmail">
            <Form.Label>Ingrese su correo electrónico</Form.Label>
            <Form.Control
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={handleEmailChange}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleSendRecoveryCode}>
            Enviar código
          </Button>
        </Modal.Footer>
      </Modal>
    </Form>
  )
}

export default InicioSesion
