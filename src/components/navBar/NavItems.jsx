import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Image from 'react-bootstrap/Image'
import { Link } from 'react-router-dom'
import DarkModeToggle from '../darkmode/Darkmode'
import { ProfileImageNav } from '../dashboard/ImagePerfil'
import avatar from '../../assets/avatar.png'
import { handleLogout } from '../utils/Auth'

const NavbarItems = ({ userData, dropdownOpen, setDropdownOpen }) => {
  return (
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

          <Link to="/dashboard" className="dropdown-item">
            Perfil
          </Link>
        </NavDropdown>
      ) : (
        <>
          <Link to="/registro" className="nav-link">
            Regístrate
          </Link>
          <Link to="/ingreso" className="nav-link">
            Inicia Sesión
          </Link>
        </>
      )}

      {!userData && (
        <Image
          src={avatar}
          roundedCircle
          className="imagen_per"
          onClick={() => {
            if (dropdownOpen) {
              setDropdownOpen(false)
            } else {
              setDropdownOpen(true)
            }
          }}
        />
      )}

      {userData && (
        <ProfileImageNav userId={userData.id} className="imagen_per" />
      )}
      <DarkModeToggle className="darkmode-btn" />
      <Link to="/addimg" className="nav-link bg-success text-light">
        Subir <i className="bi bi-arrow-up-circle-fill"></i>
      </Link>
    </Nav>
  )
}

export default NavbarItems
