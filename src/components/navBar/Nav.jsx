import React, { useEffect, useState, useRef } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Image from 'react-bootstrap/Image'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/logo.png'
import avatar from '../../assets/avatar.png'
import DarkModeToggle from '../darkmode/Darkmode'
import { ProfileImageNav } from '../dashboard/ImagePerfil'
import './Style/Nav.css'
import NavbarItems from './NavItems'

const NavBar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [userData, setUserData] = useState(null)
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const [perfil, setPerfil] = useState(null)
  const [imagenUrl, setImagenUrl] = useState(null)
  const userId = token ? JSON.parse(atob(token.split('.')[1])).userId : null
  const imageRef = useRef(null)

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
          setUserData(perfilEspecifico)
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

  const verificarExpiracionToken = () => {
    const token = localStorage.getItem('token')
    if (!token) {
      return
    }

    try {
      const { exp } = JSON.parse(atob(token.split('.')[1]))
      const expirationTime = exp * 1000 // Convertir a milisegundos
      const currentTime = new Date().getTime()

      if (currentTime > expirationTime) {
        localStorage.removeItem('token')
        window.location.reload()
        navigateToLogin()
      }
    } catch (error) {
      console.error('Error al verificar la expiración del token:', error)
    }

    setTimeout(verificarExpiracionToken, 60000)
  }

  useEffect(() => {
    verificarExpiracionToken()
  }, [])

  const navigateToLogin = () => {
    navigate('/')
  }

  const handlePerfil = () => {
    if (!perfil && token) {
      navigate('/create')
    } else {
      navigate('/dashboard')
    }
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
          <Nav className="mx-auto my-3 my-lg-0 align-items-center "></Nav>

          <NavbarItems
            userData={userData}
            dropdownOpen={dropdownOpen}
            setDropdownOpen={setDropdownOpen}
            handleLogout={handleLogout}
            handlePerfil={handlePerfil}
          />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar
