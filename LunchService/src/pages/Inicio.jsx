import MenuNav from '../components/Menu'
import Carrusel from '../components/Carrusel'
import ImagenLateralD from '../components/ImgLatD'
import ImagenLateralIZ from '../components/ImgLatIZ'
import Tarjetas from '../components/TarjetasIni';
import Footer from '../components/Footer';
import GaleriaCircular from '../components/GaleriaCircular';


function Inicio() {
  return (
    <>
      <MenuNav />
      <Carrusel />
      <ImagenLateralD />
      <ImagenLateralIZ />
      <Tarjetas />
      <GaleriaCircular />
      <Footer />
    </>
  );
}

export default Inicio;