function Tarjetas() {
  return (
    <div className="cards-section">

      <div className="card rounded-card">
        <img src="./Instituciones.jpg" alt="Comida 1" />
        <h3>Instituciones</h3>

        <button className="btn-card">Ver más</button>
      </div>

      <div className="card rounded-card">
        <img src="./FormasdePago.jpg" alt="Comida 2" />
        <h3>Formas de Pago</h3>
        <button className="btn-card">Ver más</button>
      </div>

      <div className="card rounded-card">
        <img src="./Programas.jpg" alt="Comida 3" />
        <h3>Programas</h3>
        <button className="btn-card">Ver más</button>
      </div>

    </div>
  );
}

export default Tarjetas;