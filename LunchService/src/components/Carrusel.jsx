function Carrusel() {
  return (
    <div id="carouselExampleDark" className="carousel carousel-dark slide vh-100">

      <div className="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active"></button>
        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1"></button>
        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2"></button>
      </div>

      <div className="carousel-inner">

        {/* Slide 1 */}
        <div className="carousel-item active vh-100 position-relative">
          <img src="/Carr1.jpg" className="d-block w-100 h-100" style={{ objectFit: "cover" }} />

          <div className="glass-overlay">
            <div className="glass-content">
              <h2>Bienvenidos</h2>
              <p>Comida deliciosa</p>
            </div>
          </div>
        </div>

        {/* Slide 2 */}
        <div className="carousel-item vh-100 position-relative">
          <img src="/imagenes/comida1.jpg" className="d-block w-100 h-100" style={{ objectFit: "cover" }} />

          <div className="glass-overlay">
            <div className="glass-content">
              <h2>Sabores únicos</h2>
              <p>Hecho con amor</p>
            </div>
          </div>
        </div>

        {/* Slide 3 */}
        <div className="carousel-item vh-100 position-relative">
          <img src="/imagenes/comida1.jpg" className="d-block w-100 h-100" style={{ objectFit: "cover" }} />

          <div className="glass-overlay">
            <div className="glass-content">
              <h2>Experiencia increíble</h2>
              <p>Para todos los gustos</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

export default Carrusel;