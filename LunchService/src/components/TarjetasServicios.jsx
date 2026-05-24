import "./TarjetasServicios.css";

function TarjetasServicios() {
  return (
    <div className="container mt-4">
      <div className="row justify-content-center gap-3">

        {/* Tarjeta 1 */}
        <div className="card tarjeta-servicio text-center" style={{ width: "18rem" }}>
          <img src="./Menu.jpg" className="card-img-top" alt="Menu" />

          <div className="card-body">
            <h5 className="card-title">Menu del día</h5>


            <a href="#" className="btn boton-servicio">
              Ver más
            </a>
          </div>
        </div>

        {/* Tarjeta 2 */}
        <div className="card tarjeta-servicio text-center" style={{ width: "18rem" }}>
          <img src="./Desayuno.jpg" className="card-img-top" alt="Desayuno" />

          <div className="card-body">
            <h5 className="card-title">Desayuno</h5>

            <a href="#" className="btn boton-servicio">
              Ver más
            </a>
          </div>
        </div>

        {/* Tarjeta 3 */}
        <div className="card tarjeta-servicio text-center" style={{ width: "18rem" }}>
          <img src="./Lonchera.jpg" className="card-img-top" alt="Lonchera" />

          <div className="card-body">
            <h5 className="card-title">Lonchera</h5>

            <a href="#" className="btn boton-servicio">
              Ver más
            </a>
          </div>
        </div>

        <div className="card tarjeta-servicio text-center" style={{ width: "18rem" }}>
          <img src="./PlanPremium.jpg" className="card-img-top" alt="PlanPremium" />

          <div className="card-body">
            <h5 className="card-title">Plan Premium</h5>

            <a href="#" className="btn boton-servicio">
              Ver más
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}

export default TarjetasServicios;