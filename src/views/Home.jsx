import ContainerCards from '../components/card/ContainerCards'
import MiddleHome from '../components/middleHome/MiddleHome'
import BuscadorImagenes from '../components/search/SearchBar'
import BuscadorImagenesPorCaracteristicas from '../components/search/SearchCaracteristicas'

const Home = () => {
  return (
    <div className="container-home">
      <MiddleHome />
      <BuscadorImagenes />
      <BuscadorImagenesPorCaracteristicas />
      <ContainerCards />
    </div>
  )
}

export default Home
