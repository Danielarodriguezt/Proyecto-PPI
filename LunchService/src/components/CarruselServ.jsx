function CarruselServ() {
  return (
    <div className="servicios-header vh-100 position-relative">

      <img
        src="/Carr1.jpg"
        className="d-block w-100 h-100"
        style={{ objectFit: "cover" }}
        alt="Encabezado servicios"
      />

      <div className="servicios-overlay">
        <div className="servicios-content">
          <h2>Bienvenidos</h2>
          <p>Comida deliciosa</p>
        </div>
      </div>

    </div>
  );
}

export default CarruselServ;