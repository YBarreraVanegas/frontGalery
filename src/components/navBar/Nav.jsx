import { useState, useEffect } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Image from 'react-bootstrap/Image'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/logo.png'
import avatar from '../../assets/avatar.png'
import DarkModeToggle from '../darkmode/Darkmode'
import { ProfileImageNav } from '../dashboard/ImagePerfil' // Importa el nuevo componente
import './Style/Nav.css'

const NavBar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [userData, setUserData] = useState(null)
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const [perfil, setPerfil] = useState(null)
  const [imagenUrl, setImagenUrl] = useState(null)
  const userId = token ? JSON.parse(atob(token.split('.')[1])).userId : null

  useEffect(() => {
    const obtenerPerfiles = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_URL_API}/perfil`)
        const data = await response.json()
        const perfilEncontrado = data.find(
          perfil => perfil.usuario_id === userId
        )
        if (perfilEncontrado) {
          const responsePerfil = await fetch(
            `${import.meta.env.VITE_URL_API}/perfil/${perfilEncontrado.id}`
          )
          const perfilEspecifico = await responsePerfil.json()
          setPerfil(perfilEspecifico)
          setUserData(perfilEspecifico) // También actualiza userData con el perfil específico
          if (perfilEspecifico.imagen_perfil) {
            const imagenUrl = perfilEspecifico.imagen_perfil
              .replace(/["{}]/g, '')
              .split(',')
              .map(img => img.trim())[0]
            setImagenUrl(imagenUrl)
          }
        }
      } catch (error) {
        console.error('Error al cargar el perfil específico:', error)
      }
    }

    obtenerPerfiles()
  }, [userId])

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 50)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const navigateToLogin = () => {
    navigate('/')
  }

  const handlePerfil = () => {
    navigate('dashboard')
  }
  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.reload()
    navigateToLogin()
  }

  return (
    <Navbar
      expand="lg"
      className={`nav-custom ${
        isScrolled ? 'bg-body' : 'bg-body bg-opacity-10'
      } sticky-top`}
    >
      <Container fluid>
        <Navbar.Brand>
          <Link to="/" className="nav-link">
            <img src={logo} alt="logo-gallery" width={'50px'} />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="mx-auto my-3 my-lg-0 align-items-center">
            <Link to="/inicio" className="nav-link">
              Inicio
            </Link>{' '}
            <Link to="/descubre" className="nav-link">
              Descubre Más
            </Link>{' '}
            <Link to="/addimg" className="nav-link">
              Agrega Imagenes
            </Link>
          </Nav>

          <Nav
            className={`my-3 my-lg-0 align-items-center ${
              dropdownOpen ? 'nav-dropdown-open' : ''
            }`}
          >
            {userData ? (
              <NavDropdown
                title={userData.username}
                id="basic-nav-dropdown"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <NavDropdown.Item onClick={handleLogout}>
                  Cerrar Sesión
                </NavDropdown.Item>
                <NavDropdown.Item onClick={handlePerfil}>
                  perfil
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Link to="/registro" className="nav-link">
                  Regístrate
                </Link>{' '}
                <Link to="/ingreso" className="nav-link">
                  Inicia Sesión
                </Link>
              </>
            )}

            {!perfil && (
              <Image src={avatar} roundedCircle className="imagen_per" />
            )}

            {perfil && (
              <ProfileImageNav userId={perfil.id} className="imagen_per" />
            )}
            <DarkModeToggle className="darkmode-btn" />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar
