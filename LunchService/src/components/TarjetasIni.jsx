function Tarjetas() {
  return (
    <div className="cards-section">

      <div className="card rounded-card">
        <img src="/imagenes/card1.jpg" alt="Comida 1" />
        <h3>Instituciones</h3>
        <p>Opciones saludables para empezar el día.</p>
        <button className="btn-card">Ver más</button>
      </div>

      <div className="card rounded-card">
        <img src="/imagenes/card2.jpg" alt="Comida 2" />
        <h3>Formas de Pago</h3>
        <p>Platos balanceados y deliciosos.</p>
        <button className="btn-card">Ver más</button>
      </div>

      <div className="card rounded-card">
        <img src="/imagenes/card3.jpg" alt="Comida 3" />
        <h3>Programas</h3>
        <p>
          Conoce los programas que ofrecemos para
          la alimentación de tus hijos
        </p>
        <button className="btn-card">Ver más</button>
      </div>

      {/* 👇 AHORA SÍ, al mismo nivel */}
      <div className="card rounded-card">
        <img src="/imagenes/card4.jpg" alt="Comida 4" />
        <h3>Postres</h3>
        <p>Dulces deliciosos para cualquier momento.</p>
        <button className="btn-card">Ver más</button>
      </div>

    </div>
  );
}

export default Tarjetas;