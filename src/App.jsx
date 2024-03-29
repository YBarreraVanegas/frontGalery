import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/navBar/Nav'
import Registro from './components/user/Registro'
import InicioSesion from './components/user/Inicio'
import Inicio from './components/inicio/Inicio'
import {
  RutaProtegida,
  RutaProtegidaCreate,
  RutaProtegidaCreateCard,
} from './components/rutas/Ruta'
import Home from './views/Home'
import ImageDetail from './components/imagendetallada/ImageDetail'
import CardsPorCategoria from './components/cardsCat/CardsPorCategoria'
import Descubre from './components/descubre/Descubre'

function App() {
  return (
    <>
      <div className="app-container">
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/ingreso" element={<InicioSesion />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/imagenes/:id" element={<ImageDetail />} />
          <Route path="/*" element={<Home />} />
          <Route path="/filtro/:categoria" element={<CardsPorCategoria />} />
          <Route path="/descubre" element={<Descubre />} />

          <Route path="/create" element={<RutaProtegidaCreate />} />
          <Route path="/addimg" element={<RutaProtegidaCreateCard />} />
          <Route path="/dashboard" element={<RutaProtegida />} />
        </Routes>
      </div>
    </>
  )
}

export default App
