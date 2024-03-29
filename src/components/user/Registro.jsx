import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import usePostRequest from '../Fetch/usePostData' // Importa el hook personalizado

const Registro = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { loading, error, responseData, postData } = usePostRequest() // Usa el hook

  const handleSubmit = e => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('email', email)
    formData.append('password_hash', password)

    postData(`${import.meta.env.VITE_URL_API}/register`, formData)
  }

  return (
    <Form onSubmit={handleSubmit}>
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
        <Form.Control
          type="password"
          placeholder="Ingrese su contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit" disabled={loading}>
        {loading ? 'Registrando...' : 'Registrarse'}
      </Button>

      {error && <div>Error al registrar: {error}</div>}
      {responseData && (
        <div>Registro exitoso</div>
        // <div>Registro exitoso, {console.log(JSON.stringify(responseData))}</div>
      )}
    </Form>
  )
}

export default Registro
