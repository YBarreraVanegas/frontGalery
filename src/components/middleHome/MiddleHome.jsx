import middle from '../../assets/wal.jpg'
import middleMovil from '../../assets/exmple.jpg'
import './style/middle.css'
const MiddleHome = () => {
  return (
    <div className="contaner-middle">
      <img src={middle} alt="Mitad de imagen de fondo" className="middle-img" />
      <img
        src={middleMovil}
        alt="Mitad de imagen de fondo"
        className="middle-img-hiden"
      />
    </div>
  )
}

export default MiddleHome
